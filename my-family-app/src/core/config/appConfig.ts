// src/core/config/appConfig.ts
export const appConfig = {
    appName: 'Family Manager',
    version: '1.0.0',
    api: {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      timeout: 10000
    },
    features: {
      ai: false,
      premium: false
    }
  };