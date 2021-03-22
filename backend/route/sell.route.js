import {Router} from 'express';
import * as SellController from './../controller/sell.controller';
const router = Router();
router.route('/cart')
    .post(SellController.createCart)
    .get(SellController.readCart)
    .put(SellController.updateCart)
    .delete(SellController.removeCart);

router.route('/email')
    .post(SellController.emailToCustomer)


export default router;
