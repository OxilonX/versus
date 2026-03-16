import type { Request, Response } from "express";
export declare const createItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPublicItems: (req: Request, res: Response) => Promise<void>;
export declare const getPrivateItems: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const voteItemChallenge: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=itemsControllers.d.ts.map