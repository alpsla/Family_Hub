// my-family-app/src/utils/testHelpers.ts
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateApiResponse = async <T>(data: T, shouldFail = false, delayMs = 500) => {
  await delay(delayMs);
  
  if (shouldFail) {
    throw new Error('API request failed');
  }
  
  return data;
};