import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import { postNew, getMe } from '../controllers/UsersController';

const route = express.Router();

route.get('/status', getStatus);
route.get('/stats', getStats);
route.post('users', postNew);
route.get('/connect', getConnect);
route.get(' /disconnect', getDisconnect);
route.get('/users/me', getMe);

export default route;
