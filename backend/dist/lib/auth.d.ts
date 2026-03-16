export declare const auth: import("better-auth").Auth<{
    baseURL: string | undefined;
    appURL: string;
    basePath: string;
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: false;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
            accessType: "offline";
            prompt: "select_account consent";
        };
    };
    session: {
        expiresIn: number;
        updateAge: number;
        cookieCache: {
            enabled: true;
            maxAge: number;
        };
    };
    trustedOrigins: string[];
    secret: string | undefined;
}>;
export type Auth = typeof auth;
//# sourceMappingURL=auth.d.ts.map