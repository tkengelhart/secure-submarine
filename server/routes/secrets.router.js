const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  if (req.user.id === 1)
    // what is the value of req.user????
    console.log('req.user:', req.user);
  let queryText = `SELECT * FROM "secret" WHERE "secrecy_level" <= $1;`;
  pool.query(queryText, [req.user.clearance_level])
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

// router.get('/', rejectUnauthenticated, (req, res) => {
//   if (req.user.secrecy_level <= 10) {
//     res.status(403).send('You need to be an admin to see this');
//     return;
//   }
//   let queryText = `SELECT * FROM "secret";`
//   pool.query(queryText).then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log(error);
//     res.sendStatus(500);
//   });
// });


module.exports = router;
