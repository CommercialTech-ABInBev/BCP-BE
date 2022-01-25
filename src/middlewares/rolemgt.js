import { HttpError } from './api-error-validator';
export function verifyRoles(permissions) {
    return async function bar(req, res, next) {
        try {

            const role = req.tokenData.role;
            const permitted = permissions.includes(role);
            if (!permitted) throw new HttpError(404, "Halt! You're not authorised");
            next();
        } catch (error) {
            next(error);
        }
    };
}