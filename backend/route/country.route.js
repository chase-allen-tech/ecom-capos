import express from 'express';
import * as  CountryController from '../controller/country.controller';

const router = express.Router();

router.route('/get_countries').get(CountryController.getCountries);



export default router;
