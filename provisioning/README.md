# Provisioning

Infrastructure is hosted for the backend on Heroku and for the frontend on Vercel.

Backend is getting progressively provisioned with Terraform.

Terraform is used with [Terraform Cloud](https://app.terraform.io/app/onlydust-marketplace/) to store the state of the infrastructure as well as the secrets.

## Prerequisites

- [awscli](https://aws.amazon.com/fr/cli/)
- [terraform](https://developer.hashicorp.com/terraform/downloads)

## Installation

### Heroku

To interact with the Heroku API, you need to have your API key. Get it from your Heroku account settings (https://dashboard.heroku.com/account).
Replace the missing variables asking your colleagues.

### Terraform

```
terraform init
terraform login
```

## Usage

There is nothing special to do, since everything is handled by Terraform Cloud.

## Importing existing infrastructure under Terraform supervision

All the infrastructure already exists on Heroku.
We then need to map it progressively to Terraform config, to prevent Terraform from recreating everything.

This is done by importing existing infrastructure into Terraform state.

You will use for this the command `terraform import RESOURCE_ID HEROKU_ID`.

Despite using Terraform Cloud, this operation is done locally by the developers.

The command is run from a local terminal, and will update the state stored in Terraform Cloud, but will not benefit from the remote variables defined on Terraform Cloud.
We therefore need to have placeholders for required variables, hence the `local.auto.tfvars` file.

Not having the actual secrets when running the `terraform import` command is not an issue since no change to the infrastructure will be attempted with this command, so the configuration of secrets values wont be altered by these placeholders.

To proceed, using the [Heroku API](https://devcenter.heroku.com/articles/platform-api-reference), find the relevant uuids to feed into commands such as:

```
terraform import module.hasura_auth.heroku_pipeline_coupling.coupling[0] da1c964d-6d01-4786-9ac4-cc967e5814d2
```

## Configuring the apps

Apps are configured using Terraform Cloud and local configuration variables, spread among the `*.tf` files.

## Design choices

### Overridable variables

Some variables have a default value, and can be overridden if provided in the Terraform Cloud workspace.

For example, the `github_base_url` defaults to `https://${var.environment}.gateway.onlydust.xyz/github/`, but can be overridden in the `production` workspace on Terraform Cloud to `https://gateway.onlydust.xyz/github/`.

### If you can version-control a variable, do it

Most variables must live in the repository, in `.tf` files. Any secret must live in Terraform Cloud, as well as environment-specific variables.

For example, for hostnames, since there is a discrepancy between pre-production pattern `{env}.onlydust.xyz` vs `onlydust.xyz` for production, it could be tempting to have a workspace-specific variable, but it actually is better using a default variable pattern as described in the previous section, as it ends up committing more configuration.
