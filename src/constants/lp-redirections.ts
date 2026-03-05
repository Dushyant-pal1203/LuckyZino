export const LP_REDIRECT_CONFIG = {
    // If set, all requests to any /lp/vx will be redirected to this path
    // Set to null to disable global redirection. Example: '/lp/v7'
    // redirectAllTo: "/lp/v9",

    // Specific redirections mapping. 
    // Key is the source LP path, value is the target path.
    // This is only active if redirectAllTo is null.
    redirects: {
        // "/lp/v1": "/lp/v7",
    } as Record<string, string>
};
