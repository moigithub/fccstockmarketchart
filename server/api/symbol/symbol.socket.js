/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Symbol = require('./symbol.model');

exports.register = function(socket) {
  Symbol.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Symbol.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('symbol:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('symbol:remove', doc);
}