use derive_more::Constructor;

#[derive(Clone, Constructor)]
pub struct Context {}

impl juniper::Context for Context {}
