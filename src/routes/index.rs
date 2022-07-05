use rocket::get;

#[get("/")]
pub fn get_index() -> &'static str {
    "Death Note Contributions Feeder REST API is running."
}
