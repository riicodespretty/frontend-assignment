export function useApiUrl() {
  return new URL(`${import.meta.env.VITE_JSON_SERVER_ORIGIN}:${import.meta.env.VITE_JSON_SERVER_PORT}${import.meta.env.VITE_JSON_SERVER_ENDPOINT}`)
}
