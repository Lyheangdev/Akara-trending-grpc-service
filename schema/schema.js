const schema = require("mongoose");
const uuid = require("uuid");

//=======================
// HOURLY-TRENDING SCHEMA
//---

const hourlyTrendingSchema = new schema.Schema(
  {
    _id: {
      type: String,
      default: function getUUID() {
        return uuid.v1();
      },
    },
    podcastId: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

hourlyTrendingSchema.pre("updateOne", function (next) {
  this.updatedAt = Date.now();
  next();
});

//==================================
// DAILY TRENDING SCHEMA
//---

const dailyTrendingSchema = new schema.Schema(
  {
    _id: {
      type: String,
      default: function getUUID() {
        return uuid.v1();
      },
    },
    podcastId: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

dailyTrendingSchema.pre("updateOne", function (next) {
  this.updateAt = Date.now();
  next();
});

//==========================
// WEEKLY TRENDING SCHEMA
//---

const weeklyTrendingSchema = new schema.Schema(
  {
    _id: {
      type: String,
      default: function getUUID() {
        return uuid.v1();
      },
    },
    podcastId: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

weeklyTrendingSchema.pre("updateOne", function (next) {
  this.updateAt = Date.now();
  next();
});

// ==== Models

const HourlyTrendingModel = schema.model(
  "HourlyTrendingModel",
  hourlyTrendingSchema
);

const DailyTrendingModel = schema.model(
  "DailyTrendingModel",
  dailyTrendingSchema
);

const WeeklyTrendingModel = schema.model(
  "WeeklyTrendingModel",
  weeklyTrendingSchema
);

//=== Export

module.exports = {
  HourlyTrendingModel,
  DailyTrendingModel,
  WeeklyTrendingModel,
};
