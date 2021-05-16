process.env.NODE_ENV == "development" ? [
  {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "agilepoker-db",
    "password": "nZUV6vai1fbAkLoqbP2ali",
    "database": "agilepoker-db",
    "entities": ["./src/modules/**/infra/typeorm/entities/*.ts"],
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
    },
    "synchronize": true
  }
] : [
  {
    "name": "default",
    "type": "postgres",
    "url": "postgres://swhdzsuoqeisre:3bfd1a3ecffd7dccd33dd8c5bbaa350835b9392eafc0e29ee22faea7f60ce74d@ec2-54-152-185-191.compute-1.amazonaws.com:5432/dtgaj4hes20hk",
    "entities": ["./dist/modules/**/infra/typeorm/entities/*.js"],
    "migrations": ["./dist/shared/infra/typeorm/migrations/*.js"],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    },
    "synchronize": true
  }
]
