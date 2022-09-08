/*
*  vicdeoCopyright (c) 2022 The GAJ project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style licensavie
*  that can be found in the LICENSE file in the root of the source tree.
    https://github.com/webrtc/samples/tree/gh-pages/src/content
 */
// How to use a smartphone as a mobile hotspot
// https: www.computerworld.com/article/2499772/how-to-use-a-smartphone-as-a-mobile-hotspot
'use strict';

const audioInputSelect = document.querySelector('select#audioSource');
const audioOutputSelect = document.querySelector('select#audioOutput');
const videoSelect = document.querySelector('select#videoSource');
const selectors = [audioInputSelect, audioOutputSelect, videoSelect];

audioOutputSelect.disabled = !('sinkId' in HTMLMediaElement.prototype);
let utils = new Utils('errorMessage');
utils.loadCode('codeSnippet', 'codeEditor');
let streaming = false;
let videoInput = document.getElementById('videoInput');
let executeBroadcast = document.getElementById('ExecuteBroadcast');
let startAndStopSrc     = document.getElementById('startAndStopSrc')
let canvasOutput = document.getElementById('canvasOutput');
let canvasContext = canvasOutput.getContext('2d');

function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    const values = selectors.map(select => select.value);
    selectors.forEach(select => {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    });
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            option.text = deviceInfo.label || `microphone ${audioInputSelect.length + 1}`;
            audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            option.text = deviceInfo.label || `speaker ${audioOutputSelect.length + 1}`;
            audioOutputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || `camera ${videoSelect.length + 1}`;
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source/device: ', deviceInfo);
        }
    }
    selectors.forEach((select, selectorIndex) => {
        if (Array.prototype.slice.call(select.childNodes).some(n => n.value === values[selectorIndex])) {
            select.value = values[selectorIndex];
        }
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
    if (typeof element.sinkId !== 'undefined') {
        element.setSinkId(sinkId)
            .then(() => {
                console.log(`Success, audio output device attached: ${sinkId}`);
            })
            .catch(error => {
                let errorMessage = error;
                if (error.name === 'SecurityError') {
                    errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
                }
                console.error(errorMessage);
                // Jump back to first output device in the list as it's the default.
                audioOutputSelect.selectedIndex = 0;
            });
    } else {
        console.warn('Browser does not support output device selection.');
    }
}

function changeAudioDestination() {
    const audioDestination = audioOutputSelect.value;
    attachSinkId(videoInput, audioDestination);
}

function gotStream(stream) {
    
    window.stream = stream; // make stream available to console
    videoInput.srcObject = stream;
    // Refresh button list in case labels have become available
    videoInput.addEventListener('canplay', utils.onVideoCanPlay, false);
    utils.video = videoInput;
    utils.stream = stream;
    utils.onCameraStartedCallback = callback;
    return navigator.mediaDevices.enumerateDevices();
}

function handleError(error) {
    // navigator.MediaDevices.getUserMedia error: callback is not defined ReferenceError
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
}
// navigator.MediaDevices.getUserMedia error: callback is not defined ReferenceError
function start() {
    console.log("Start from the selected source")
    if (window.stream) {
        window.stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    const audioSource = audioInputSelect.value;
    const videoSource = videoSelect.value;
    const constraints = {
        audio: {
            deviceId: audioSource ? {
                exact: audioSource
            } : undefined
        },
        video: {
            deviceId: videoSource ? {
                exact: videoSource
            } : undefined
        }
    };
    // navigator.MediaDevices.getUserMedia error: callback is not defined ReferenceError
    navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream).then(gotDevices)
    .catch(handleError);
}//start

audioInputSelect.onchange = start;
audioOutputSelect.onchange = changeAudioDestination;
videoSelect.onchange = startStopSrc;
function startStopSrc() {
    if (!streaming) {
        utils.clearError();
        streaming = true;

        start()
        startAndStopSrc.innerText = 'Close Video Device';
        this.startCamera = function (resolution, callback, videoId) {

            const constraints = {
                'qvga': {
                    width: {
                        exact: 320
                    },
                    height: {
                        exact: 240
                    }
                },
                'vga': {
                    width: {
                        exact: 640
                    },
                    height: {
                        exact: 480
                    }
                }
            };
            let video = document.getElementById(videoId);
            if (!video) {
                video = document.createElement('video');
            }

            let videoConstraint = constraints[resolution];
            if (!videoConstraint) {
                videoConstraint = true;
            }

            navigator.mediaDevices.getUserMedia({
                    video: videoConstraint,
                    audio: false
                })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    self.video = video;
                    self.stream = stream;
                    self.onCameraStartedCallback = callback;
                    video.addEventListener('canplay', onVideoCanPlay, false);
                })
                .catch(function (err) {
                    self.printError('Camera Error: ' + err.name + ' ' + err.message);
                });
        };

    } else {
        utils.stopCamera();
        streaming = false;
        startAndStopSrc.innerText = 'Open Video Device';
    }
}
// -------CAM .JS----
ExecuteBroadcast.addEventListener('click', () => {
    //alert('ExecuteBroadcast')
    startAndStopSrc.innerText  = 'Close Device';
    ExecuteBroadcast.innerText = 'Stop Broadcast'
    //start();
    utils.executeCode('codeEditor');
})
//navigator.MediaDevices.getUserMedia error:  callback is not defined ReferenceError
startAndStopSrc.addEventListener('click', () => {
    if (!streaming) {
        utils.clearError();
        streaming = true;
        
        start()
        startAndStopSrc.innerText = 'Close Video Device';
        this.startCamera = function (resolution, callback, videoId) {

            const constraints = {
                'qvga': {
                    width: {
                        exact: 320
                    },
                    height: {
                        exact: 240
                    }
                },
                'vga': {
                    width: {
                        exact: 640
                    },
                    height: {
                        exact: 480
                    }
                }
            };
            let video = document.getElementById(videoId);
            if (!video) {
                video = document.createElement('video');
            }

            let videoConstraint = constraints[resolution];
            if (!videoConstraint) {
                videoConstraint = true;
            }

            navigator.mediaDevices.getUserMedia({
                    video: videoConstraint,
                    audio: false
                })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                    self.video = video;
                    self.stream = stream;
                    self.onCameraStartedCallback = callback;
                    video.addEventListener('canplay', onVideoCanPlay, false);
                })
                .catch(function (err) {
                    self.printError('Camera Error: ' + err.name + ' ' + err.message);
                });
        };

    } else {
        utils.stopCamera();
        streaming = false;
        startAndStopSrc.innerText = 'Open Video Device';
    }
});

function startStop() {
    if (!streaming) {
        utils.clearError();

    } else {
        utils.stopCamera();
        onVideoStopped();
    }
}

function onVideoStarted() {
    streaming = true;
    executeBroadcast.innerText = 'Stop Broadcast';
    // videoInput.width = videoInput.videoWidth;
    // videoInput.height = videoInput.videoHeight;
    utils.executeCode('codeEditor');
}

function onVideoStopped() {
    streaming = false;
    canvasContext.clearRect(0, 0, canvasOutput.width, canvasOutput.height);
    executeBroadcast.innerText = 'Resume Broadcast';
}