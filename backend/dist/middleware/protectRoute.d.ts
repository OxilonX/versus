import { Request, Response, NextFunction } from "express";
export declare const optionalAuth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const protectRoute: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=protectRoute.d.ts.map