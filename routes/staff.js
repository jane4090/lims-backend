const express = require('express');
const router = express.Router();
const { authenticate, authorizeRoles } = require('../middleware/auth');

// ✅ Only staff and admin can access these routes
router.get('/pending-requests', authenticate, authorizeRoles('staff', 'admin'), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}, here are your pending requests.` });
});

router.post('/approve-application', authenticate, authorizeRoles('staff'), (req, res) => {
  res.json({ message: 'Application approved by staff.' });
});

module.exports = router;
