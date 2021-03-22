import Country from '../model/country.model';
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import config from '../config/var.config';
import {transporter} from './util.controller';

export const getCountries = async (req, res, next) => {
    try {

        const countries = await Country.find({});
        res.status(httpStatus.OK).send(countries);
    } catch (e) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}