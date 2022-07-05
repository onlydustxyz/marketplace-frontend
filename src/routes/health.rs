#[derive(Responder)]
#[response(status = 200, content_type = "json")]
pub struct RawOk(&'static str);

#[get("/health")]
pub async fn health_check() -> RawOk {
    RawOk("{\"status\":\"ok\"}")
}
