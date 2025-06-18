'use strict';

import { Router } from 'express';
import routerDevice from './device/index.js';
import routerUser from './user/index.js';
import routerAccess from './access/index.js';
const router = Router();

router.use('/v1/api/device', routerDevice);
router.use('/v1/api/user', routerUser);
router.use('/v1/api/auth', routerAccess);

export default router;
