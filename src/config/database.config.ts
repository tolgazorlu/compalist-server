import mongoose from "mongoose"; // IMPORT Mongoose
import chalk from "chalk"; // IMPORT Chalk provides colored text in the terminal.

const keys = require("../config/keys"); // Get keys from config
const { database } = keys; // GET database uri in config/keys

/**
 * @desc DATABASE CONNECTION
 */

const connectToDB = async () => {
    try {
        await mongoose
            .connect(database.url) // Trying connect to database
            .then(() => {
                console.log(chalk.bgGreen("MongoDB Database connected!")); // If database is connected show success log in the terminal.
            })
            .catch((error) => {
                console.log(chalk.bgRed(error)); // If database is not connected show error log in the terminal.
            });
    } catch (error) {
        console.log(chalk.bgRed(error));
        return null;
    }
};

module.exports = connectToDB;
