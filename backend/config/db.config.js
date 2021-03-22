import mongoose from 'mongoose';
import vars from '../config/var.config';
import Country from '../model/country.model';
import path from 'path';
import parser from 'csvtojson';

// Exit app on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
})

const db = () => {
    mongoose.connect(vars.mongo.uri, {
        useCreateIndex: true,
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
        .then(() => {
            console.info('MongoDB connection success');
            Country.find({}).then(result => {
                if (!result.length) {
                    parser().fromFile(path.join(__dirname, '../public/file/countries.csv'))
                        .then(countries => {
                            Country.insertMany(countries).then(response => {
                                console.log('Load country list ...', response)
                            }).catch(error => {
                                console.log('error while loading country list ...', error)
                            })

                        });
                }
            });
        })
    return mongoose.connection;
}
export default db;
