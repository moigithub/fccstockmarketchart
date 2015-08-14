'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SymbolSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Symbol', SymbolSchema);