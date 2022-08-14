// Import the necessary dependencies //
const multer = require('multer');
// // Define the MIME TYPE dictionary //
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
};
// Check if the file is an image //
const imageFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback('Only images are accepted.', false);
  }
};
// Indicate in which folder the files are stored                            //
// Indicate to use the original name and to replace spaces with underscores //
// Uses the MIME_TYPES constant to give the appropriate file extension      //
// Adding a timestamp to the name of the image to avoid duplicates          //
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'image');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});
// Export multer configuration by indicating to manage a single image type file //
module.exports = multer({ imageFilter: imageFilter, storage: storage }).single(

);
