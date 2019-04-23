const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * Represents authorizaton for users.
 * @function
 * @param {String} req - Request sent to server.
 * @param {String} res - Result recieved from server.
 * @param {String} next - Holds reference to the next action to perform.
 * @returns {json} - Success or Failure json data.
 */
function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
