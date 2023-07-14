const mongoose = require("mongoose");

const connection = mongoose.connect(
 `mongodb+srv://rutujadhekolkar11:rutujadhekolkar11@cluster0.uyeafus.mongodb.net/?retryWrites=true&w=majority`
);

module.exports = connection;
