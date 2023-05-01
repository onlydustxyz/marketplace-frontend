use super::Result;

mod user;
pub use user::Service as UserService;

pub trait Service: UserService {}

impl<S: UserService> Service for S {}
