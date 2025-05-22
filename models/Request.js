const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  email: { type: String },
  parcelNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  section: {
    type: String,
    required: true,
    enum: ['registration', 'valuation', 'survey', 'planning', 'revenue', 'reports']
  },
  role: {
    type: String,
    default: 'citizen',
    enum: ['citizen', 'staff', 'admin']
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected']
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Request", requestSchema);
