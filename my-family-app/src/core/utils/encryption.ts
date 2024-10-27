// src/core/utils/encryption.ts
export const encrypt = (data: string): string => {
    // TODO: Implement actual encryption
    // For development, using base64 encoding as a placeholder
    return btoa(data);
  };
  
  export const decrypt = (encrypted: string): string => {
    // TODO: Implement actual decryption
    // For development, using base64 decoding as a placeholder
    return atob(encrypted);
  };