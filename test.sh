#! /bin/bash
rm -rf platforms/android
npm run build
cordova platform add android