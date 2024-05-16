const { v4: uuidv4 } = require('uuid');
const sha1 = require('sha1');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

export const getConnect = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [email, password] = credentials.split(':');

  if (!email || !password) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const hashedPassword = sha1(password);
  const usersCollection = dbClient.db.collection('users');
  const user = await usersCollection.findOne({ email, password: hashedPassword });

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = uuidv4();
  const redisKey = `auth_${token}`;
  redisClient.setex(redisKey, 24 * 3600, user._id.toString());

  return res.status(200).json({ token });
};

// eslint-disable-next-line consistent-return
export async function getDisconnect(req, res) {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const redisKey = `auth_${token}`;
  redisClient.del(redisKey, (err, response) => {
    if (response === 1) {
      return res.status(204).send();
    }
    return res.status(401).json({ error: 'Unauthorized' });
  });
}
