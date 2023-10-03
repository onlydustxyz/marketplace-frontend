use rstest::fixture;
use serde_json::json;

use crate::models::*;

#[fixture]
pub fn anthony() -> Vec<SocialAccount> {
	serde_json::from_value(json!([
	  {
		"provider": "twitter",
		"url": "https://twitter.com/abuisset"
	  },
	  {
		"provider": "generic",
		"url": "https://t.me/abuisset"
	  },
	  {
		"provider": "linkedin",
		"url": "https://www.linkedin.com/in/anthony-buisset/"
	  }
	]))
	.unwrap()
}

#[fixture]
pub fn ofux() -> Vec<SocialAccount> {
	serde_json::from_value(json!([
	  {
		"provider": "twitter",
		"url": "https://twitter.com/fuxeto"
	  },
	  {
		"provider": "linkedin",
		"url": "https://www.linkedin.com/in/olivier-fuxet/"
	  }
	]))
	.unwrap()
}

#[fixture]
pub fn pierre() -> Vec<SocialAccount> {
	vec![]
}
