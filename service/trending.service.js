const {
  HourlyTrendingModel,
  DailyTrendingModel,
  WeeklyTrendingModel,
} = require("../schema/schema");

const Cron = require("cron");

module.exports = {
  retrieveAllHourlyTrendingService: async function (__, Response) {
    const data = await HourlyTrendingModel.aggregate([
      {
        $group: {
          _id: "$podcastId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 10 },
    ]);

    if (!Boolean(data.length)) {
      Response(null, {
        error: false,
        message: "No data",
        status: 3,
      });
      return;
    }

    Response(null, {
      error: false,
      message: "Request accept.",
      status: 1,
      data,
    });

    return;
  },
  retrieveAllDailyTrendingService: async function (__, Response) {
    const data = await DailyTrendingModel.aggregate([
      {
        $group: {
          _id: "$podcastId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 10 },
    ]);

    if (!Boolean(data.length)) {
      Response(null, {
        error: false,
        message: "No data",
        status: 3,
      });
      return;
    }

    Response(null, {
      error: false,
      message: "Request accept.",
      status: 1,
      data,
    });

    return;
  },
  retrieveAllWeeklyTrendingService: async function (__, Response) {
    const data = await WeeklyTrendingModel.aggregate([
      {
        $group: {
          _id: "$podcastId",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 10 },
    ]);

    if (!Boolean(data.length)) {
      Response(null, {
        error: false,
        message: "No data",
        status: 3,
      });
      return;
    }

    Response(null, {
      error: false,
      message: "Request accept.",
      status: 1,
      data,
    });

    return;
  },
  startHourlyTrendingService: async function (__, Response) {
    Cron.CronJob.from({
      cronTime: "0 0 * * * *",
      onTick: async function () {
        await HourlyTrendingModel.deleteMany({}).exec();
        console.log(`HourlyTrending Data has been clear at : ${Date.now()}`);
      },
      start: true,
      timeZone: "Asia/Phnom_Penh",
    });

    Response(null, {
      error: false,
      message: "Start Trend",
      status: 1,
    });
  },
  startDailyTrendingService: async function (__, Response) {
    Cron.CronJob.from({
      cronTime: "0 0 0 * * *",
      onTick: async function () {
        await DailyTrendingModel.deleteMany({}).exec();
        console.log(`DailyTrending Data has been clear at : ${Date.now()}`);
      },
      start: true,
      timeZone: "Asia/Phnom_Penh",
    });

    Response(null, {
      error: false,
      message: "Start Trend",
      status: 1,
    });
  },
  startWeeklyTrendingService: async function (__, Response) {
    Cron.CronJob.from({
      cronTime: "* * * * * 7", //! second|minute|hour|dayOfMonth|month|dayOfWeek
      onTick: async function () {
        await WeeklyTrendingModel.deleteMany({}).exec();
        console.log(`WeeklyTrending Data has been clear at : ${Date.now()}`);
      },
      start: true,
      timeZone: "Asia/Phnom_Penh",
    });

    Response(null, {
      error: false,
      message: "Start Trend",
      status: 1,
    });
  },
  addHourlyTrendingService: async function (Request, Response) {
    const requestPayload = Request?.request;

    if (!Boolean(requestPayload?.podcast_id)) {
      Response(null, {
        error: true,
        message: "Missed required field.",
        status: 4,
      });
      return;
    }

    await HourlyTrendingModel.create({
      podcastId: requestPayload?.podcast_id,
    });

    Response(null, {
      error: false,
      message: "This podcast has been added to be trended.",
      status: 1,
    });

    return;
  },
  addDailyTrendingService: async function (Request, Response) {
    const requestPayload = Request?.request;

    if (!Boolean(requestPayload?.podcast_id)) {
      Response(null, {
        error: true,
        message: "Missed required field.",
        status: 4,
      });
      return;
    }

    await DailyTrendingModel.create({
      podcastId: requestPayload?.podcast_id,
    });

    Response(null, {
      error: false,
      message: "This podcast has been added to be trended.",
      status: 1,
    });

    return;
  },
  addWeeklyTrendingService: async function (Request, Response) {
    const requestPayload = Request?.request;

    if (!Boolean(requestPayload?.podcast_id)) {
      Response(null, {
        error: true,
        message: "Missed required field.",
        status: 4,
      });
      return;
    }

    await WeeklyTrendingModel.create({
      podcastId: requestPayload?.podcast_id || "",
    });

    Response(null, {
      error: false,
      message: "This podcast has been added to be trended.",
      status: 1,
    });

    return;
  },
};
