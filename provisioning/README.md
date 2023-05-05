# Provisioning

Infrastructure is hosted for the backend on Heroku and for the frontend on Vercel.

Backend is getting progressively provisioned with Terraform.

## Prerequisites

- [awscli](https://aws.amazon.com/fr/cli/)
- [terraform](https://developer.hashicorp.com/terraform/downloads)

## Installation

```
cp .env.example .env
```

To interact with the Heroku API, you need to have your API key. Get it from your Heroku account settings (https://dashboard.heroku.com/account).
Replace the missing variables asking your colleagues.

```
terraform init
```

## Usage

```
terraform workspace select {develop,staging,production}
terraform plan -var-file {develop,staging,production}.tfvars
```

Review the output, check that the modifications planned are correct. If so:

```
terraform apply -var-file {develop,staging,production}.tfvars
```

## Importing existing infrastructure under Terraform supervision

All the infrastructure already exists on Heroku.
We then need to map it progressively to Terraform config, to prevent Terraform from recreating everything.

This is done by importing existing infrastructure into Terraform state.

The game is to fill the `{develop,staging,production}.tfvars` files with the correct value.

Then, using the [Heroku API](https://devcenter.heroku.com/articles/platform-api-reference), find the relevant uuids to feed into commands such as:
```
terraform import -var-file=develop.tfvars module.hasura_auth.heroku_pipeline_coupling.coupling[0] da1c964d-6d01-4786-9ac4-cc967e5814d2
```

