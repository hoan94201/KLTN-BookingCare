const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hoidanit", "root", null, {
  host: "localhost",
  dialectOptions: {
    "useUTC": false
  },
  dialect: "mysql",
  timezone: "+07:00",
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
