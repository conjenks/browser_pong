export const AWS_CONFIG = {
  region: process.env.AWS_REGION || 'us-east-1',
  apiVersion: '2018-11-29',
  endpoint: process.env.IS_OFFLINE 
    ? 'http://localhost:3001' 
    : process.env.WEBSOCKET_ENDPOINT
};