<!-- https://www.facebook.com/noampl123/photos -->
<!-- https://www.facebook.com/OliveryIbnGvirol -->


![](https://i.imgur.com/MFfRBSM.png)
# Playground for web-api.js


[![N|Solid](https://res.cloudinary.com/dlvaangxn/image/upload/c_scale,w_150/v1563630297/unx-logo.png)](https://www.unxdigital.com/)

![CircleCI](https://circleci.com/gh/google/wikiloop-battlefield/tree/master.svg?style=svg)

[**face-api.js**](https://www.npmjs.com/package/face-api.js) is a JavaScript face recognition API for the browser and nodejs implemented on top of tensorflow.js core. 

![examples](https://raw.githubusercontent.com/unx-digital/Playground-FaceApiJS/master/examples.gif)

## Blockchain with Bitcoin

Blockchain network - peers would mine blocks in the browser and communicate via webrtc in the browser.
This module simply initializes socket.io and configures it in a way that single audio/video/screen stream can be shared/relayed over unlimited users without any bandwidth/CPU usage issues. Everything happens peer-to-peer!
<!-- 
[![npm](https://img.shields.io/npm/v/rtcmulticonnection.svg)](https://npmjs.org/package/rtcmulticonnection) [![downloads](https://img.shields.io/npm/dm/rtcmulticonnection.svg)](https://npmjs.org/package/rtcmulticonnection) [![Build Status: Linux](https://travis-ci.org/muaz-khan/RTCMultiConnection.png?branch=master)](https://travis-ci.org/muaz-khan/RTCMultiConnection) 
-->
> JavaScript library for peer-to-peer applications (screen sharing, audio/video conferencing, file sharing, media streaming etc.)

## Socket.io Signaling Server

Signaling server has a separate repository:

* https://github.com/muaz-khan/RTCMultiConnection-Server

## Demos

* https://rtcmulticonnection.herokuapp.com/

## Getting Started Without Any Installation

* https://www.rtcmulticonnection.org/docs/getting-started/

## YouTube Channel

* https://www.youtube.com/playlist?list=PLPRQUXAnRydKdyun-vjKPMrySoow2N4tl

## Install On Your Own Website

* https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/installation-guide.md

```sh
mkdir demo && cd demo

# install from NPM
npm install rtcmulticonnection

# or clone from github
git clone https://github.com/muaz-khan/RTCMultiConnection.git ./

# install all required packages
# you can optionally include --save-dev
npm install

node server --port=9001
```

## Integrate Inside Any Nodejs Application

* https://github.com/muaz-khan/RTCMultiConnection-Server/wiki/Integrate-inside-nodejs-applications

## `Config.json` Explained

* https://github.com/muaz-khan/RTCMultiConnection-Server/wiki/config.json

## How to Enable HTTPs?

* https://github.com/muaz-khan/RTCMultiConnection-Server/wiki/How-to-Enable-HTTPs

## Want to Contribute?

RTCMultiConnection is using `Grunt` to compile javascript into `dist` directory:

* https://github.com/muaz-khan/RTCMultiConnection/blob/master/CONTRIBUTING.md
MONGODB_URI = mongodb+srv://dovp2:YomTov25@cluster0.rikhr.gcp.mon

## Wiki Pages
Check out [git](https://github.com/jookie/gaj4).
Check out our app on [heroku](https://gaj1.herokuapp.com/demos/).
You can see us talking about GoLiveTV on [Youtube](https://www.youtube.com/channel/UCoMZ3tIn0xSbwGdhKVQwOrQ).


1. https://dashboard.heroku.com/apps/gaj1
2. https://github.com/jookie/gaj4

1. https://git.heroku.com/ches1.git

1. https://dashboard.heroku.com/apps/golivet
1. https://dashboard.heroku.com/apps/golivet/settings
https://github.com/jookie/GoLiveTV

# Installation Guide

> This page explains how to install RTCMultiConnection.

* Youtube Video: [NPM install](https://www.youtube.com/watch?v=EtsiYEW_T8Y) or [Other Videos](https://www.youtube.com/watch?v=EtsiYEW_T8Y&list=PLPRQUXAnRydKdyun-vjKPMrySoow2N4tl)

# Fetch from Github

> Github is strongly recommended. NPM or TAR are secondary options.

```sh
git clone https://github.com/muaz-khan/RTCMultiConnection.git ./
npm install
```

Or download ZIP:

```sh
wget https://github.com/muaz-khan/RTCMultiConnection/archive/master.zip
unzip master.zip
```

Then call `npm install`.


# Install using NPM or Bower


```sh
npm install rtcmulticonnection

# or
bower install rtcmulticonnection
```

# Run `server.js`

```sh
# install all required packages first
npm install

# then run the server
node server.js
```

Now open `http://localhost:9001/`.

# Modify config.json

* https://github.com/muaz-khan/RTCMultiConnection-Server/wiki/config.json

```json
{
  "socketURL": "/",
  "socketMessageEvent": "abcdef",
  "socketCustomEvent": "ghijkl",
  "port": "443",
  "enableLogs": "false",
  "autoRebootServerOnFailure": "false",
  "isUseHTTPs": "true",
  "ssl_key": "/ssl/certificate.key",
  "ssl_cert": "/ssl/certificate.crt",
  "ssl_cabundle": "/ssl/certificate.cabundle"
}
```

Now run `server.js` and it will automatically use above configuration.

# How to check if server is running correctly?

Open this URL: `https://localhost:9001/socket.io/socket.io.js`

If you can load `/socket.io/socket.io.js` on your server then it is working fine.

# Stop Old Processes

Check all processes running on port `9001` and stop process by `id`:

```sh
lsof -n -i4TCP:9001 | grep LISTEN
kill process-ID
```

Or stop all processes on a specific port. (It may require `sudo` privileges):

```sh
fuser -vk 9001/tcp
```

Now open: `http://localhost:9001/`

## Keep running server in background using `pm2`

``sh
npm install pm2 -g
pm2 startup  
pm2 start server.js
pm2 save
```

Now `server.js` will auto restart on failure. Even auto run as soon as operating system reboots.

For more info about `pm2` please check [this link](https://github.com/Unitech/pm2).

## Keep running server in background usnig `nohup`

```sh
nohup nodejs server.js > /dev/null 2>&1 &
```

Or:

```sh
nohup nodejs server.js &
```

Or use `forever`:

```sh
npm install forever -g
forever start server.js
```

To auto-start `server.js` on system-reboot (i.e. when Mac/Linux system shuts down or reboots):

```sh
npm install forever-service

cd __path to your npm install__
forever-service install ncustomAppName --script server.js
```

Commands to interact with `service ncustomAppName Start`:

```
- "sudo service ncustomAppName start" Stop
- "sudo service ncustomAppName stop" Status
- "sudo service ncustomAppName status" Restart - "sudo service ncustomAppName restart"
```

More info about `forever-service` [here](http://stackoverflow.com/a/36027516/552182).

# Heroku

If you are installing on heroku, please make sure to enable following config variables:

1. `NODE_MODULES_CACHE:false`
2. `NPM_CONFIG_PRODUCTION:false`
3. `YARN_PRODUCTION:false`

You can set above variables through heroku CLI as well:

```sh
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false NODE_MODULES_CACHE=false
```

# Other Documents

1. [Getting Started guide for RTCMultiConnection](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/getting-started.md)
2. [Installation Guide](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/installation-guide.md)
3. [How to Use?](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/how-to-use.md)
4. [API Reference](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/api.md)
5. [Upgrade from v2 to v3](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/upgrade.md)
6. [How to write iOS/Android applications?](https://github.com/muaz-khan/RTCMultiConnection/tree/master/docs/ios-android.md)
7. [Tips & Tricks](https://github.com/muaz-khan/RTCMultiConnection/blob/master/docs/tips-tricks.md)


## License

[GoLiveConnection](https://dashboard.heroku.com/apps/gaj1) is released under [ISD licence](https://dashboard.heroku.com/apps/gaj1/LICENSE.md) . Copyright (c) [Peles](https://peles.com/).
