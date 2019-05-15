#! /usr/bin/env bash

./node_modules/.bin/tailwind build ./tw-style-base.css -c ./tailwind.config.js -o ./src/tailwind-full.css
chown 1000:1000 ./project/tailwind-ubuntu.css
chmod g+w ./project/tailwind-ubuntu.css