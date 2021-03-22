import express from 'express';
import * as  GeneralSettingController from '../controller/generalsetting.controller';

const router = express.Router();

router.route('/read_data').get(GeneralSettingController.readData);
router.route('/read_all_data').get(GeneralSettingController.readAllData);
router.route('/set_data').post(GeneralSettingController.createData);
router.route('/update_data').put(GeneralSettingController.updateData);



export default router;
