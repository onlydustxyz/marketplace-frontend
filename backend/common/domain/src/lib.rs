//! This crate provides a framework for building event-sourced systems.
//!
//! # Modules
//!
//! - `auth`: Defines the `User` entity and related types and traits for user authentication and authorization.
//! - `value_objects`: Defines various value objects commonly used in event-sourced systems.
//! - `event`: Defines the `Event` trait and related types for event sourcing.
//! - `aggregate`: Defines the `Aggregate` trait and related types for aggregates in event-sourced systems.
//! - `entity`: Defines the `Entity` trait for entities in event-sourced systems.
//! - `error`: Defines various error types used throughout the crate.
//! - `messaging`: Defines types and traits related to messaging in event-sourced systems.
//! - `project`: Defines the `Project` entity and related types and traits for managing projects in event-sourced systems.
//! - `payment`: Defines the `Payment` entity and related types and traits for managing payments in event-sourced systems.
//! - `user`: Defines the `User` entity and related types and traits for managing users in event-sourced systems.
//! - `budget`: Defines the `Budget` entity and related types and traits for managing budgets in event-sourced systems.
//! - `github`: Provides a wrapper around the GitHub API for use in event-sourced systems.
//!
//! # Submodules
//!
//! - `aggregate_root`: Defines the `AggregateRoot` and `AggregateRootRepository` types and traits for managing aggregates.
//! - `event_store`: Defines the `EventStore` type and trait for storing and retrieving events.
//! - `specifications`: Provides types and traits for defining specifications for querying entities.
//! - `stream_filter`: Provides a `StreamFilter` type for filtering event streams.
//!
//! # Examples
//!
//! ```rust
//! use event_sourcing::{Aggregate, Entity, Event, ValueObject};
//!
//! #[derive(Debug, Clone, PartialEq, Eq, Hash, ValueObject)]
//! pub struct Email(String);
//!
//! #[derive(Debug, Clone, PartialEq, Event)]
//! #[event_source(user)]
//! pub enum UserEvent {
//!     Registered { email: Email },
//!     EmailChanged { email: Email },
//! }
//!
//! #[derive(Debug, Clone)]
//! pub struct User {
//!     id: u64,
//!     email: Email,
//! }
//!
//! impl Entity for User {
//!     type Id = u64;
//!
//!     fn id(&self) -> Self::Id {
//!         self.id
//!     }
//! }
//!
//! impl Aggregate for User {
//!     type Event = UserEvent;
//!
//!     fn apply_event(&mut self, event: Self::Event) {
//!         match event {
//!             UserEvent::Registered { email } => {
//!                 self.email = email;
//!             }
//!             UserEvent::EmailChanged { email } => {
//!                 self.email = email;
//!             }
//!         }
//!     }
//! }
//! ```