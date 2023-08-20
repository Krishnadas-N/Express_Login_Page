const express = require('express');
const router = express.Router();
const session = require('express-session')



let Username;



const User_details = [
  {
    "username": "admin@gmail.com",
    "password": "admin123"
  }, {
    "username": "krishna@gmail.com",
    "password": "123456"
  }, {
    "username": 'user@gmail.com',
    "password": 'password'
  }
];

// const nocache = (req, res, next) => {
//   res.set("Cache-Control", "no-store, max-age=0, must-revalidate");
//   next();
// };

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}


router.get('/', isAuthenticated, (req, res) => {
  res.render('home', { user: Username});

});

/* GET home page. */
router.get('/login', function (req, res) {
  
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('index', { title: 'Login Page' });
  }
});

router.post('/login', (req, res) => {
  Username = req.body.email;  
  const Password = req.body.password;
  const user = User_details.find((user) => user.username === Username && user.password === Password);
  if (user) {
    req.session.user = true;
    res.status(200);
    res.redirect('/');
  } else {
    res.render('index', { errorMessage: 'Enter Valid Username or Password' });
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login'); // Redirect to the login page after logout
  });
});

module.exports = router;






//30
// router.get('/', (req, res) => {
//   let logoutMessage = req.session.logoutMessage;
//   // Check if logoutMessage exists and is not undefined
//   if (logoutMessage) {
//     // Clear the logoutMessage from the session after reading it
//     req.session.logoutMessage = null;
//     res.render('index', { logoutMessage: logoutMessage });
//   } else {
//     res.render('index', { title: 'Krishnadas' });
//   }
// });