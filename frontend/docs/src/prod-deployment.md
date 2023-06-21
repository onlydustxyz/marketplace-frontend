# Production deployment

Production deployment can be done using the following command:

```
./scripts/promote.sh --production
```

This will run a script with several prompts.

At one point, environment variables that have changed compared to the last deployment will be listed. If they haven't been updated yet on Heroku or Vercel ([see here](./getting-started#websites)), do it - but it should ideally have been done during staging deployment.
