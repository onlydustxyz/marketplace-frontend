/**
* Aggregate is a trait for domain objects that represent aggregates.
* Aggregates are entities that are composed of other entities and have defined boundaries.
*/
use std::fmt::{Debug, Display};

use serde::{de::DeserializeOwned, Serialize};

use crate::Entity;

pub trait Aggregate: Entity + Send + Sync + Default + Sized {
    /**
    * Event is a type alias for the events that will be applied to the Aggregate.
    * By default events must be Serialize, DeserializeOwned, Debug, Display, Clone, Event and Send.
    */
    type Event: Serialize + DeserializeOwned + Debug + Display + Clone + Event<Self> + Send;
}

/**
* Event trait provides an interface for Domain Events.
* Events allow tracking and storing state changes for an Aggregate.
*/
pub trait Event<A: Aggregate> {
    /**
    * aggregate_id returns the id of the Aggregate related to this event.
    */
    fn aggregate_id(&self) -> &A::Id;
}

/**
* EventSourcable is a trait for Aggregates that can be reconstructed from a series of Events.
* It allows Aggregates to be reconstructed from a series of stored Events and to record new Events.
*/
pub trait EventSourcable: Aggregate {

    /**
    * apply_event updates the internal state of the Aggregate with the given Event.
    * It returns a new Aggregate instance with the updated state.
    */
    fn apply_event(self, event: &Self::Event) -> Self;

    /**
    * apply_events applies a sequence of Events to an Aggregate.
    * It returns a new Aggregate instance with the updated state.
    */
    fn apply_events(self, events: &[Self::Event]) -> Self {
        events.iter().fold(self, Self::apply_event)
    }

    /**
    * from_events creates an Aggregate instance from a sequence of Events
    * by applying each Event in the sequence to the default instance of the Aggregate.
    */
    fn from_events(events: &[Self::Event]) -> Self {
        Self::apply_events(Default::default(), events)
    }
}