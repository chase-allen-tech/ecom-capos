import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  country_code: String,
  country_name: String,
  currency_code: String,
  iso_numeric: String,
  capital: String,
  continent_name: String,
  continent: String,
  languages: String,
  geo_name_id: String,
});

export default new mongoose.model('Country', countrySchema);
