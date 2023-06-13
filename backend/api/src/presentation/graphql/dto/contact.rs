use juniper::{GraphQLEnum, GraphQLInputObject};

#[derive(Debug, GraphQLEnum)]
pub enum Channel {
	Email,
	Telegram,
	Twitter,
	Discord,
	LinkedIn,
}

impl From<Channel> for infrastructure::database::contact_information::Channel {
	fn from(value: Channel) -> Self {
		match value {
			Channel::Email => Self::Email,
			Channel::Telegram => Self::Telegram,
			Channel::Twitter => Self::Twitter,
			Channel::Discord => Self::Discord,
			Channel::LinkedIn => Self::LinkedIn,
		}
	}
}

#[derive(Debug, GraphQLInputObject)]
pub struct Information {
	pub channel: Channel,
	pub contact: String,
	pub public: bool,
}
