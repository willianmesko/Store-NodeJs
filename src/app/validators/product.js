const validateBody = (req, res, next) => {
  for (const values of Object.values(req.body)) {
    if (values === '') return res.send('Please,, fill all fields!')
  }

  next()
}

module.exports = validateBody
