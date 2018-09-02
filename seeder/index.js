var mongoose = require("mongoose");
var config = require("../config");


mongoose.connect('mongodb://localhost:27017/' + config.db, { useNewUrlParser: true }).then(function() {
  /* Start Seeding*/
  require("./useSeeder")(); 
  require("./productSeeder")(); 
}).catch(function(err) {
    logger.error("Could not connect to MongoDB!");
    return logger.error(err);
});
