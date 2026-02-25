const mongoose = require('mongoose');

const skinProfileSchema = new mongoose.Schema(
  {
    skinType: {
      type: String,
      enum: ['oleosa', 'seca', 'mista', 'normal'],
      required: true
    },
    age: {
      type: Number,
      min: 10,
      max: 100,
      required: true
    },
    concerns: [
      {
        type: String,
        enum: ['acne', 'manchas', 'hidratacao', 'ressecamento']
      }
    ],
    routinePreference: {
      type: String,
      enum: ['completa', 'so-noite', 'minimalista'],
      required: true
    }
  },
  { _id: false }
);

const routineItemSchema = new mongoose.Schema(
  {
    momento: {
      type: String,
      enum: ['manhã', 'noite'],
      required: true
    },
    produtos: [{ type: String, required: true }]
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    skinProfile: {
      type: skinProfileSchema,
      required: true
    },
    routine: {
      type: [routineItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
