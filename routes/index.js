import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';

const route = express.Router();

route.get('/status', getStatus);
route.get('/stats', getStats);

export default route;
