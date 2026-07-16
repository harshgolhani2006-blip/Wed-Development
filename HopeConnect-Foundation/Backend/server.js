const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const volunteerFile = "./data/volunteers.json";
const contactFile = "./data/contacts.json";
const donationFile = "./data/donations.json";

function saveData(file, data) {
    let existing = [];

    if (fs.existsSync(file)) {
        existing = JSON.parse(fs.readFileSync(file));
    }

    existing.push(data);

    fs.writeFileSync(
        file,
        JSON.stringify(existing, null, 2)
    );
}

// Volunteer Registration
app.post("/api/volunteer", (req, res) => {

    const volunteer = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date()
    };

    saveData(volunteerFile, volunteer);

    res.json({
        success: true,
        message: "Volunteer Registered"
    });
});

// Contact Form
app.post("/api/contact", (req, res) => {

    const contact = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date()
    };

    saveData(contactFile, contact);

    res.json({
        success: true,
        message: "Message Sent"
    });
});

// Donation
app.post("/api/donate", (req, res) => {

    const donation = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date()
    };

    saveData(donationFile, donation);

    res.json({
        success: true,
        message: "Donation Recorded"
    });
});

// Admin APIs

app.get("/api/volunteers", (req, res) => {

    if (!fs.existsSync(volunteerFile))
        return res.json([]);

    res.json(
        JSON.parse(fs.readFileSync(volunteerFile))
    );
});

app.get("/api/contacts", (req, res) => {

    if (!fs.existsSync(contactFile))
        return res.json([]);

    res.json(
        JSON.parse(fs.readFileSync(contactFile))
    );
});

app.get("/api/donations", (req, res) => {

    if (!fs.existsSync(donationFile))
        return res.json([]);

    res.json(
        JSON.parse(fs.readFileSync(donationFile))
    );
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});