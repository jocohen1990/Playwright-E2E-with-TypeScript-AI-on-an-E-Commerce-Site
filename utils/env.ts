import path from 'path';

export const WEB_BASE_URL = 'https://valentinos-magic-beans.click';
export const API_BASE_URL = 'https://api.valentinos-magic-beans.click';
export const AUTH_STATE_FILE = path.resolve(__dirname, '../playwright/.auth/user.json');

/** Reads a required environment variable and fails fast with a clear message when it is missing. */
export function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}. Add it to .env (see .env.example) or your CI secrets.`);
    }
    return value;
}
