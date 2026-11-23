
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { message: "Too many requests. Please try again later." }
  })
);

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/motors_showroom")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error.message));

// Vehicle Schema
const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: String,
    type: { type: String, enum: ["Car", "Bike"], required: true },
    price: { type: Number, required: true },
    fuel: String,
    transmission: String,
    year: Number,
    mileage: String,
    image: String,
    description: String,
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// Test Drive Schema
const testDriveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: { type: String, required: true },
    date: String,
    message: String
  },
  { timestamps: true }
);

const TestDrive = mongoose.model("TestDrive", testDriveSchema);

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: String,
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", contactSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);

// Authentication middleware
function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "change-this-secret");
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Motors Showroom API is running" });
});

// Get all vehicles
app.get("/api/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch vehicles" });
  }
});

// Get one vehicle
app.get("/api/vehicles/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Invalid vehicle ID" });
  }
});

// Add vehicle (admin only)
app.post("/api/vehicles", authenticateAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update vehicle (admin only)
app.put("/api/vehicles/:id", authenticateAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete vehicle (admin only)
app.delete("/api/vehicles/:id", authenticateAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete vehicle" });
  }
});

// Submit test drive request
app.post("/api/test-drive", async (req, res) => {
  try {
    const { name, email, phone, vehicle, date, message } = req.body;

    if (!name || !email || !phone || !vehicle) {
      return res.status(400).json({
        message: "Name, email, phone and vehicle are required"
      });
    }

    const request = await TestDrive.create({
      name,
      email,
      phone,
      vehicle,
      date,
      message
    });

    res.status(201).json({
      message: "Test drive request submitted successfully",
      request
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to submit test drive request" });
  }
});

// Submit contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: "Your message has been sent successfully",
      contact
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to send your message" });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "change-this-secret",
      { expiresIn: "8h" }
    );

    res.json({
      message: "Login successful",
      token,
      email: admin.email
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

// Admin dashboard data
app.get("/api/admin/dashboard", authenticateAdmin, async (req, res) => {
  try {
    const [vehicles, testDrives, contacts] = await Promise.all([
      Vehicle.countDocuments(),
      TestDrive.countDocuments(),
      Contact.countDocuments()
    ]);

    res.json({ vehicles, testDrives, contacts });
  } catch (error) {
    res.status(500).json({ message: "Unable to load dashboard" });
  }
});

// Admin: view test drive requests
app.get("/api/admin/test-drives", authenticateAdmin, async (req, res) => {
  const requests = await TestDrive.find().sort({ createdAt: -1 });
  res.json(requests);
});

// Admin: view contact messages
app.get("/api/admin/contacts", authenticateAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

// Frontend fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Motors Showroom running at http://localhost:${PORT}`);
});
