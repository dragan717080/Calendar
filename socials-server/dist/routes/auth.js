"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var CLIENT_URL = process.env.REACT_APP_URL;
var router = (0, express_1.Router)();
router.get('/login/success', function (req, res) {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user,
            //   cookies: req.cookies
        });
    }
});
router.get('/login/failed', function (req, res) {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});
router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return;
        }
        // Logout successful
        // To do: env
        res.redirect('http://localhost:3000');
    });
});
/*
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
); */
router.get('/github', passport_1.default.authenticate('github', { scope: ['profile'] }));
router.get('/github/callback', passport_1.default.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
}));
exports.default = router;
