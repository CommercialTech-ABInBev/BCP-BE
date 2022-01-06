import CommonService from '../services/common';
import { HttpError } from './api-error-validator';

export function authMiddleware(req, res, next) {
    try {
        const { headers: { authorization } } = req;

        if (authorization === undefined) throw new HttpError("404, no auth");
        const token = authorization.split(' ')[1];
        const claims = CommonService.decodeToken(token);

        req.context = { userId: claims.sub };
        next();
    } catch (err) {
        res.status(401).send({ code: 401, error: err });
    }
}