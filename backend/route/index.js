import express from 'express';
import authRoutes from './auth.route';
import productRoutes from './product.route';
import utilRoutes from './util.route';
import sellRoutes from './sell.route';
import customerRoutes from './customer.route';
import saleRoutes from './sale.routes';
import generalsettingRouter from './generalsetting.route';
import countriesRouter from './country.route';

const router = express.Router();
/**
 * Health check api*/

router.get('/healthCheck', (req, res) => res.send('Api response: OK'));

router.use('/auth', authRoutes);
router.use('/util', utilRoutes);
router.use('/product', productRoutes);
router.use('/sell', sellRoutes);
router.use('/customers', customerRoutes);
router.use('/sale', saleRoutes);
router.use('/generalsetting', generalsettingRouter);
router.use('/countries', countriesRouter);

export default router;
