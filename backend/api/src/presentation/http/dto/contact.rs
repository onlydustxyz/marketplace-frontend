use serde::Deserialize;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Channel {
	Email,
	Telegram,
	Twitter,
	Discord,
	LinkedIn,
	Whatsapp,
}

impl From<Channel> for infrastructure::database::enums::ContactChannel {
	fn from(value: Channel) -> Self {
		match value {
			Channel::Email => Self::Email,
			Channel::Telegram => Self::Telegram,
			Channel::Twitter => Self::Twitter,
			Channel::Discord => Self::Discord,
			Channel::LinkedIn => Self::Linkedin,
			Channel::Whatsapp => Self::Whatsapp,
		}
	}
}

#[derive(Debug, Deserialize)]
pub struct Information {
	pub channel: Channel,
	pub contact: String,
	pub public: bool,
}
