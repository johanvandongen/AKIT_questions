import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || '';
console.log('conn string', connectionString)

const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (error) {
    console.log('db error', error)
}

let db = conn.db('AK_DB');

export default db;