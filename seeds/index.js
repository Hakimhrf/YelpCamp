const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://0.0.0.0:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "637fb23b059232cc321d1180",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/djwppvygt/image/upload/v1669296930/YelpCamp/prlwd6im5tf0npazengt.jpg",
          filename: "YelpCamp/a6r7dbvaychocscyrhgy",
        },
        {
          url: "https://res.cloudinary.com/djwppvygt/image/upload/v1669313353/YelpCamp/bzwwjwrarsenk94abri7.jpg",
          filename: "YelpCamp/jgsawqqbouvlyigpnxy8",
        },
        {
          url: "https://res.cloudinary.com/djwppvygt/image/upload/v1669313353/YelpCamp/xk4lnstmuyl6bcek0hwb.jpg",
          filename: "YelpCamp/ovsje00vblcxlgcph7ou",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim asperiores inventore placeat natus hic a non nesciunt at quae architecto, nihil sint dolor dolores pariatur, illo corrupti in tempore quam.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
