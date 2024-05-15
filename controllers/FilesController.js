const postUpload = async (req, res) => {
  const {
    name, type, parentId, isPublic, data, // eslint-disable-line no-unused-vars
  } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }
  if (!type) {
    return res.status(400).json({ error: 'Missing type' });
  }
  if (!data && type !== 'folder') {
    return res.status(400).json({ error: 'Missing data' });
  }
  return req.status(201);
};
export default postUpload;
