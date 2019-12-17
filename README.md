# Docker image for Heroku

This docker image makes using Heroku in CI easier.

The `purge-cache.js` script purges the build cache.

## Usage

```shell
docker run --rm -ti \
    -e HEROKU_API_USER=<heroku-username> \
    -e HEROKU_API_KEY=<heroku-api-key> \
    -e HEROKU_APP=<heroku-app-name> \
    reassurezmoitech/heroku purge-cache.js
```