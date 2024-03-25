import { Request, Response, Router } from 'express';
import passport from 'passport';

const CLIENT_URL = process.env.REACT_APP_URL;

const router = Router();

router.get('/login/success', (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful',
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get('/login/failed', (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

router.get('/logout', (req: Request, res: Response) => {
  req.logout((err) => {
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

router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

export default router;
