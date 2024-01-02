import dotenv from 'dotenv'

dotenv.config();

export default {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
    auth_domain: process.env.AUTH_DOMAIN,
    api_identifier: process.env.API_IDENTIFIER,
    encryption_key: process.env.ENCRYPTION_KEY,
    origin_uri: process.env.ORIGIN_URI,
}