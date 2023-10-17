import dontenv from 'dotenv';
dontenv.config();

export const config = {
    // Basic
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    // DB
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbLink: process.env.DB_LINK,

    // JWT
    jwtSecret: process.env.JWT_SECRET,
};