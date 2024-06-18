require("dotenv").config();
const grpc = require("@grpc/grpc-js");
const grpcLoader = require("@grpc/proto-loader");
const path = require("path");
const { databaseConnector } = require("./conf/mongo.conf/mongo");
const {
  retrieveAllHourlyTrendingService,
  retrieveAllDailyTrendingService,
  retrieveAllWeeklyTrendingService,
  startHourlyTrendingService,
  startDailyTrendingService,
  startWeeklyTrendingService,
  addDailyTrendingService,
  addHourlyTrendingService,
  addWeeklyTrendingService,
} = require("./service/trending.service");

const protoPath = path.join(__dirname, "./trending.proto");

//=== Load credentials
const HOST = process.env.HOST;
const PORT = process.env.PORT;

databaseConnector();

//=== define protoLoader object
const loaderOption = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

//=== Create Student package definition
const TrendingPackageDefinition = grpcLoader.loadSync(protoPath, loaderOption);

//=== Create grpc Object
const definition = grpc.loadPackageDefinition(TrendingPackageDefinition);

//=== Create grpc listen SERVER
const grpcServer = new grpc.Server();

//=== Podcast-Service Definition
grpcServer.addService(definition.TrendingService.service, {
  RetrieveAllHourlyTrending: retrieveAllHourlyTrendingService,
  RetrieveAllDailyTrending: retrieveAllDailyTrendingService,
  RetrieveAllWeeklyTrending: retrieveAllWeeklyTrendingService,
  AddHourlyTrending: addHourlyTrendingService,
  AddDailyTrending: addDailyTrendingService,
  AddWeeklyTrending: addWeeklyTrendingService,
  StartHourlyTrending: startHourlyTrendingService,
  StartDailyTrending: startDailyTrendingService,
  StartWeeklyTrending: startWeeklyTrendingService,
});

//=== Bind port for grpc server
grpcServer.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (Err, __) => {
    Err && console.log(Err.message);
    console.log(`GRPC server is being start at : 0.0.0.0:${PORT}`);
  }
);
