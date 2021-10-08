const express = require("express");
const app = express();
const router = express.Router();
const logger = require("morgan");
const bodyParser = require("body-parser");
const route = require("./route");
const PORT = 8080;
const models = require("./models/index");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

models.sequelize
    .sync()
    .then(() => {
        console.log("====DB 연결 성공======");
    })
    .catch((err) => {
        console.log("연결 실패");
        console.log(err);
    });

global.appRoot = path.resolve(__dirname);
// view engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

//cors
const cors = require("cors");
router.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
    })
);

app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

//routers
app.use("/api", route);
app.use("/api/images", express.static("./static"));

app.use((req, res, next) => {
    next(createError(404));
});

app.listen(PORT, () => {
    console.log(`          _         _        _            _               _   _                 _               _    `);
    console.log(`        /\ \      /\ \     /\_\         /\ \            /\_\/\_\ _            /\ \            /\ \   `);
    console.log(`       /  \ \     \ \ \   / / /        /  \ \          / / / / //\_\          \ \ \           \ \ \  `);
    console.log(`      / /\ \_\     \ \ \_/ / /        / /\ \ \        /\ \/ \ \/ / /          /\ \_\          /\ \_\ `);
    console.log(`     / / /\/_/      \ \___/ /        / / /\ \ \      /  \____\__/ /          / /\/_/         / /\/_/ `);
    console.log(`    / / / ______     \ \ \_/        / / /  \ \_\    / /\/________/          / / /           / / /    `);
    console.log(`   / / / /\_____\     \ \ \        / / /   / / /   / / /\/_// / /          / / /           / / /     `);
    console.log(`  / / /  \/____ /      \ \ \      / / /   / / /   / / /    / / /          / / /           / / /      `);
    console.log(` / / /_____/ / /        \ \ \    / / /___/ / /   / / /    / / /       ___/ / /__      ___/ / /__     `);
    console.log(`/ / /______\/ /          \ \_\  / / /____\/ /    \/_/    / / /       /\__\/_/___\    /\__\/_/___\    `);
    console.log(`\/___________/            \/_/  \/_________/             \/_/        \/_________/    \/_________/    `);
});

module.exports = app;
