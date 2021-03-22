import express from 'express';
import * as  AuthController from '../controller/auth.controller';

const router = express.Router();

router.route('/country')
    .get(AuthController.readCountry);

router.route('/register')
    .post(AuthController.register);

router.route('/login')
    .post(AuthController.login);

router.route('/send-email-verification')
    .post(AuthController.sendEmailVerification);

router.route('/verify-email')
    .post(AuthController.verifyEmail)
export default router;
