import Product from '../model/product.model';
import Brand from '../model/brand.model';
import Supplier from '../model/supplier.model';
import Type from '../model/type.model';
import Tag from '../model/tag.model';
import Attribute from '../model/attribute.model';
import Order from '../model/order.model';
import * as Util from './util.controller';
const handleError = Util.handleError;

import httpStatus from "http-status";
import {transporter} from "./util.controller";
import config from "../config/var.config";

// Product

export const createProduct = async (req, res, next) => {
    try {
        const {mode, data} = req.body;
        if (mode === 'csv-import') {
            const products = data.map(product => {
                product.user_id = req.body.user_id;
                product.store_name = req.body.store_name;
                product.variant_inv = product.variant_inventory;
                product.tracking_inv = product.tracking_inventory;
                product.tag = product.tag.split(';')
                return product;
            });
            const result = await Product.insertMany(products);
            res.status(httpStatus.CREATED).send(result)
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

export const readProduct = async (req, res, next) => {
    try {
        let result;
        const {range} = req.query;
        delete req.query.range;
        if (range === 'all-factor') {
            Object.keys(req.query).forEach((key) => {
                // When filter product, if field is empty, remove that key from object.
                if (key !== 'enabled' && !req.query[key]) {
                    delete req.query[key]
                }
            });
            if (req.query.enabled !== '') {
                req.query.enabled = req.query.enabled === 'true';
            }  else {
                delete req.query.enabled;
            }
            result = await Product.find(req.query);
        } else if (range === '_id') {
            result = await Product.findOne(req.query);
        }
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        let result;
        const {field, id, value} = req.body;
        if (field === 'enabled') {
            result = await Product.findOneAndUpdate({_id: id}, {enabled: value}, {new: true});
            res.status(httpStatus.OK).send(result)
        } else if (field === 'all') {
            console.log('product .....', req.body)
            result = await Product.findOneAndUpdate({_id: id}, value, {new: true});
        }
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

// Brand
export const createBrand = async (req, res, next) => {
    try {
        const data = await Brand.findOne(req.body);
        if (data) {
            res.status(httpStatus.OK).send({status: 'already_exist'})
        } else {
            const brand = await Brand.create(req.body);
            res.status(httpStatus.CREATED).send(brand);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

export const readBrand = async (req, res, next) => {
    try {
        const promise = [];
        const {fields, store_name, user_id} = req.query;
        const data = {user_id, store_name}
        const brands = await Brand.find(data);
        if (fields === 'all') {
            for (const brand of brands) {
                let obj = {};
                data.brand = brand.name;
                const products = await Product.find(data);
                obj._id = brand._id;
                obj.number = products.length;
                obj.name = brand.name;
                obj.description = brand.description;
                promise.push(obj);
            }
            Promise.all(promise).then(result => {
                res.status(httpStatus.OK).send(result);
            }).catch(e => {
                console.log(e)
            })
        }
    } catch (e) {
        next(handleError(res, e));
    }
}


export const updateBrand = async (req, res, next) => {
    try {
        const {_id, name, description} = req.body;
        const result = await Brand.findOneAndUpdate({_id}, {name, description}, {new: true});
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const removeBrand = async (req, res, next) => {
    try {
        const {_id, name, store_name} = req.query;
        const products = await Product.find({store_name, brand: name});
        if (products.length) {
            res.status(httpStatus.OK).send({msg: products.length + ' product contain this brand. Please remove brand from product'})
        } else {
            await Brand.findOneAndRemove({_id});
            res.sendStatus(httpStatus.NO_CONTENT);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}



// Supplier
export const createSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.create(req.body);
        res.status(httpStatus.CREATED).send(supplier);
    } catch (e) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export const readSupplier = async (req, res, next) => {
    try {
        const promise = [];
        const {fields, store_name, user_id} = req.query;
        const data = {user_id, store_name}
        const suppliers = await Supplier.find(data);
        if (fields === 'all') {
            for (const supplier of suppliers) {
                let obj = {};
                data.supplier = supplier.name;
                const products = await Product.find(data);
                obj.number = products.length;
                obj.markup = supplier.markup;
                obj._id = supplier._id;
                obj.description = supplier.description;
                obj.name = supplier.name;
                promise.push(obj);
            }
            Promise.all(promise).then(result => {
                res.status(httpStatus.OK).send(result);
            }).catch(e => {
                console.log(e)
            })
        } else if (fields === '_id') {
            const suppliers = await Supplier.findById(req.query._id);
            res.status(httpStatus.OK).send(suppliers);
        }
    } catch (e) {
        next(handleError(res, e));
    }
}

export const updateSupplier = async (req, res, next) => {
    try {
        const {_id} = req.body;
        const result = await Supplier.findOneAndUpdate({_id}, req.body, {new: true});
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const removeSupplier = async (req, res, next) => {
    try {
        const {_id, name, store_name} = req.query;
        const products = await Product.find({store_name, supplier: name});
        if (products.length) {
            res.status(httpStatus.OK).send({msg: products.length + ' product contain this supplier. Please remove supplier from product'})
        } else {
            await Supplier.findOneAndRemove({_id});
            res.sendStatus(httpStatus.NO_CONTENT);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}


// Type
export const createType = async (req, res, next) => {
    try {
        const data = await Type.findOne(req.body);
        if (data) {
            res.status(httpStatus.OK).send({status: 'already_exist'})
        } else {
            const type = await Type.create(req.body);
            res.status(httpStatus.CREATED).send(type);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

export const readType = async (req, res, next) => {
    try {
        const promise = [];
        const {fields, store_name, user_id} = req.query;
        const data = {user_id, store_name}
        const types = await Type.find(data);
        if (fields === 'all') {
            for (const type of types) {
                let obj = {};
                data.type = type.name;
                const products = await Product.find(data);
                obj.number = products.length;
                obj.name = type.name;
                obj._id = type._id;
                promise.push(obj);
            }
            Promise.all(promise).then(result => {
                res.status(httpStatus.OK).send(result);
            }).catch(e => {
                console.log(e)
            })
        }
    } catch (e) {
        next(handleError(res, e));
    }
}

export const updateType = async (req, res) => {
    try {
        const {_id, name} = req.body;
        const result = await Type.findOneAndUpdate({_id}, {name}, {new: true});
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const removeType = async (req, res) => {
    try {
        const {_id, name, store_name} = req.query;
        const products = await Product.find({store_name, type: name});
        if (products.length) {
            res.status(httpStatus.OK).send({msg: products.length + ' product contain this type. Please remove type from product'})
        } else {
            await Type.findOneAndRemove({_id});
            res.sendStatus(httpStatus.NO_CONTENT);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}


// Tag
export const createTag = async (req, res, next) => {
    try {
        const data = await Tag.findOne(req.body);
        if (data) {
            res.status(httpStatus.OK).send({status: 'already_exist'})
        } else {
            const tag = await Tag.create(req.body);
            res.status(httpStatus.CREATED).send(tag);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

export const readTag = async (req, res, next) => {
    try {
        const promise = [];
        const {fields, store_name, user_id} = req.query;
        const data = {user_id, store_name}
        const tags = await Tag.find(data);
        if (fields === 'all') {
            for (const tag of tags) {
                let obj = {};
                data.tag = tag.name;
                const products = await Product.find(data);
                obj.number = products.length;
                obj.name = tag.name;
                obj._id = tag._id;
                promise.push(obj);
            }
            Promise.all(promise).then(result => {
                res.status(httpStatus.OK).send(result);
            }).catch(e => {
                console.log(e)
            })
        }
    } catch (e) {
        next(handleError(res, e));
    }
}

export const updateTag = async (req, res, next) => {
    try {
        const {_id, name} = req.body;
        const result = await Tag.findOneAndUpdate({_id}, {name}, {new: true});
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const removeTag = async (req, res, next) => {
    try {
        const {_id, name, store_name} = req.query;
        const products = await Product.find({store_name  ,tag: name});
        if (products.length) {
            res.status(httpStatus.OK).send({msg: products.length +  ' product contain this tag. Please remove tag from product'})
        } else {
            await Tag.findOneAndRemove({_id});
            res.sendStatus(httpStatus.NO_CONTENT);
        }
    } catch (e) {
        next(handleError(res, e))
    }
}


// Attribute

export const createAttribute = async (req, res, next) => {
    try {
        const data = await Attribute.findOne(req.body);
        if (data) {
            res.status(httpStatus.OK).send({status: 'already_exist'})
        } else {
            const attribute = await Attribute.create(req.body);
            res.status(httpStatus.CREATED).send(attribute);
        }
    } catch (e) {
        next(handleError(e))
    }
}


// Order

export const createOrder = async (req, res, next) => {
    try {
        const data = await Order.create(req.body);
        res.status(httpStatus.CREATED).send(data);
    } catch (e) {
        next(handleError(res, e));
    }
}

export const readOrder = async (req, res, next) => {
    try {
        let result;
        const {field} = req.query;
        if (field === 'all') {
            result = await Order.find(req.body);
        } else if (field === 'all-factor') {
            const filter = {}
            const {type, outlet, supplier, date_from, date_to, due_from, due_to} = req.query;
            if (type) {
                filter.type = type;
            }
            if (outlet) {
                filter.outlet = outlet;
            }
            if (supplier) {
                filter.supplier = supplier;
            }
            if (date_from && date_to) {
                filter.created = {$gt: date_from, $lt: date_to};
            }
            if (date_from || date_to) {
                filter.created = {};
            }
            if (due_from || due_to) {
                filter.deliver_date = {};
            }
            if (date_from) {
                filter.created = {$gt: date_from};
            }
            if (date_to) {
                filter.created = {$lt: date_to};
            }
            if (due_from) {
                filter.deliver_date = {$gt: due_from};
            }
            if (due_to) {
                filter.deliver_date = {$lt: due_to};
            }
            console.log('filter ...', filter)
            result = await Order.find(filter);
        }
        else if (field === '_id') {
            console.log(req.query)
            result = await Order.findOne({_id: req.query._id});
        }
        res.status(httpStatus.OK).send(result);
    } catch(e) {
        next(handleError(res, e));
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        let result;
        const {field, _id} = req.body;
        if (field === 'mail') {
            let template = '', total_items = 0, total_cost = 0;
            const order = req.body;
            const deliver_date = order.deliver_date.split('T')[0];
            const note = order.note ? order.note: '';
            const message = order.message ? order.message : '';
            template += '<div style="padding: 4px"><div style="padding-bottom: 3px; margin-bottom: 3px;border-bottom: 2px solid">'  + '<h1>Order #'+order.order_number+'</h1></div>';
            template += '<div style="display: flex"><div style="width: 25%">To: </div><div style="width: 75%">'+ order.recipient + ', ' +order.email_to +'</div></div>';
            template += '<div style="display: flex"><div style="width: 25%">From: </div><div style="width: 75%">'+ order.store_name + ', ' + order.deliver_to +'</div></div>';
            // const template4 = '<div style="display: flex"><div style="width: 25%">Deliver to: </div><div style="width: 75%">'+ order.store_address +'</div></div>';
            template += '<div style="display: flex"><div style="width: 25%">Delivery due: </div><div style="width: 75%">'+ deliver_date +'</div></div>';
            template += '<div style="display: flex"><div style="width: 25%">Note:</div><div style="width: 75%">'+ note +'</div></div>';
            template += '<div style="display: flex"><div style="width: 25%">Message:</div><div style="width: 75%">'+ message +'</div></div>';
            template += '<div style="padding-bottom: 3px; margin-bottom: 3px;margin-top: 3px">'  + '<h1>Stock Order</h1></div>';
            template += '<table style="width: 100%"><tr><th>Product</th><th>SKU</th><th>Ordered</th><th>Supply cost</th><th>Total supply cost</th></tr>';
            order.products.forEach(product => {
                const sku = product.sku ? product.sku : '';
                const total =  product.qty * product.supply_price ? product.qty * product.supply_price : 0;
                total_items += product.qty ? product.qty : 0;
                total_cost += total;
                template += '<tr><td style="text-align: center">' + product.name +'</td><td style="text-align: center">'+ sku +'</td><td style="text-align: center">'
                    + product.qty + '</td><td style="text-align: center">' + product.supply_price + '</td><td style="text-align: center">' + total + '</td></tr>';
            });
            template += '<tr><td style="text-align: center"><b>total</b></td><td></td>' + '<td style="text-align: center">' + total_items +'</td><td></td><td>' + total_cost +'</td></tr>';
            template += '</table></div>';
            const option = {
                to: order.email_to,
                from: order.email_from ? order.email_from : config.supportEmail,
                subject: order.subject,
                html: template,
            };
            transporter.sendMail(option, async (err, res) => {
                if (err) {
                    console.log('Error occurred while send order', err);
                } else if (res) {
                    result = await Order.findOneAndUpdate({_id: order._id}, {status: 'sent'}, {new: true});
                }
            })
        } else if (field === 'all') {
            result = await Order.findOneAndUpdate({_id}, req.body, {new: true});
        }
        res.status(httpStatus.OK).send(result)
    } catch (e) {
        next(handleError(res, e));
    }
}

export const removeOrder = async (req, res, next) => {
    try {
        const {_id} = req.query;
        await Order.findOneAndRemove({_id});
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch (e) {
        next(handleError(res, e));
    }
}

// Image

export const uploadFile = (req, res, next) =>  {
    try {
        res.status(httpStatus.CREATED).send(req.file);
    } catch(e) {
        next(handleError(res, e));
    }
}
