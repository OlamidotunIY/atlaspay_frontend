import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthStore } from './use-auth-store.js';
import { useLogout } from '../data/mutations/use-logout.mutation.js';
import { useRefreshToken } from '../data/mutations/use-refresh-token.mutation.js';
import { AuthEventType } from '../domain/events/auth-events.js';
import { SessionRevokedEvent, SessionRevokedPayload } from '../domain/events/session-revoked.event.js';
import { eventBus } from '@org/data';

const WARNING_TIME_MS = 2 * 60 * 1000; // Show warning 2 minutes before expiration
const ACTIVITY_THROTTLE_MS = 60 * 1000; // Record activity at most once per minute

export function useSessionManager() {
  const { mutateAsync: refreshToken } = useRefreshToken();
  const { mutate: logout } = useLogout();
  const { setToken, isAuthenticated, expiresAt, clear } = useAuthStore();
  
  const [showWarning, setShowWarning] = useState(false);
  const lastActivityAt = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update activity timestamp
  const onUserActivity = useCallback(() => {
    const now = Date.now();
    if (now - lastActivityAt.current > ACTIVITY_THROTTLE_MS) {
      lastActivityAt.current = now;
      if (showWarning) setShowWarning(false);
    }
  }, [showWarning]);

  // Track activity
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    const handleEvent = () => onUserActivity();
    events.forEach(e => window.addEventListener(e, handleEvent));
    return () => events.forEach(e => window.removeEventListener(e, handleEvent));
  }, [onUserActivity]);

  // Session timer logic
  useEffect(() => {
    if (!isAuthenticated() || !expiresAt) return;

    const expiryTime = new Date(expiresAt).getTime();
    
    const checkSession = () => {
       const now = Date.now();
       const timeToExpiry = expiryTime - now;

       if (timeToExpiry <= 0) {
         // Expired
         clear();
         logout(''); // Send logout API call if needed
         return;
       }

       // If less than warning time remaining
       if (timeToExpiry <= WARNING_TIME_MS) {
         const timeSinceActivity = now - lastActivityAt.current;
         
         // If they were active recently, just silent refresh
         if (timeSinceActivity < WARNING_TIME_MS) {
           refreshToken('')
             .then(res => {
                 setToken(res.accessToken, res.accessExpiresAt);
             })
             .catch(() => clear());
         } else {
           // Show the warning dialog
           setShowWarning(true);
           
           // Check again slightly after expiry to forcefully log them out
           timerRef.current = setTimeout(checkSession, timeToExpiry + 1000);
         }
       } else {
         // Still plenty of time, wait until we hit the warning threshold
         const timeToWarning = timeToExpiry - WARNING_TIME_MS;
         timerRef.current = setTimeout(checkSession, timeToWarning);
       }
    };

    // Initial check
    checkSession();

    return () => {
       if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isAuthenticated, expiresAt, refreshToken, setToken, clear, logout]);

  // WebSocket Event Bus Listeners
  useEffect(() => {
    const handleSessionRevoked = (payload: unknown) => {
      SessionRevokedEvent.fromPayload(payload as SessionRevokedPayload);
      clear();
      // Optionally show a message that session was revoked remotely
    };
    const unsubscribe = eventBus.subscribe(AuthEventType.SESSION_REVOKED, handleSessionRevoked);
    return () => unsubscribe();
  }, [clear]);

  const extendSession = useCallback(async () => {
    setShowWarning(false);
    lastActivityAt.current = Date.now();
    try {
      const res = await refreshToken('');
      setToken(res.accessToken, res.accessExpiresAt);
    } catch {
      clear();
    }
  }, [refreshToken, setToken, clear]);

  const endSession = useCallback(() => {
    setShowWarning(false);
    clear();
    logout('');
  }, [clear, logout]);

  return { showWarning, extendSession, endSession };
}
