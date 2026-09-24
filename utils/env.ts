import * as dotenv from 'dotenv';

dotenv.config();

/** Reads a required environment variable and fails with a clear message if it is missing. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env and fill in the credentials of the account you registered.`,
    );
  }
  return value.trim();
}

export const credentials = {
  get email() { return requireEnv('USER_EMAIL'); },
  get password() { return requireEnv('USER_PASSWORD'); },
  get name() { return requireEnv('USER_NAME'); },
};
