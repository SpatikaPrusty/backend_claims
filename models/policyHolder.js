const mongoose = require('mongoose');

const policyHolderSchema = mongoose.Schema(
    {
        mail: { type: String, required: true },
        policyNum: { type: Number, required: true },
    },
    {
        timestamps: true
    }
);

const policyHolder = mongoose.model('policyHolder', policyHolderSchema);
module.exports = policyHolder;
