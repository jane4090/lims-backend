const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// POST /api/requests/submit - Submit a request from any department
router.post('/submit', async (req, res) => {
  try {
    const { applicantName, parcelNumber, serviceType, section } = req.body;

    // Log the incoming payload
    console.log("📥 New submission received:", req.body);

    // Basic validation
    if (!applicantName || !parcelNumber || !serviceType || !section) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const request = new Request({
      ...req.body,
      role: req.body.role || "citizen",
      status: "Pending"
    });

    const saved = await request.save();
    res.status(201).json({ message: `✅ ${section} request submitted`, data: saved });
  } catch (error) {
    console.error("❌ Error during submission:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// GET /api/requests/all - View all requests
router.get('/all', async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("❌ Failed to fetch all requests:", error.message);
    res.status(500).json({ error: '❌ Failed to fetch requests' });
  }
});

// GET /api/requests/section/:section - View requests by department (case-insensitive)
router.get('/section/:section', async (req, res) => {
  try {
    const section = req.params.section.toLowerCase();

    const requests = await Request.find({ section: { $regex: new RegExp(`^${section}$`, 'i') } })
                                  .sort({ createdAt: -1 });

    if (!requests.length) {
      return res.status(200).json([]); // empty array but not an error
    }

    res.json(requests);
  } catch (error) {
    console.error("❌ Failed to fetch section data:", error.message);
    res.status(500).json({ error: '❌ Failed to fetch section data' });
  }
});

module.exports = router;
