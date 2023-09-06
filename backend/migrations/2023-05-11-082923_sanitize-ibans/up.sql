UPDATE user_info
SET payout_settings = jsonb_set(
    payout_settings,
    '{WireTransfer, IBAN}',
    to_jsonb(replace(
        payout_settings->'WireTransfer'->>'IBAN',
        ' ',
        ''
    )::text)
)
WHERE payout_settings->'WireTransfer'->>'IBAN' IS NOT NULL;
