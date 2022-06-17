use crate::model::pullrequest::Status as PullRequestStatus;
use starknet::core::types::FieldElement;

pub fn to_felt(status: PullRequestStatus) -> FieldElement {
    FieldElement::from_dec_str(&status.to_string()).unwrap()
}
