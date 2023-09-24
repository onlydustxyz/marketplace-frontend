CREATE VIEW
    api.user_payout_info AS
WITH
    info as (
        SELECT
            upi.user_id AS user_id,
            IDENTITY ? 'Company' AS is_company,
            coalesce(IDENTITY #>> '{Person,lastname}', identity #>> '{Company,owner,lastname}') as lastname,
            coalesce(IDENTITY #>> '{Person,firstname}', identity #>> '{Company,owner,firstname}') as firstname,
            IDENTITY #>> '{Company,name}' as company_name,
            IDENTITY #>> '{Company,identification_number}' as company_identification_number,
            LOCATION ->> 'address' AS address,
            LOCATION ->> 'post_code' AS post_code,
            LOCATION ->> 'city' AS city,
            LOCATION ->> 'country' AS country,
            UPPER(usd_preferred_method::text) AS usd_preferred_method,
            bic AS bic,
            iban AS iban,
            coalesce(eth_name.address, eth_address.address) as eth_wallet,
            optimism_wallet.address as optimism_wallet,
            aptos_address.address as aptos_wallet,
            starknet_address.address as starknet_wallet
        FROM
            user_payout_info upi
            LEFT JOIN bank_accounts ba ON ba.user_id = upi.user_id
            LEFT JOIN wallets eth_name ON eth_name.user_id = upi.user_id
            AND eth_name.network = 'ethereum'::network
            AND eth_name."type" = 'name'::wallet_type
            LEFT JOIN wallets eth_address ON eth_address.user_id = upi.user_id
            AND eth_address.network = 'ethereum'::network
            AND eth_address."type" = 'address'::wallet_type
            LEFT JOIN wallets aptos_address ON aptos_address.user_id = upi.user_id
            AND aptos_address.network = 'aptos'::network
            AND aptos_address."type" = 'address'::wallet_type
            LEFT JOIN wallets optimism_wallet ON optimism_wallet.user_id = upi.user_id
            AND optimism_wallet.network = 'optimism'::network
            AND optimism_wallet."type" = 'address'::wallet_type
            LEFT JOIN wallets starknet_address ON starknet_address.user_id = upi.user_id
            AND starknet_address.network = 'starknet'::network
            AND starknet_address."type" = 'address'::wallet_type
    )
SELECT
    user_id,
    is_company,
    lastname,
    firstname,
    company_name,
    company_identification_number,
    address,
    post_code,
    city,
    country,
    usd_preferred_method,
    bic,
    (bic IS NOT NULL)::boolean as has_bic,
    iban,
    (iban IS NOT NULL)::boolean as has_iban,
    eth_wallet,
    (eth_wallet IS NOT NULL)::boolean as has_eth_wallet,
    optimism_wallet,
    (optimism_wallet IS NOT NULL)::boolean as has_optimism_wallet,
    aptos_wallet,
    (aptos_wallet IS NOT NULL)::boolean as has_aptos_wallet,
    starknet_wallet,
    (starknet_wallet IS NOT NULL)::boolean as has_starknet_wallet
from
    info;