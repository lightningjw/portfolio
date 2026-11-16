/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_TODOS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
