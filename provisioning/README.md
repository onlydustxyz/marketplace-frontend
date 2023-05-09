# Provisioning

Infrastructure is hosted for the backend on Heroku and for the frontend on Vercel.

Backend is getting progressively provisioned with Terraform.

## Prerequisites

- [awscli](https://aws.amazon.com/fr/cli/)
- [terraform](https://developer.hashicorp.com/terraform/downloads)
- [1password-cli](https://developer.1password.com/docs/cli/get-started/#install)

## Installation

### Heroku

To interact with the Heroku API, you need to have your API key. Get it from your Heroku account settings (https://dashboard.heroku.com/account).
Replace the missing variables asking your colleagues.

### 1password

Configure the 1password CLI according to [their documentation](https://developer.1password.com/docs/cli/get-started/#install).
Then create the secrets config:

```
env APP_ENV={develop,staging,production} op inject -i template.tfvars -o {develop,staging,production}.tfvars
```

### Terraform

```
op run -- terraform init
```

## Usage

All commands are run with the 1Password CLI as a wrapping command – `op run --` –, in order to inject secrets as env variables.

```
terraform workspace select {develop,staging,production}
op run -- terraform plan -var-file {develop,staging,production}.tfvars
```

Review the output, check that the modifications planned are correct. If so:

```
op run -- terraform apply -var-file {develop,staging,production}.tfvars
```

## Importing existing infrastructure under Terraform supervision

All the infrastructure already exists on Heroku.
We then need to map it progressively to Terraform config, to prevent Terraform from recreating everything.

This is done by importing existing infrastructure into Terraform state.

The game is to fill the `{develop,staging,production}.tfvars` files with the correct value.

Then, using the [Heroku API](https://devcenter.heroku.com/articles/platform-api-reference), find the relevant uuids to feed into commands such as:

```
op run -- terraform import -var-file=develop.tfvars module.hasura_auth.heroku_pipeline_coupling.coupling[0] da1c964d-6d01-4786-9ac4-cc967e5814d2
```

## Configuring the apps

Apps are configured using Terraform variables files, created by the `op inject` command.

Secrets are stored on 1password, in the `Tech` vault.

Each entry then has several fields, depending on the environment.

For example, to access the Github Personal Access Token for the develop environment, you will use `op://tech/gihtub pat/develop`.
