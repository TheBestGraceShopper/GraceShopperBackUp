
  function authorize(req, res, next) {
      if (!req.user) {
          res.status(401).send('Please login!')
      } else if (req.user.userType !== 'admin') {
          res.status(401).send('User does not have the privelages to access admin page.')
      }
      next()
  }

  module.exports =authorize