import User from '../model/user.model';
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';
import config from '../config/var.config';
import {transporter} from './util.controller';
import * as Util from './util.controller';
const handleError = Util.handleError;

export const createData = async (req, res, next) => {
    // try {
        const { _id, payload } = req.body;

        var query = {};
        var sales_tax = {};
        var outlet = {};

        if("name" in payload) { query["first_name"] = payload.name;}
        if("phone" in payload) { query["phone"] = payload.phone;}
        if("state" in payload) { query["state"] = payload.state;}
        if("street" in payload) { query["street"] = payload.street;}
        if("email" in payload) { query["email"] = payload.email;}
        if("country" in payload) { query["country"] = payload.country;}
        if("suburb" in payload) { query["suburb"] = payload.suburb;}
        if("twitter" in payload) { query["twitter"] = payload.twitter;}

        if("defaultTax" in payload) { sales_tax["percentage"] = payload.defaultTax;}

        if("orderNumber" in payload) { outlet["orderNumber"] = payload.orderNumber;}
        if("orderNumberPrefix" in payload) { outlet["orderNumberPrefix"] = payload.orderNumberPrefix;}
        if("supplierReturnNumber" in payload) { outlet["supplierReturnNumber"] = payload.supplierReturnNumber;}
        if("supplierReturnPrefix" in payload) { outlet["supplierReturnPrefix"] = payload.supplierReturnPrefix;}
        if("timezone" in payload) { outlet["timezone"] = payload.timezone;}

        query["sales_tax"] = sales_tax;
        query["outlet"] = outlet;

        console.log(query);

        const user = await User.create(query);


        // const userinfo = await User.findOne(req.query);
        res.status(httpStatus.OK).send(user);
        // const user = await User.create(req.body);
    // } catch (e) {
    //     res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    // }
}

export const readData = async (req, res, next) => {
    try {

        const userinfo = await User.findOne(req.query);
        res.status(httpStatus.OK).send(userinfo);
    } catch (e) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const readAllData = async (req, res, next) => {
    try {

        const users = await User.find({});
        res.status(httpStatus.OK).send(users);
    } catch (e) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const updateData = async (req, res, next) => {
    try {
        console.log("*********** Update Data ***************");
        let result = {};
        const { _id, payload } = req.body;

        let query = {}
        if("storeName" in payload) {
            query["store_name"] = payload.storeName;
        }
        if("privateUrl" in payload) {
            query["private_web_address"] = payload.privateUrl;
        }
        if("defaultCurrency" in payload) {
            query["currency_code"] = payload.defaultCurrency;
        }
        if("receiptTemplate" in payload) {
            query["receipt_name"] = payload.receiptTemplate;
        }
        if("contactName" in payload) {
            query["first_name"] = payload.contactName;
        }
        if("phone" in payload) {
            query["phone"] = payload.phone;
        }
        if("profileImage" in payload) {
            query["profile_img"] = payload.profileImage;
        }
        if("website" in payload) {
            query["website"] = payload.website;
        }
        if("twitter" in payload) {
            query["twitter"] = payload.twitter;
        }

        if("city1" in payload) {
            query["city"] = payload.city1;
        }
        if("city2" in payload) {
            query["p_city"] = payload.city2;
        }
        if("country1" in payload) {
            query["country"] = payload.country1;
        }
        if("country2" in payload) {
            query["p_country"] = payload.country2;
        }
        if("postcode1" in payload) {
            query["postcode"] = payload.postcode1;
        }
        if("postcode2" in payload) {
            query["p_postcode"] = payload.postcode2;
        }
        if("state1" in payload) {
            query["state"] = payload.state1;
        }
        if("state2" in payload) {
            query["p_state"] = payload.state2;
        }
        if("street1" in payload) {
            query["street_address"] = payload.street1;
        }
        if("street2" in payload) {
            query["p_street_address"] = payload.street2;
        }
        if("suburb1" in payload) {
            query["suburb"] = payload.suburb1;
        }
        if("suburb2" in payload) {
            query["p_suburb"] = payload.suburb2;
        }

        console.log(query);

        result = await User.findOneAndUpdate({_id: _id}, query, { new: true });
        res.status(httpStatus.OK).send(result);

    } catch (e) {
        console.log(e);
        next(handleError(res, e));
    }
}