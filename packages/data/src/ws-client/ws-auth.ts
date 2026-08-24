import axios from 'axios';

export async function requestWsTicket(apiBaseUrl: string, accessToken: string): Promise<string> {
    const response = await axios.post<{ status: boolean | string; data: { ticket: string } }>(
        `${apiBaseUrl.replace(/\/$/, '')}/api/v1/ws/ticket`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    
    if (!response.data.data?.ticket) {
        throw new Error('Failed to obtain WebSocket ticket');
    }
    
    return response.data.data.ticket;
}

export function buildAuthenticatedWsUrl(wsBaseUrl: string, ticket: string): string {
    const url = new URL(`${wsBaseUrl.replace(/\/$/, '')}/ws-events`);
    url.searchParams.set('ticket', ticket);
    
    // Convert http/https to ws/wss if necessary, or just rely on STOMP client handling it
    const protocol = url.protocol === 'https:' ? 'wss:' : url.protocol === 'http:' ? 'ws:' : url.protocol;
    url.protocol = protocol;
    
    return url.toString();
}