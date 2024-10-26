export interface AppEnvironment {
  isDevelopment: boolean;
  isProduction: boolean;
  apiUrl: string;
}

export interface AppFeatures {
  ai: boolean;
  premium: boolean;
}

export interface AppConfig {
  appName: string;
  version: string;
  environment: string;
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: AppFeatures;
}