const mongoose = require('mongoose');
mongoose.set("strictQuery",true);


async function connectDB(urlDB) {
    try {
        // console.log(process.env.DBCONNNECTION)
        await mongoose.connect(urlDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
            // console.log("DB Connection successful");

        })
    } catch (error) {
        console.error("DB Connection error:", error);
        process.exit(1); // Exit with failure
    }
}

module.exports = {connectDB};