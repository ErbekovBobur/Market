const pg = require('pg');

const conString = "postgres://iqiqjock:vQU1WPzyQbkPbgpkVjSVtBETno-hE1Yq@hansken.db.elephantsql.com/iqiqjock";
const client = new pg.Client(conString);

client.connect();

module.exports = client;