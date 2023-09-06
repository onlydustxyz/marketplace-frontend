ALTER TABLE user_info
	ADD are_payout_settings_valid BOOLEAN NOT NULL GENERATED ALWAYS AS (
payout_settings IS NOT NULL
		AND(payout_settings ? 'EthTransfer'
			AND(payout_settings -> 'EthTransfer' ? 'Address'
				OR payout_settings -> 'EthTransfer' ? 'Name')
				OR(payout_settings -> 'WireTransfer' ? 'BIC'
					AND payout_settings -> 'WireTransfer' ? 'IBAN'))) STORED;
