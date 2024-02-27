require("dotenv").config();

module.exports = {
  development: {
    username: "spatialdb_user",
    password: "QcGTkysjRkg7K4OEuvqcgIFkmbh2mWYW",
    database: "spatialdb",
    host: "dpg-cn2cdnacn0vc738v6as0-a.frankfurt-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "spatialdb_user",
    password: "QcGTkysjRkg7K4OEuvqcgIFkmbh2mWYW",
    database: "spatialdb",
    host: "dpg-cn2cdnacn0vc738v6as0-a.frankfurt-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: "spatialdb_user",
    password: "QcGTkysjRkg7K4OEuvqcgIFkmbh2mWYW",
    database: "spatialdb",
    host: "dpg-cn2cdnacn0vc738v6as0-a.frankfurt-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
