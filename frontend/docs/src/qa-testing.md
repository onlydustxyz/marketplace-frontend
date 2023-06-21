# QA Testing

## Testing on `develop`

Changes merged on the `main` branch can be reviewed on the develop environment:

For the platform:

`https://develop.app.onlydust.xyz/`


For Hasura:

`http://develop.hasura.onlydust.xyz`

## Deploying on `staging`

Staging deployment can be done using the following command:

```
./scripts/promote.sh --staging
```

This will run a script with several prompts.

At one point, environment variables that have changed compared to the last deployment will be listed. If they haven't been updated yet on Heroku or Vercel ([see here](./getting-started#websites)), now is the time to do it. You should also update the variables for the *production* environment.

## Launching the QA session

The QA session can be launched by typing `/test` and pressing the `Enter` key in the product channel on Slack.

![Slack Testing Session](./pictures/slack-testing-session.png)
