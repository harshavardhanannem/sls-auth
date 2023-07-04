const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const uri = "mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'sample_airbnb';

exports.myLambdaFunction = async () => {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    await db.collection('listingsAndReviews').updateOne(
      { name: "Opera House Views" },
      { $set: { bathrooms: 10 } }
    );

    console.log('Scheduled task executed successfully.');
    await client.close();
  } catch (error) {
    console.error('Error executing scheduled task:', error);
  }
};

cron.schedule('58 12 * * *', () => {
  exports.myLambdaFunction();
});
