const env = import.meta.env

export default {
    server_url: env.VITE_SERVER_URL,
    auth_domain: env.VITE_AUTH_DOMAIN,
    auth_clientid: env.VITE_AUTH_CLIENTID,
    api_identifier: env.VITE_API_IDENTIFIER
}