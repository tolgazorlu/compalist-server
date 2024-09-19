import path from "path";
const express = require("express"); // IMPORT EXPRESS - Express is a super easy backend framework for NodeJS
const chalk = require("chalk"); // IMPORT CHALK - Chalk provides colored text in the terminal.
const userAuthRoute = require("./routes/userAuth.route"); // IMPORT USER AUTH ROUTE
const companyRoute = require("./routes/company.route"); // IMPORT COMPANY ROUTE
const blogRoute = require("./routes/blog.route"); // IMPORT BLOG ROUTE
const contactRoute = require("./routes/contact.route"); // IMPORT CONTACT ROUTE
const suggestRoute = require("./routes/suggest.route"); // IMPORT SUGGEST ROUTE
const ratingRoute = require("./routes/rating.route"); // IMPORT RATING ROUTE
const statsRoute = require("./routes/stats.route"); // IMPORT STATS ROUTE

const app = express();
const cors = require("cors");

// * SETUP DB
const connectToDB = require("./config/database.config");
connectToDB();

// * MIDDLEWARES
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }),
); // This lines for CORS error.

// App need the below lines for POST and PUT proccess. We don't need body-parser anymore with this 2 lines.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * AUTH ROUTES
app.use("/api/auth/user", userAuthRoute); // USER AUTH
// * ROUTES
app.use("/api/company", companyRoute); // COMPANY
app.use("/api/blog", blogRoute); // BLOG
app.use("/api/contact", contactRoute); // CONTACT
app.use("/api/suggest", suggestRoute); // Suggest
app.use("/api/rating", ratingRoute); // Rating
app.use("/api/stats", statsRoute); // Rating

// GET PORT number from config/keys.ts
const keys = require("./config/keys");
const { port } = keys;

// app.use(express.static(path.join(__dirname, "dist")));

// * LISTENING PORT
app.listen(port, () => {
    console.log(`Port is running on ${chalk.green(port)}`); // PORT IS RUNNING ON 8000 IN LOCAL
});
