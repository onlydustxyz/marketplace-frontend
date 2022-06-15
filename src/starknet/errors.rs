use starknet::{
    accounts::single_owner::TransactionError,
    core::utils::CairoShortStringToFeltError,
    providers::{Provider, SequencerGatewayProvider},
    signers::{LocalWallet, Signer},
};
use std::fmt::{self};

#[derive(Debug)]
pub enum StarknetError {
    TransactionError(
        TransactionError<
            <SequencerGatewayProvider as Provider>::Error,
            <LocalWallet as Signer>::SignError,
        >,
    ),
    CairoShortStringToFeltError(CairoShortStringToFeltError),
}

impl fmt::Display for StarknetError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            StarknetError::TransactionError(e) => e.fmt(f),
            StarknetError::CairoShortStringToFeltError(e) => e.fmt(f),
        }
    }
}
