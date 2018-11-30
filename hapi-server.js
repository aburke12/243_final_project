// Server Page
// Authors: Ally Burke, Lauren James

// Standard Node modules
const Path = require('path');

// Knex
const knex = require("knex")({
    client: "pg",
    connection: {
        host: "faraday.cse.taylor.edu",
        database: "ally_burke",
	user: "ally_burke",
	password: "wadurahu"
    }
});

// hapi
const Boom = require('boom');
const Joi = require('joi');
const Hapi = require('hapi');

const server = Hapi.server({
  host: 'localhost',
  port: 3000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
});
