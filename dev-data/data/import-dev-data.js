const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Load Models
const Tour = require('./../../model/tourModel');

// Connect to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('DB connected succesfully!'));

// Read JSON files
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8')
// );

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Tour.create(tours);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    lie;
    console.error(err);
  }
};

// Destroy Data
const deleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--destroy') {
  deleteData();
}
