const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/auth');

// ✅ Only admin can access these routes
router.post('/create-user', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'New user created by admin.' });
});

router.get('/system-reports', authenticate, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Accessing system reports - admin only.' });
});

module.exports = router;
