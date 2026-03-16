import { auth } from "../lib/auth.js";
export function createAuthRouter() {
    return auth.api;
}
export async function getSession(req, res) {
    return auth.api.getSession({
        headers: req.headers,
    });
}
//# sourceMappingURL=auth.js.map