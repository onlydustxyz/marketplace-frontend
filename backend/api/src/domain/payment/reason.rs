use juniper::GraphQLInputObject;
use serde::Serialize;
use thiserror::Error;

#[derive(Serialize, GraphQLInputObject)]
#[cfg_attr(test, derive(serde::Deserialize))]
pub struct Reason {
	work_items: Option<Vec<String>>,
}

#[derive(Debug, Error)]
pub enum ValidReasonError {
	#[error("No reason was given")]
	NoReasonGiven,
	#[error("A reason is not a valid url: {0}")]
	NotAnUrl(String),
	#[error("A reason is not a valid github url: {0}")]
	NotGithubUrl(String),
	#[error("A reason is not a valid github pull request url: {0}")]
	NotPRUrl(String),
}

impl Reason {
	pub fn is_valid(&self) -> Result<(), ValidReasonError> {
		let items = self.work_items.as_ref().ok_or(ValidReasonError::NoReasonGiven)?;
		if items.is_empty() {
			Err(ValidReasonError::NoReasonGiven)?;
		};

		for item in items.iter() {
			let url =
				url::Url::parse(item).map_err(|_| ValidReasonError::NotAnUrl(item.to_string()))?;
			if url.host_str() != Some("github.com") {
				Err(ValidReasonError::NotGithubUrl(item.to_string()))?;
			}
			let mut path_segments = url
				.path_segments()
				.ok_or_else(|| ValidReasonError::NotPRUrl(item.to_string()))?;
			if path_segments.nth(2) != Some("pull") {
				Err(ValidReasonError::NotPRUrl(item.to_string()))?;
			}
			if let Some(pr_id) = path_segments.next() {
				pr_id.parse::<u32>().map_err(|_| ValidReasonError::NotPRUrl(item.to_string()))?;
			} else {
				Err(ValidReasonError::NotPRUrl(item.to_string()))?;
			}
		}

		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::Reason;

	#[rstest]
	#[case(serde_json::json!({}), false)]
	#[case(serde_json::json!({"work_items": null}), false)]
	#[case(serde_json::json!({"work_items": []}), false)]
	#[case(serde_json::json!({"work_items": ["abc"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/68"]}), true)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/68/"]}), true)]
	#[case(serde_json::json!({"work_items": ["http://github.com/onlydustxyz/starkonquest/pull/68"]}), true)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/68", "http://github.com/onlydustxyz/starkonquest/pull/68"]}), true)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/68", "abc"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://gitlab.com/onlydustxyz/starkonquest/pull/68"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.io/onlydustxyz/starkonquest/pull/68"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/issue/68"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/abc"]}), false)]
	#[case(serde_json::json!({"work_items": ["https://github.com/onlydustxyz/starkonquest/pull/-5"]}), false)]
	fn reason_validity(#[case] input: serde_json::Value, #[case] expect: bool) {
		let reason: Reason =
			serde_json::from_value(input).expect("input should be a valid Reason json value");
		assert_eq!(reason.is_valid().is_ok(), expect);
	}
}
