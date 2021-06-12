const { parse } = require("pg-connection-string");

const connectionOptions = parse(process.env.DATABASE_URL);

const ssl = process.env.NODE_ENV !== "development" ? {
  "ssl": true,
    "extra": {
      "ssl": {
        "rejectUnauthorized": false,
      },
    },
} : {}


module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "host": connectionOptions.host,
    "port": connectionOptions.port,
    "username": connectionOptions.user,
    "password": connectionOptions.password,
    "database": connectionOptions.database,
    "entities": [process.env.POSTGRES_ENTITIES],
    "migrations": [process.env.POSTGRES_MIGRATIONS],
    "cli": {
      "migrationsDir": process.env.POSTGRES_MIGRATIONS_DIR
    },
    "synchronize": false,
    ...ssl
  }
]
