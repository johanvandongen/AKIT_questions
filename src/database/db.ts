import { MongoClient } from 'mongodb';

let dbConnection: any;

module.exports = {
    connectToDb: (cb: any) => {
        MongoClient.connect('mongodb://localhost:27017/AK_DB')
            .then((client) => {
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection,
};
