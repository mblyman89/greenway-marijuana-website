import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Health check endpoint for monitoring
 * Returns basic health information about the application
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Basic health check
  const healthCheck = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  };

  try {
    // Return health check data
    res.status(200).json(healthCheck);
  } catch (error) {
    // If there's an error, return a 503 Service Unavailable
    res.status(503).json({
      status: 'error',
      message: 'Service unavailable',
      timestamp: Date.now(),
    });
  }
}