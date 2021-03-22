import {Router} from 'express';
import * as ProductController from '../controller/product.controller';
const router = Router();
import * as Util from './../controller/util.controller';
const upload = Util.upload;

// Product products

router.route('/product')
    .post(ProductController.createProduct)
    .get(ProductController.readProduct)
    .put(ProductController.updateProduct);

// Product brand

router.route('/brand')
    .post(ProductController.createBrand)
    .get(ProductController.readBrand)
    .put(ProductController.updateBrand)
    .delete(ProductController.removeBrand);

// Product Supplier

router.route('/supplier')
    .post(ProductController.createSupplier)
    .get(ProductController.readSupplier)
    .put(ProductController.updateSupplier)
    .delete(ProductController.removeSupplier);


// Product Type
router.route('/type')
    .post(ProductController.createType)
    .get(ProductController.readType)
    .put(ProductController.updateType)
    .delete(ProductController.removeType);

// Product Tag
router.route('/tag')
    .post(ProductController.createTag)
    .get(ProductController.readTag)
    .put(ProductController.updateTag)
    .delete(ProductController.removeTag);

// Product variant attribute
router.route('/attribute')
    .post(ProductController.createAttribute);

// Product Order
router.route('/order')
    .post(ProductController.createOrder)
    .get(ProductController.readOrder)
    .put(ProductController.updateOrder)
    .delete(ProductController.removeOrder);

// Product image upload
router.route('/file')
    .post(upload.single('file'), ProductController.uploadFile)

export default router;
