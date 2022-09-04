const fs = require("fs");
/**
 *
 * @param {string} url
 * @param {callback} callback
 */
let filepath = "";
exports.getView = function (url, callback) {
  switch (url) {
    case "/home":
      filepath = "home.html";
      break;
    case "/about":
      filepath = "about.html";
      break;
    default:
      filepath = "/default";
      break;
  }
};
fs.readFile(filepath, function (err, data) {
  callback(data);
});
