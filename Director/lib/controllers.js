"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {};

// curl --include \
//      --no-buffer \
//      --header "Connection: Upgrade" \
//      --header "Upgrade: websocket" \
//      --header "Host: localhost:8080" \
//      --header "Origin: http://localhost:8080" \
//      --header "Sec-WebSocket-Key: SGVsbG8sIHdvcmxkIQ==" \
//      --header "Sec-WebSocket-Version: 13" \
//      http://localhost:8080/