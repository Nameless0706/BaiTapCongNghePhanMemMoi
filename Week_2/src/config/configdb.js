import { Sequelize } from "sequelize";

//const {Sequelize} = require('sequelize'); //ES5

const sequelize = new Sequelize('week_2', 'root', '123456', {
    host: 'localhost', 
    dialect: 'mysql',
    logging: true
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;