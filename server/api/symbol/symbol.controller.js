'use strict';

var _ = require('lodash');
var Symbol = require('./symbol.model');

// Get list of symbols
exports.index = function(req, res) {
  Symbol.find(function (err, symbols) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(symbols);
  });
};

// Get a single symbol
exports.show = function(req, res) {
  Symbol.findById(req.params.id, function (err, symbol) {
    if(err) { return handleError(res, err); }
    if(!symbol) { return res.status(404).send('Not Found'); }
    return res.json(symbol);
  });
};

// Creates a new symbol in the DB.
exports.create = function(req, res) {
  Symbol.create(req.body, function(err, symbol) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(symbol);
  });
};

// Updates an existing symbol in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Symbol.findById(req.params.id, function (err, symbol) {
    if (err) { return handleError(res, err); }
    if(!symbol) { return res.status(404).send('Not Found'); }
    var updated = _.merge(symbol, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(symbol);
    });
  });
};

// Deletes a symbol from the DB.
exports.destroy = function(req, res) {
  Symbol.findById(req.params.id, function (err, symbol) {
    if(err) { return handleError(res, err); }
    if(!symbol) { return res.status(404).send('Not Found'); }
    symbol.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}