import express from 'express';
import * as  CustomerController from '../controller/customer.controller';

const router = express.Router();

router.route('/customer')
    .post(CustomerController.createCustomer)
    .get(CustomerController.readCustomer)
    .put(CustomerController.updateCustomer)
    .delete(CustomerController.deleteCustomer);


export default router;
