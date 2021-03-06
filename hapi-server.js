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

async function init() {
    // Show routes at startup.
    await server.register(require("blipp"));

    // Output logging information.
    await server.register({
        plugin: require("hapi-pino"),
        options: {
            prettyPrint: true
        }
    });

    // Configure static file service.
    await server.register(require("inert"));

    // Configure routes.
    server.route([
        {
            method: "POST",
            path: "/api/accounts",
            config: {
                description: "Sign up for an account",
                validate: {
                    payload: {
                        firstName: Joi.string().required(),
                        lastName: Joi.string().required(),
                        email: Joi.string()
                            .email()
                            .required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, h) => {
                let resultSet = await knex("accounts")
                    .select()
                    .where("email", request.payload.email);
                if (resultSet.length > 0) {
                    return {
                        ok: false,
                        msge: `The account '${request.payload.email}' is already in use`
                    };
                }

                let result = await knex("accounts").insert({
                    firstname: request.payload.firstName,
                    lastname: request.payload.lastName,
                    email: request.payload.email,
                    password: request.payload.password
                });

                if (result.rowCount === 1) {
                    return {
                        ok: true,
                        msge: `Created account '${request.payload.email}'`
                    };
                } else {
                    return {
                        ok: false,
                        msge: `Couldn't add '${
                            request.payload.email
                        }' to the database`
                    };
                }
            }
        },
        {
            method: "GET",
            path: "/api/accounts",
            config: {
                description: "Retrieve all accounts"
            },
            handler: async (request, h) => {
                return knex("accounts").select("email", "firstname", "lastname");
            }
        },
        {
          method: "GET",
          path: "/api/teams",
          config: {
            description: "Retrieve all teams"
          },
          handler: async (request, h) => {
            return knex("teams").select("team_id");
          }
        },
        {
          method: "GET",
          path: "/api/schedule",
          config: {
            description: "Retrieve monthly schedule"
          },
          handler: async (request, h) => {
            return knex("teams").select("team_id");
            //EDIT THIS TO QUERY FOR SCHEDULE
          }
        },
        {
          method: "GET",
          path: "/api/activities",
          config: {
            description: "Activities options"
          },
          handler: async (request, h) => {
            return knex("teams").select("team_id");
            //EDIT THIS TO QUERY FOR ACTIVITIES
          }
        },
        {
          method: "GET",
          path: "/api/core-hours",
          config: {
            description: "List and edit core hours"
          },
          handler: async (request, h) => {
            return knex("teams").select("team_id");
            //EDIT THIS TO QUERY FOR CORE HOURS
          }
        },
        {
          method: "GET",
          path: "/api/commitments",
          config: {
            description: "List and edit commitments"
          },
          handler: async (request, h) => {
            return knex("teams").select("team_id");
            //EDIT THIS TO QUERY FOR COMMITMENTS
          }
        },
        {
            method: "GET",
            path: "/{param*}",
            config: {
                description: "Production Application"
            },
            handler: {
                directory: {
                    path: ".",
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    ]);

    // Start the server.
    await server.start();
    server.logger().info(`Server running at ${server.info.uri}`);
}

process.on("unhandledRejection", err => {
    server.logger().error(err);
    process.exit(1);
});

// Go!
init();
