#[allow(clippy::module_inception)]
mod github;
pub use github::*;

#[cfg(test)]
mod test;
