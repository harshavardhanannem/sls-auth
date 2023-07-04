const { MongoClient } = require('mongodb');
const stream = require('stream');

async function main() {

const uri = "mongodb+srv://harshavardhan:iloveharsha143@mycluster.su12qnc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

try {

await client.connect();
const pipeline = [
{
'$match': {
'operationType': 'insert',
'fullDocument.address.country': 'Australia',
'fullDocument.address.market': 'Sydney'
}
}
];

await monitorListingsUsingEventEmitter(client, 15000);

} finally {

await client.close();
}
}

main().catch(console.error);

function closeChangeStream(timeInMs = 60000, changeStream) {
return new Promise((resolve) => {
setTimeout(() => {
console.log("Closing the change stream");
changeStream.close();
resolve();
}, timeInMs)
})
};

async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {
const collection = client.db("sample_airbnb").collection("listingsAndReviews");

const changeStream = collection.watch(pipeline);
changeStream.on('change', (next) => {
console.log(next);
});

await closeChangeStream(timeInMs, changeStream);
}

async function monitorListingsUsingNextEmitter(client, timeInMs = 60000, pipeline = []) {
const collection = client.db("sample_airbnb").collection("listingsAndReviews");

const changeStream = collection.watch(pipeline);

while (await changeStream.hasNext()) {
const change = await changeStream.next();
console.log('Change event:', change);
}

await closeChangeStream(timeInMs, changeStream);
}

async function monitorListingsUsingHasNext(client, timeInMs = 60000, pipeline = []) {
const collection = client.db("sample_airbnb").collection("listingsAndReviews");
const changeStream = collection.watch(pipeline);

closeChangeStream(timeInMs, changeStream);

try {
while (await changeStream.hasNext()) {
console.log(await changeStream.next());
}
} catch (error) {
if (changeStream.isClosed()) {
console.log("The change stream is closed. Will not wait on any more changes.")
} else {
throw error;
}
}
}

async function monitorListingsUsingStreamAPI(client, timeInMs = 60000, pipeline = []) {
const collection = client.db('sample_airbnb').collection('listingsAndReviews');
const changeStream = collection.watch(pipeline);

changeStream.stream().pipe(
new stream.Writable({
objectMode: true,
write: function (doc, _, cb) {
console.log(doc);
cb();
}
})
);

await closeChangeStream(timeInMs, changeStream);
}