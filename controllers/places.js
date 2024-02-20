const express = require('express');
const router = express.Router();
const render = require('../render');
const db = require('../models');
//New Place
router.get('/new', (req, res) => {
  res.send(render('places/New'));
});

router.post('/', (req, res) => {
    db.Place.create(req.body)
    .then(() => {
        res.redirect('/places')
    })
    .catch(err => {
        console.log(err)
        res.send(render('error404'));
    })
})

router.get('/new', (req, res) => {
  res.send(render('places/new'));
})

router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
      res.render('places/show', { place })
  })
  .catch(err => {
      console.log('err', err)
      res.render('error404')
  })
})

router.put('/:id', (req, res) => {
  res.send(render('PUT /places/:id stub'));
})

router.delete('/:id', (req, res) => {
  res.send(render('DELETE /places/:id stub'));
})

router.get('/:id/edit', (req, res) => {
  res.send(render('GET edit form stub'));
})

router.post('/:id/rant', (req, res) => {
  res.send(render('GET /places/:id/rant stub'));
})

router.delete('/:id/rant/:rantId', (req, res) => {
    res.send(render('GET /places/:id/rant/:rantId stub'));
})

module.exports = router

