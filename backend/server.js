const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Mongoose schema & model
const grievanceSchema = new mongoose.Schema({
  title: String,
  description: String,
  mood: String,
  severity: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const Grievance = mongoose.model("Grievance", grievanceSchema);

// POST route to submit grievance
app.post('/api/submit', async (req, res) => {
  try {
    const { title, description, mood, severity } = req.body;

    // Store in MongoDB
    const newGrievance = new Grievance({ title, description, mood, severity });
    await newGrievance.save();

    // Send to Telegram
    const message = `
💜 *New Grievance Received* 💜

📝 *Title:* ${title}
😔 *Mood:* ${mood}
📊 *Severity:* ${severity}

📖 *Description:*
${description}
`;

    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
    });

    res.status(200).json({ message: "Grievance submitted and sent via Telegram 💌" });
  } catch (error) {
    console.error("Error submitting grievance:", error);
    res.status(500).json({ error: "An error occurred while submitting the grievance." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
