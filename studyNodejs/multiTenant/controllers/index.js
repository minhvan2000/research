'use strict';

import { loginService } from '../services/auth.service.js';
import { addATenantService } from '../services/tenant.service.js';

export async function loginController(req, res) {
    const serviceFnResponse = await loginService(req.body);

    res.status(serviceFnResponse.statusCode).json({ ...serviceFnResponse });
}

export async function addATenantController(req, res) {
    const serviceFnResponse = await addATenantService(
        req.dbConnection,
        req.body
    );

    res.status(serviceFnResponse.statusCode).json({ ...serviceFnResponse });
}
