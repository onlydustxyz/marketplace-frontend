use rocket::serde::Deserialize;
use rocket::serde::Serialize;
use schemars::JsonSchema;

use self::hex_felt::HexFieldElement;
use crate::infrastructure::StarknetSignature;
use crate::infrastructure::StarknetSignedData;

mod hex_felt;

#[derive(Deserialize, Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct Signature {
    pub r: HexFieldElement,
    pub s: HexFieldElement,
}

impl From<Signature> for StarknetSignature {
    fn from(val: Signature) -> Self {
        StarknetSignature {
            r: val.r.into(),
            s: val.s.into(),
        }
    }
}

#[derive(Deserialize, Debug, Clone, Copy, Eq, PartialEq, PartialOrd, Ord, Hash, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct SignedData {
    pub hash: HexFieldElement,
    pub signature: Signature,
}

impl From<SignedData> for StarknetSignedData {
    fn from(val: SignedData) -> Self {
        StarknetSignedData {
            hash: val.hash.into(),
            signature: val.signature.into(),
        }
    }
}

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct GithubUserRegistrationRequest<'r> {
    pub authorization_code: &'r str,
    pub account_address: HexFieldElement,
    pub signed_data: SignedData,
}

#[derive(Serialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct GithubUserRegistrationResponse {
    pub transaction_hash: HexFieldElement,
}
