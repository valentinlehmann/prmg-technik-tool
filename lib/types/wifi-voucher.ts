export interface WifiVoucher {
    id:                   string;
    createdAt:            string;
    name:                 string;
    code:                 string;
    authorizedGuestLimit: number;
    authorizedGuestCount: number;
    activatedAt?:         string;
    expiresAt:            string;
    expired:              boolean;
    timeLimitMinutes:     number;
    dataUsageLimitMBytes: number;
    rxRateLimitKbps:      number;
    txRateLimitKbps:      number;
}
