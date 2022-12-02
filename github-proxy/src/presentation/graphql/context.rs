pub struct Context;

impl Context {
	pub fn new() -> Self {
		Self
	}
}

impl juniper::Context for Context {}
