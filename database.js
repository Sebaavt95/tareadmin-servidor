const mongoose = require('mongoose');

const ConnectDB = async () => {
   try {
      await mongoose.connect(process.env.URLMONGODB, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useCreateIndex: true
      });
      console.log('DB is connected');
   } catch (error) {
      console.log(error);
   }
}

module.exports = ConnectDB;