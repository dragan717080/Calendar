"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var passport_google_oauth20_1 = require("passport-google-oauth20");
var passport_github2_1 = require("passport-github2");
var passport_1 = __importDefault(require("passport"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: (_a = process.env.GOOGLE_CLIENT_ID) !== null && _a !== void 0 ? _a : '',
    clientSecret: (_b = process.env.GOOGLE_CLIENT_SECRET) !== null && _b !== void 0 ? _b : '',
    callbackURL: '/auth/google/callback',
}, function (_a) {
    var accessToken = _a.accessToken, refreshToken = _a.refreshToken, profile = _a.profile, done = _a.done;
    done(null, profile);
}));
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: '/auth/github/callback',
}, function (_a) {
    var accessToken = _a.accessToken, refreshToken = _a.refreshToken, profile = _a.profile, done = _a.done;
    done(null, profile);
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user); // Assuming user has an 'id' property
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
