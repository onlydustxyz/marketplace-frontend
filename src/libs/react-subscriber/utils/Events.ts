// import { EventEmitter } from 'events'
import { EventType } from 'react-hook-form'
import { RefSubscriptionListenerInterface } from '../types/Event'
import EventEmitter from 'events'

// const emitter = new EventEmitter()

function on<TRef>(
  emitter: EventEmitter,
  event: EventType,
  listener: RefSubscriptionListenerInterface<TRef>
) {
  emitter.on(event, listener)
}

function emit<TRef>(emitter: EventEmitter, event: EventType, data: TRef) {
  emitter.emit(event, data)
}

export default { emit, on }
