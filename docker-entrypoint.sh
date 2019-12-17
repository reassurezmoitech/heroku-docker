#!/bin/bash

set -e

echo "machine api.heroku.com" > ~/.netrc
echo "  login $HEROKU_API_USER" >> ~/.netrc
echo "  password $HEROKU_API_KEY" >> ~/.netrc

/usr/local/bin/node "$@"