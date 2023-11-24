export enum Events {
  REGISTER = "REGISTER",
  UPDATE = "UPDATE",
  ALL = "ALL"
}

export type EventType = Events.REGISTER | Events.ALL | Events.UPDATE

export type RefSubscriptionListenerInterface<TRef> = (value: TRef) => void
