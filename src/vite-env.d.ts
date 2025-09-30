interface ImportMetaEnv {
  readonly VITE_POLAR_ACCESS_TOKEN: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_POLAR_ORG_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
