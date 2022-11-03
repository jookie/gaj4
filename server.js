
// http://localhost:9001/demos/dashboard/canvas-designer.html
// git ://https://github.com/ProjectsByJackHe/multiplayer-chess-game-backend.git
// https: //stackoverflow.com/questions/48627210/how-to-stream-data-over-socket-io-to-client
// Stream a video using Express.js and Socket.io
// https: //medium.com/3mig4/stream-a-video-using-express-js-and-socket-io-6c4d1dd263b9
// http://yhsiang.logdown.com/posts/2014/04/17/stream-to-youtube-english
// https://medium.com/the-phi/youtube-downloader-using-node-js-87af683d1dfc

// npm install ytdl-core
// const ytdl       = require(‘ytdl - exec’);
////
// https://javascript.plainenglish.iohttps://dashboard.heroku.com/apps/info22/create-a-node-js-video-streaming-application-3095cb2aa52c
// https://github.com/daspinola/video-stream-sample/blob/master/server.js
// https: //levelup.gitconnected.com/building-a-video-chat-app-with-node-js-socket-io-webrtc-26f46b213017
///
import { lstatSync, statSync, readFile, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'url';
import httpServer, { createServer } from 'http';

import ioServer from 'socket.io';
import { BASH_COLORS_HELPER as _BASH_COLORS_HELPER, getValuesFromConfigJson as _getValuesFromConfigJson, getBashParameters as _getBashParameters, resolveURL as _resolveURL, beforeHttpListen, afterHttpListen, addSocket } from 'rtcmulticonnection-server';

var PORT        = 3001;
var isUseHTTPs  = false;

const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = _BASH_COLORS_HELPER;
const getValuesFromConfigJson = _getValuesFromConfigJson;
const getBashParameters = _getBashParameters;
const resolveURL = _resolveURL;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);

// if user didn't modifed "PORT" object
// then read value from "config.json"
if(PORT === 9001) {
    PORT = config.port;
}
if(isUseHTTPs === false) {
    isUseHTTPs = config.isUseHTTPs;
}

