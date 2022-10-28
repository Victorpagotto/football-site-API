import { ErrorRequestHandler } from 'express';

const errMiddlewere: ErrorRequestHandler = (_err, _req, res, _next) => {
  res.status(500).json({ message: 'Server error.' });
};

export default errMiddlewere;
