#[macro_use]
extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Death Note Contributions Feeder REST API is running."
}

#[launch]
fn rocket() -> _ {
    env_logger::init();
    rocket::build().mount("/", routes![index,])
}
