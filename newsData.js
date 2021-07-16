const request = require("request");

const newsData = (pageNo, callback) => {
  let url = `https://newsapi.org/v2/top-headlines?page=${pageNo}&pageSize=100&country=in&apiKey=1038dc78bdbb49d29e2c9d8d7df13303`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
    } else {
      callback(body);
    }
  });
};
module.exports = newsData;
