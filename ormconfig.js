module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "host": process.env.POSTGRES_HOST,
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASS,
    "database": process.env.POSTGRES_DB,
    "entities": [process.env.POSTGRES_ENTITIES],
    "migrations": [process.env.POSTGRES_MIGRATIONS],
    "cli": {
      "migrationsDir": process.env.POSTGRES_MIGRATIONS_DIR
    },
    "synchronize": false,
    "ssl": true,
    "extra": {
      "ssl": {
        "rejectUnauthorized": false,
      },
    },
  }
]
