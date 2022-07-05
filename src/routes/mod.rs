mod index;
mod projects;

pub use index::*;
pub use projects::*;
use rocket::Responder;

#[derive(Responder)]
pub enum Failure {
    #[response(status = 500, content_type = "json")]
    InternalServerError(String),
}
