const Tour = require('../model/tourModel');
// const fs = require('fs');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > Tour.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      req.query.sort('-createdAt');
    }

    // Execute query
    const tours = await query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getTour = async (req, res) => {
  const id = req.params.id;

  const tour = await Tour.find({ _id: id });

  if (!tour) {
    console.log(`There is no tour with ID of ${id}`);
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  // const newId = Tour[Tour.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // Tour.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(Tour),
  //   err => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour
  //       }
  //     });
  //   }
  // );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
