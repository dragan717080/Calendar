"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var passport_1 = __importDefault(require("passport"));
var auth_1 = __importDefault(require("./routes/auth"));
dotenv_1.default.config();
var app = (0, express_1.default)();
console.log(process.env.GITHUB_ID);
app.use((0, cors_1.default)());
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['Dragan'],
    maxAge: 24 * 60 * 60 * 60,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
}));
app.use("/auth", auth_1.default);
var port = process.env.PORT;
app.listen(port, function () { return console.log("App listening on PORT ".concat(port)); });
