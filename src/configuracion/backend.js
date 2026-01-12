const backend_url = import.meta.env.VITE_BACKEND_URL
const env = import.meta.env.VITE_ENV
const publicKeyMercadoPago = env === "prod"
    ? import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY_PROD : import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY_DEV
export { backend_url, env, publicKeyMercadoPago }