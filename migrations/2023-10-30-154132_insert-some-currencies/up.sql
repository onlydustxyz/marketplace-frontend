INSERT INTO
    "public"."crypto_usd_quotes" ("currency", "price", "updated_at")
VALUES
    ('eth', 1816.97, '2023-10-30 15:00:00'),
    ('op', 1.4, '2023-10-30 15:00:00'),
    ('apt', 6.78, '2023-10-30 15:00:00') ON CONFLICT ("currency")
DO NOTHING;
