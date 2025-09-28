import express from "express";
import cors from "cors";
import Doctor from "./models/Doctor.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("TKDoctor Backend Running");
});

// Get all doctors
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a doctor
app.post("/api/doctors", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a data
app.put("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true, 
        runValidators: true 
      }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(updatedDoctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete data
app.delete("/api/doctors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully", deletedDoctor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
