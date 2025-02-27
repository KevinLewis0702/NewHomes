const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    developerId: { type: String },
    devCode: { type: Number},
    name: { type: String, required: true },
    location: {
        lat: { type: Number},
        lng: { type: Number}
    },
    address: {
        full: { type: String },
        postalCode: { type: String },
        street1: { type: String },
        street2: { type: String },
        city: { type: String },
        state: { type: String },
        region: { type: String },
        country: { type: String },
        area: { type: String },
        mapAddress: { type: String },
        shortAddress: { type: String },
    },
    mainDescription: { type: String },
    metaDescription: { type: String },
    featuredImage: { type: String },
    currency: { type: String },
    importDate: { type: String },
    oldPermalink: { type: String },
    imageURL: { type: String },
    imageNumbers: { type: String },
    propType: { type: String },
    slug: { type: String },
});

const Developer = mongoose.models.Developer || mongoose.model('Developer', developerSchema);

module.exports = Developer;

