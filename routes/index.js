import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';
import postNew from '../controllers/UsersController';

const route = express.Router();

route.get('/status', getStatus);
route.get('/stats', getStats);
route.post('users', postNew);

export default route;
