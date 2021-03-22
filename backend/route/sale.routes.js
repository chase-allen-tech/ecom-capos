import {Router} from 'express';
import * as SaleController from '../controller/sale.controller';

const router = Router();
router.route('/sale')
    .post(SaleController.createSale)
    .get(SaleController.readSale)
    .put(SaleController.updateSale)
    .delete(SaleController.deleteSale);


export default router;