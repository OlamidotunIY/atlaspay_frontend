export interface SessionRevokedPayload {
  sessionId: string;
  revokedAt: string;
}

export class SessionRevokedEvent {
  public readonly occurredOn: Date;

  constructor(
    public readonly sessionId: string,
    public readonly revokedAt: string
  ) {
    this.occurredOn = new Date(); // Timestamp of when the event object was instantiated/handled
  }

  /**
   * Factory method to hydrate the raw WebSocket payload into a rich Domain Event class
   */
  static fromPayload(payload: SessionRevokedPayload): SessionRevokedEvent {
    return new SessionRevokedEvent(
      payload.sessionId,
      payload.revokedAt
    );
  }
}

