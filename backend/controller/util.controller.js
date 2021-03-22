import path from 'path';
import httpStatus from "http-status";
import multer from 'multer';
import nodeMailer from 'nodemailer';
import config from '../config/var.config';
import Brand from '../model/brand.model';
import Type from '../model/type.model';
import Tag from '../model/tag.model';
import Attribute from '../model/attribute.model';
import Supplier from '../model/supplier.model';
import Product from '../model/product.model';
import Customer from '../model/customer.model';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'public/image')
        } else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mov') {
            cb(null, 'public/video')
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const type = file.mimetype;
    const acceptedType = ['image/jpeg', 'image/png', 'video/mp4', 'video/mov'];
    if (acceptedType.includes(type)) {cb(null, true); }
    else cb(null, false);
};

export const upload = multer({storage: storage, fileFilter: fileFilter});

export  const transporter = nodeMailer.createTransport({
    host: config.mailHost,
    port: config.mailPort,
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    auth: {
        user: config.mailUser,
        pass: config.mailPwd
    }
});

// Handle error ...

export const handleError = (res, e) => {
    if (e.code === 11000) {
        res.sendStatus(httpStatus.CONFLICT)
    } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

}

// Create table ...

export const createDataByTable = async (req, res, next) => {
    try {
        const {tbl, data} = req.body;
        if (tbl === 'product') {
            const result = await Product.create(data);
            res.status(httpStatus.CREATED).send(result)
        }
    } catch (e) {
        next(handleError(res, e))
    }
}

// Read table ...

export const readTableByUserId = async (req, res, next) => {
    try {
        let data;
        const {tbl, user_id, store_name} = req.query;
        if (tbl === 'brand') {
            data = await Brand.find({user_id, store_name}, {'_id': 0, 'name': 1}).exec();
        } else if (tbl === 'type') {
            data = await Type.find({user_id, store_name}, {'_id': 0, 'name': 1}).exec();
        } else if (tbl === 'tag') {
            data = await Tag.find({user_id, store_name}, {'_id': 0, 'name': 1}).exec();
        } else if (tbl === 'attribute') {
            data = await Attribute.find({user_id, store_name}, {'_id': 0, 'name': 1}).exec();
        } else if (tbl === 'supplier') {
            data = await Supplier.find({user_id, store_name}, {'_id': 0, 'name': 1}).exec();
        } else if (tbl === 'product') {
            data = await Product.find({user_id, store_name}).exec();
        } else if (tbl === 'customer') {
            data = await Customer.find({user_id, store_name}).exec();
        }
        res.status(httpStatus.OK).send(data)
    } catch(e) {
        next(handleError(res, e))
    }
}


// Remove item from table ...

export const removeData = async (req, res, next) => {
    try {
        const {tbl, _id} = req.query;
        if (tbl === 'product') {
            await Product.findOneAndRemove({_id});
        } else if (tbl === 'customer') {
            await Customer.findOneAndRemove({_id});
        }
        res.sendStatus(httpStatus.NO_CONTENT);
    } catch(e) {
        next(handleError(res, e));
    }
}

// Read file content like image, video

export const readFile = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../public/image/' + req.params.file))
    } catch (e) {
        next(handleError(res, e));
    }
}
