#!/usr/bin/env node

var Default = require('./lib/default');
var Timer = require('./lib/timer');

var op = process.argv[2];

if ( op == 'log' ) {
    Default.run;
} else if ( op == 'timer' ) {
    Timer.run;
}