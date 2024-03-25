import { Request, Response } from 'express';

// Function to send a JSON response
export function sendJsonResponse(res: Response, data: any, statusCode = 200) {
  res.status(statusCode).json(data);
}

// Middleware function for handling errors
export function errorHandler(err: any, req: Request, res: Response) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
