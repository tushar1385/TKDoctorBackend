import mongoose from "../dbConfig/mongo.js";

const doctorSchema = new mongoose.Schema({
    drName: { type: String, required: true },
    drCode: { type: String },
    mobile: { type: String },
    email: { type: String },
    pan: { type: String },
    address: { type: String },
    dob: { type: String },
    callDay: { type: String },
    callTime: { type: String },
    notes: { type: String },
    chemistDetails: { type: String },
    medReg: { type: String },
    visitingRx: { type: String },
    activeInactive: { type: String },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
