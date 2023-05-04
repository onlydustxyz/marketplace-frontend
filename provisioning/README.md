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

