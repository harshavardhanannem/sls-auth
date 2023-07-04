const { MongoClient } = require('mongodb');
const cron = require('node-cron');

const uri = "mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'sample_airbnb';

async function performTask() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    await db.collection('listingsAndReviews').updateOne(
      { name: "Opera House Views" },
      { $set: { beds: 70 } }
    );

    console.log('Scheduled task executed successfully.');
    await client.close();
  } catch (error) {
    console.error('Error executing scheduled task:', error);
  }
}

module.exports = { performTask };

cron.schedule('26 13 * * *', () => {
  performTask();
});
