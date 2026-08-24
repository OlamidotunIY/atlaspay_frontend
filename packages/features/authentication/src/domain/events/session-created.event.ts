export interface SessionCreatedPayload {
  sessionId: string;
  deviceInfo: string;
  createdAt: string;
}

export class SessionCreatedEvent {
  public readonly occurredOn: Date;

  constructor(
    public readonly sessionId: string,
    public readonly deviceInfo: string,
    public readonly createdAt: string
  ) {
    this.occurredOn = new Date(); // Timestamp of when the event object was instantiated/handled
  }

  /**
   * Factory method to hydrate the raw WebSocket payload into a rich Domain Event class
   */
  static fromPayload(payload: SessionCreatedPayload): SessionCreatedEvent {
    return new SessionCreatedEvent(
      payload.sessionId,
      payload.deviceInfo,
      payload.createdAt
    );
  }
}

