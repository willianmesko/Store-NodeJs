const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join('public', 'images')),
  filename: (req, file, cb) => {
    const name = `${Date.now().toString()}-${file.originalname}`

    cb(null, name)
  }
})
const fileFilter = (req, file, cb) => {
  const accepted = ['image/png', 'image/jpg', 'image/jpeg']
  const isAccepted = accepted.find(format => format == file.mimetype)

  if (isAccepted) return cb(null, true)

  return cb(null, false)
}

module.exports = multer({ storage, fileFilter })
