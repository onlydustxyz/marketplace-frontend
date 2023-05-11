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

### Should every configuration variables be in 1Password?

No, only secrets should live in 1Password. It is the same distinction between `vars` and `sensitive_vars` in the `heroku_config`.
If your config lives in `vars`, then put it directly in the `template.tfvars`. If it lives in `sensitive_vars`, put it in `1Password`.

## Design choices

### Overridable variables

Some variables have a default value, and can be overridden if provided in the Terraform Cloud workspace.

For example, the `github_base_url` defaults to `https://${var.environment}.gateway.onlydust.xyz/github/`, but can be overridden in the `production` workspace on Terraform Cloud to `https://gateway.onlydust.xyz/github/`.

### If you can version-control a variable, do it

Most variables must live in the repository, in `.tf` files. Any secret must live in Terraform Cloud, as well as environment-specific variables.

For example, for hostnames, since there is a discrepancy between pre-production pattern `{env}.onlydust.xyz` vs `onlydust.xyz` for production, it could be tempting to have a workspace-specific variable, but it actually is better using a default variable pattern as described in the previous section, as it ends up committing more configuration.
