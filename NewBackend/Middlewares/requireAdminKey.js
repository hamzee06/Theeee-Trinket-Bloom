// Gates the order-list endpoint with a single shared secret (set as
// ADMIN_API_KEY). GET /orders returns customer PII (name/address/phone) for
// every order, so it shouldn't be reachable with zero authentication.
module.exports = function requireAdminKey(req, res, next) {
  const providedKey = req.headers['x-admin-key'];

  if (!process.env.ADMIN_API_KEY || providedKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Missing or invalid admin key.' });
  }

  next();
};
