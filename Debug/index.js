const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const debug = require('debug');

const morgan = require('morgan');
const app = require('express')();

// Startup
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}
// Db work...
dbDebugger('connected to the database...');

// Generic Debug

debug(' Morgan Enabled')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`))