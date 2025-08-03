/**
 * API Configuration for third-party integrations
 */

export const API_CONFIG = {
  leafly: {
    baseUrl: 'https://api.leafly.com/v1',
    apiKey: process.env.LEAFLY_API_KEY || '',
    apiId: process.env.LEAFLY_APP_ID || '',
  },
  weedmaps: {
    baseUrl: 'https://api.weedmaps.com/v1',
    apiKey: process.env.WEEDMAPS_API_KEY || '',
  },
  cultiverapos: {
    baseUrl: 'https://api.cultiverapos.com/v1',
    apiKey: process.env.CULTIVERAPOS_API_KEY || '',
  }
};