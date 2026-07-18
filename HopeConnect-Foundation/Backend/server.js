const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// File paths
const volunteerFile = path.join(
    __dirname,
    "volunteers.json"
);

const contactFile = path.join(
    __dirname,
    "contacts.json"
);

const donationFile = path.join(
    __dirname,
    "donations.json"
);

// Create file if missing
function ensureFile(filePath) {

    if (!fs.existsSync(filePath)) {

        fs.writeFileSync(
            filePath,
            JSON.stringify([], null, 2)
        );
    }
}

ensureFile(volunteerFile);
ensureFile(contactFile);
ensureFile(donationFile);

// Save data helper
function saveData(file, data) {

    let existing = [];

    try {

        existing = JSON.parse(
            fs.readFileSync(file, "utf8")
        );

    } catch {

        existing = [];
    }

    existing.push(data);

    fs.writeFileSync(
        file,
        JSON.stringify(existing, null, 2)
    );
}

// Home Route
app.get("/", (req, res) => {

    res.json({
        success: true,
        message:
        "HopeConnect Foundation Backend Running"
    });

});

// ======================================
// VOLUNTEER API
// ======================================

app.post("https://wed-development-aim4.onrender.com/api/volunteer", (req, res) => {

    try {

        const volunteer = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date()
        };

        saveData(
            volunteerFile,
            volunteer
        );

        res.json({
            success: true,
            message:
            "Volunteer Registered Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

app.get("https://wed-development-aim4.onrender.com/api/volunteers", (req, res) => {

    try {

        const data = JSON.parse(
            fs.readFileSync(
                volunteerFile,
                "utf8"
            )
        );

        res.json(data);

    } catch {

        res.json([]);
    }
});

// ======================================
// CONTACT API
// ======================================

app.post("https://wed-development-aim4.onrender.com/api/contact", (req, res) => {

    try {

        const contact = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date()
        };

        saveData(
            contactFile,
            contact
        );

        res.json({
            success: true,
            message:
            "Message Sent Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

app.get("https://wed-development-aim4.onrender.com/api/contacts", (req, res) => {

    try {

        const data = JSON.parse(
            fs.readFileSync(
                contactFile,
                "utf8"
            )
        );

        res.json(data);

    } catch {

        res.json([]);
    }
});

// ======================================
// DONATION API
// ======================================

app.post("https://wed-development-aim4.onrender.com/api/api/donate", (req, res) => {

    try {

        const donation = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date()
        };

        saveData(
            donationFile,
            donation
        );

        res.json({
            success: true,
            message:
            "Donation Recorded Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

app.get("https://wed-development-aim4.onrender.com/api/api/donations", (req, res) => {

    try {

        const data = JSON.parse(
            fs.readFileSync(
                donationFile,
                "utf8"
            )
        );

        res.json(data);

    } catch {

        res.json([]);
    }
});

// ======================================
// START SERVER
// ======================================

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});