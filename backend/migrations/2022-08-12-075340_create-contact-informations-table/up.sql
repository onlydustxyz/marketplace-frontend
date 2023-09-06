CREATE TABLE contact_informations(
    id UUID PRIMARY KEY,
    contributor_id VARCHAR NOT NULL,
    discord_handle VARCHAR
);

create unique index contact_informations_contributor_id_idx on contact_informations (contributor_id);
