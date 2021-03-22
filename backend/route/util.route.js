import {Router} from 'express';
import * as UtilController from '../controller/util.controller';

const router = Router();

router.route('/crud')
    .post(UtilController.createDataByTable)
    .get(UtilController.readTableByUserId)
    .delete(UtilController.removeData);

router.route('/file/:file')
    .get(UtilController.readFile);

export default router;
