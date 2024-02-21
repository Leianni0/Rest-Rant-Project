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

// Show page
router.get('/:id', (req, res) => {
  db.Place.findById(req.params.id)
  .populate('comments')
  .then(place => {
    console.log(place.comments)
      res.send(render('places/show', { place }))
  })
  .catch(err => {
      console.log('err', err)
      res.send(render('error404'))
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

//Comments
router.post('/:id/comment', (req, res) => {
  console.log(req.body)
  db.Place.findById(req.params.id)
  .then(place => {
      db.Comment.create(req.body)
      .then(comment => {
          place.comments.push(comment.id)
          place.save()
          .then(() => {
              res.redirect(`/places/${req.params.id}`)
          })
      })
      .catch(err => {
          res.render('error404')
      })
  })
  .catch(err => {
      res.render('error404')
  })
})

module.exports = router

