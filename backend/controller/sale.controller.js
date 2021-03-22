import Sale from '../model/sale.model';
import httpStatus from "http-status";
import {handleError} from "./util.controller";

export const createSale = async (req, res, next) => {
    try {
        let result;
        const {user_id, store_name} = req.body;
        const existSale = await Sale.findOne({user_id, store_name})
        if (existSale) {
            result = await Sale.findOneAndUpdate({user_id, store_name}, req.body)
            res.status(httpStatus.OK).send(result);
        } else {
            result = await Sale.create(req.body)
            res.status(httpStatus.CREATED).send(result);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

export const readSale = async (req, res, next) => {
    try {

    } catch (e) {
        next(handleError(res, e))
    }
}

export const updateSale = async (req, res, next) => {
    try {

    } catch (e) {
        next(handleError(res, e))
    }
}

export const deleteSale = async (req, res, next) => {
    try {

    } catch (e) {
        next(handleError(res, e))
    }
}
