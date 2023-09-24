DROP VIEW api.user_payout_info;


CREATE VIEW
    api.user_payout_info AS
WITH
    info AS (
        SELECT
            upi.user_id,
            upi.identity ? 'Company'::text AS is_company,
            COALESCE(upi.identity #>> '{Person,lastname}'::text[], upi.identity #>> '{Company,owner,lastname}'::text[]) AS lastname,
            COALESCE(upi.identity #>> '{Person,firstname}'::text[], upi.identity #>> '{Company,owner,firstname}'::text[]) AS firstname,
            upi.identity #>> '{Company,name}'::text[] AS company_name,
            upi.identity #>> '{Company,identification_number}'::text[] AS company_identification_number,
            upi.location ->> 'address'::text AS address,
            upi.location ->> 'post_code'::text AS post_code,
            upi.location ->> 'city'::text AS city,
            upi.location ->> 'country'::text AS country,
            upper(upi.usd_preferred_method::text) AS usd_preferred_method,
            ba.bic,
            ba.iban,
            COALESCE(eth_name.address, eth_address.address) AS eth_wallet,
            optimism_wallet.address AS optimism_wallet,
            aptos_address.address AS aptos_wallet,
            starknet_address.address AS starknet_wallet
        FROM
            user_payout_info upi
            LEFT JOIN bank_accounts ba ON ba.user_id = upi.user_id
            LEFT JOIN wallets eth_name ON eth_name.user_id = upi.user_id
            AND eth_name.network = 'ethereum'::network
            AND eth_name.type = 'name'::wallet_type
            LEFT JOIN wallets eth_address ON eth_address.user_id = upi.user_id
            AND eth_address.network = 'ethereum'::network
            AND eth_address.type = 'address'::wallet_type
            LEFT JOIN wallets aptos_address ON aptos_address.user_id = upi.user_id
            AND aptos_address.network = 'aptos'::network
            AND aptos_address.type = 'address'::wallet_type
            LEFT JOIN wallets optimism_wallet ON optimism_wallet.user_id = upi.user_id
            AND optimism_wallet.network = 'optimism'::network
            AND optimism_wallet.type = 'address'::wallet_type
            LEFT JOIN wallets starknet_address ON starknet_address.user_id = upi.user_id
            AND starknet_address.network = 'starknet'::network
            AND starknet_address.type = 'address'::wallet_type
    ),
    pending_payments AS (
        select
            recipient_id,
            count(*) as total
        from
            payment_requests
        where
            not exists (
                select
                    1
                from
                    payments
                where
                    payments.request_id = payment_requests.id
            )
        group by
            recipient_id
    )
SELECT
    info.user_id,
    info.is_company,
    info.lastname,
    info.firstname,
    info.company_name,
    info.company_identification_number,
    info.address,
    info.post_code,
    info.city,
    info.country,
    info.usd_preferred_method,
    info.bic,
    info.iban,
    info.eth_wallet,
    info.optimism_wallet,
    info.aptos_wallet,
    info.starknet_wallet,
    pp.total = 0
    OR (
        info.lastname IS NOT NULL
        AND info.firstname IS NOT NULL
        AND info.address IS NOT NULL
        AND info.post_code IS NOT NULL
        AND info.city IS NOT NULL
        AND info.country IS NOT NULL
        AND (
            NOT info.is_company
            OR (
                info.company_name IS NOT NULL
                AND info.company_identification_number IS NOT NULL
            )
        )
        AND (
            (
                info.usd_preferred_method = 'FIAT'
                AND info.bic IS NOT NULL
                AND info.iban IS NOT NULL
            )
            OR (info.eth_wallet IS NOT NULL)
        )
    ) as are_payout_settings_valid
FROM
    info
    JOIN registered_users ru on ru.id = info.user_id
    left join pending_payments pp on pp.recipient_id = ru.github_user_id;