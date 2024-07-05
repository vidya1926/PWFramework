import dotenv from 'dotenv';
import path from 'path';

export const loadEnvFile = (envFilePath: string) => {
  dotenv.config({ path: path.resolve(__dirname, envFilePath) });
};

export const getEnvVariable = (key: string): string | undefined => {
  return process.env[key];
};
