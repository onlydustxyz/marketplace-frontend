-- New enum types
CREATE TYPE wallet_type AS enum('address', 'name');


CREATE TYPE network AS enum('ethereum');


CREATE TYPE preferred_method AS enum('fiat', 'crypto');


-- migrate from payout settings to wallets table
CREATE TABLE
    wallets AS
SELECT
    user_id,
    'ethereum'::network AS network,
    CASE
        WHEN payout_settings #> '{EthTransfer,Address}' is not null then 'address'::wallet_type
        else 'name'::wallet_type
    END AS "type",
    CASE
        WHEN payout_settings #> '{EthTransfer,Address}' is not null then payout_settings #>> '{EthTransfer,Address}'
        ELSE payout_settings #>> '{EthTransfer,Name}'
    END AS "address"
FROM
    user_payout_info
WHERE
    payout_settings ? 'EthTransfer';


ALTER TABLE wallets
ADD PRIMARY KEY (user_id, network);


ALTER TABLE wallets
ALTER COLUMN "type"
SET NOT NULL,
ALTER COLUMN address
SET NOT NULL;


-- migrate from payout settings to bank accounts table
CREATE TABLE
    bank_accounts AS
SELECT
    user_id,
    payout_settings #>> '{WireTransfer,BIC}' as bic,
    payout_settings #>> '{WireTransfer,IBAN}' as iban
FROM
    user_payout_info
WHERE
    payout_settings ? 'WireTransfer';


ALTER TABLE bank_accounts
ADD PRIMARY KEY (user_id);


ALTER TABLE bank_accounts
ALTER COLUMN bic
SET NOT NULL,
ALTER COLUMN iban
SET NOT NULL;


-- extract usd_preferred_method from payout settings
ALTER TABLE user_payout_info
ADD COLUMN usd_preferred_method preferred_method;


UPDATE user_payout_info
SET
    usd_preferred_method = CASE
        WHEN payout_settings ? 'EthTransfer' THEN 'crypto'::preferred_method
        ELSE 'fiat'::preferred_method
    END
WHERE
    payout_settings IS NOT NULL;


-- finally, drop payout_settings column
ALTER TABLE user_payout_info
DROP COLUMN payout_settings;