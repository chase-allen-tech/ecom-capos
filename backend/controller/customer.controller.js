import Customer from './../model/customer.model';
import httpStatus from "http-status";
import {handleError} from "./util.controller";


export const createCustomer = async (req, res, next) => {
    const {range} = req.body
    try {
        if (range === 'csv-import') {
                const data = req.body.data;
                const customers = data.map(item => {
                     item.store_name = req.body.store_name;
                     item.user_id = req.body.user_id;
                     return item;
                 })
                 const result = await Customer.insertMany(customers);
                 res.status(httpStatus.CREATED).send(result);
        } else {
            const result = await Customer.create(req.body);
            res.status(httpStatus.CREATED).send(result)
        }

    } catch (e) {
        next(handleError(res, e))
    }
}

export const readCustomer = async (req, res, next) => {
    let result;
    const {range} = req.query;
    const data = req.query;
    delete data.range;
    const query = {}
    try {
        // Search customer
        if (range === 'all-factor') {
            Object.keys(data).forEach(key => {
                if (req.query[key]) {
                    if (key.includes('created')) {
                        if (key === 'created_from') {
                            Object.assign(query, {"created_at": {"$gte": req.query[key]}});
                        }
                        if (key === 'created_to') {
                            Object.assign(query, {"created_at": {"$lt": req.query[key]}});
                        }
                    } else {
                        Object.assign(query, {[key]: req.query[key]});
                    }
                }
            })
            result = await Customer.find(query);
        } else if (range === '_id') {
            result = await Customer.findOne(data);
        } else {
            result = await Customer.find({});
        }
        res.status(httpStatus.OK).send(result);
    } catch (e) {
        handleError(res, e)
    }
};

export const updateCustomer = async (req, res, next) => {
    try {
        const result = await Customer.findOneAndUpdate({_id: req.body._id}, req.body, {new: true});
        res.status(httpStatus.OK).send(result);
    } catch (e) {
        next(handleError(res, e));
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {

    } catch (e) {

    }
};