function serverHandler(request, response) {
    // to make sure we always get valid info from json file
    // even if external codes are overriding it
    config = getValuesFromConfigJson(jsonPath);
    config = getBashParameters(config, BASH_COLORS_HELPER);

    // HTTP_GET handling code goes below
    try {
        var uri, filename;

        try {
            if (!config.dirPath || !config.dirPath.length) {
                config.dirPath = null;
            }

            uri = parse(request.url).pathname;
            filename = join(config.dirPath ? resolveURL(config.dirPath) : process.cwd(), uri);
        } catch (e) {
            pushLogs(config, 'url.parse', e);
        }

        filename = (filename || '').toString();

        if (request.method !== 'GET' || uri.indexOf('..') !== -1) {
            try {
                response.writeHead(401, {
                    'Content-Type': 'text/plain'
                });
                response.write('401 Unauthorized: ' + join('/', uri) + '\n');
                response.end();
                return;
            } catch (e) {
                pushLogs(config, '!GET or ..', e);
            }
        }

        if(filename.indexOf(resolveURL('/admin/')) !== -1 && config.enableAdmin === true) {
            try {
                response.writeHead(401, {
                    'Content-Type': 'text/plain'
                });
                response.write('401 Unauthorized: ' + join('/', uri) + '\n');
                response.end();
                return;
            } catch (e) {
                pushLogs(config, '!GET or ..', e);
            }
            return;
        }

        var matched = false;
        ['/demos/', '/dev/', '/dist/', '/socket.io/', '/node_modules/canvas-designer/', '/admin/'].forEach(function(item) {
            if (filename.indexOf(resolveURL(item)) !== -1) {
                matched = true;
            }
        });

        // files from node_modules
        ['RecordRTC.js', 'FileBufferReader.js', 'getStats.js', 'getScreenId.js', 'adapter.js', 'MultiStreamsMixer.js'].forEach(function(item) {
            if (filename.indexOf(resolveURL('/node_modules/')) !== -1 && filename.indexOf(resolveURL(item)) !== -1) {
                matched = true;
            }
        });

        if (filename.search(/.js|.json/g) !== -1 && !matched) {
            try {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write('404 Not Found: ' + join('/', uri) + '\n');
                response.end();
                return;
            } catch (e) {
                pushLogs(config, '404 Not Found', e);
            }
        }

        ['Video-Broadcasting', 'Screen-Sharing', 'Switch-Cameras'].forEach(function(fname) {
            try {
                if (filename.indexOf(fname + '.html') !== -1) {
                    filename = filename.replace(fname + '.html', fname.toLowerCase() + '.html');
                }
            } catch (e) {
                pushLogs(config, 'forEach', e);
            }
        });

        var stats;

        try {
            stats = lstatSync(filename);

            if (filename.search(/demos/g) === -1 && filename.search(/admin/g) === -1 && stats.isDirectory() && config.homePage === '/demos/index.html') {
                if (response.redirect) {
                    response.redirect('/demos/');
                } else {
                    response.writeHead(301, {
                        'Location': '/demos/'
                    });
                }
                response.end();
                return;
            }
        } catch (e) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write('404 Not Found: ' + join('/', uri) + '\n');
            response.end();
            return;
        }

        try {
            if (statSync(filename).isDirectory()) {
                response.writeHead(404, {
                    'Content-Type': 'text/html'
                });

                if (filename.indexOf(resolveURL('/demos/MultiRTC/')) !== -1) {
                    filename = filename.replace(resolveURL('/demos/MultiRTC/'), '');
                    filename += resolveURL('/demos/MultiRTC/index.html');
                } else if (filename.indexOf(resolveURL('/admin/')) !== -1) {
                    filename = filename.replace(resolveURL('/admin/'), '');
                    filename += resolveURL('/admin/index.html');
                } else if (filename.indexOf(resolveURL('/demos/dashboard/')) !== -1) {
                    filename = filename.replace(resolveURL('/demos/dashboard/'), '');
                    filename += resolveURL('/demos/dashboard/index.html');
                } else if (filename.indexOf(resolveURL('/demos/video-conference/')) !== -1) {
                    filename = filename.replace(resolveURL('/demos/video-conference/'), '');
                    filename += resolveURL('/demos/video-conference/index.html');
                } else if (filename.indexOf(resolveURL('/demos')) !== -1) {
                    filename = filename.replace(resolveURL('/demos/'), '');
                    filename = filename.replace(resolveURL('/demos'), '');
                    filename += resolveURL('/demos/index.html');
                } else {
                    filename += resolveURL(config.homePage);
                }
            }
        } catch (e) {
            pushLogs(config, 'statSync.isDirectory', e);
        }

        var contentType = 'text/plain';
        if (filename.toLowerCase().indexOf('.html') !== -1) {
            contentType = 'text/html';
        }
        if (filename.toLowerCase().indexOf('.css') !== -1) {
            contentType = 'text/css';
        }
        if (filename.toLowerCase().indexOf('.png') !== -1) {
            contentType = 'image/png';
        }

        readFile(filename, 'binary', function(err, file) {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.write('404 Not Found: ' + join('/', uri) + '\n');
                response.end();
                return;
            }

            try {
                file = file.replace('connection.socketURL = \'/\';', 'connection.socketURL = \'' + config.socketURL + '\';');
            } catch (e) {}

            response.writeHead(200, {
                'Content-Type': contentType
            });
            response.write(file, 'binary');
            response.end();
        });
    } catch (e) {
        pushLogs(config, 'Unexpected', e);

        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 Not Found: Unexpected error.\n' + e.message + '\n\n' + e.stack);
        response.end();
    }
}

var httpApp;

if (isUseHTTPs) {
    httpServer = require('https');

    // See how to use a valid certificate:
    // https://github.com/muaz-khan/WebRTC-Experiment/issues/62
    var options = {
        key: null,
        cert: null,
        ca: null
    };

    var pfx = false;

    if (!existsSync(config.sslKey)) {
        console.log(BASH_COLORS_HELPER.getRedFG(), 'sslKey:\t ' + config.sslKey + ' does not exist.');
    } else {
        pfx = config.sslKey.indexOf('.pfx') !== -1;
        options.key = readFileSync(config.sslKey);
    }

    if (!existsSync(config.sslCert)) {
        console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCert:\t ' + config.sslCert + ' does not exist.');
    } else {
        options.cert = readFileSync(config.sslCert);
    }

    if (config.sslCabundle) {
        if (!existsSync(config.sslCabundle)) {
            console.log(BASH_COLORS_HELPER.getRedFG(), 'sslCabundle:\t ' + config.sslCabundle + ' does not exist.');
        }

        options.ca = readFileSync(config.sslCabundle);
    }

    if (pfx === true) {
        options = {
            pfx: sslKey
        };
    }

    httpApp = createServer(options, serverHandler);
} else {
    httpApp = createServer(serverHandler);
}

beforeHttpListen(httpApp, config);
httpApp = httpApp.listen(process.env.PORT || PORT, process.env.IP || "0.0.0.0", function() {
    afterHttpListen(httpApp, config);
});

// --------------------------
// socket.io codes goes below

ioServer(httpApp).on('connection', function(socket) {
    addSocket(socket, config);

    // ----------------------
    // below code is optional

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function(message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});
