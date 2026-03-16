import type { Request, Response } from "express";
export declare const createChallenge: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChallenges: (req: Request, res: Response) => Promise<void>;
export declare const getChallengeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const likeChallenge: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=challengesController.d.ts.map