use diesel::pg::PgConnection;
use r2d2;
use r2d2_diesel::ConnectionManager;
use rocket::http::Status;
use rocket::request::{FromRequest, Outcome};
use rocket::State;
use rocket::{outcome::try_outcome, Request};
use std::env;
use std::ops::Deref;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn init_pool() -> Pool {
    let manager = ConnectionManager::<PgConnection>::new(database_url());
    Pool::new(manager).expect("db pool")
}

fn database_url() -> String {
    env::var("DATABASE_URL").expect("DATABASE_URL must be set")
}

pub struct DbConn(pub r2d2::PooledConnection<ConnectionManager<PgConnection>>);

#[rocket::async_trait]
impl<'r> FromRequest<'r> for DbConn {
    type Error = ();

    async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
        let pool = try_outcome!(request.guard::<&State<Pool>>().await);

        match pool.get() {
            Ok(connection) => Outcome::Success(Self(connection)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ())),
        }
    }
}

impl Deref for DbConn {
    type Target = PgConnection;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
