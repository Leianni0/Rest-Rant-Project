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
  db.Place.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
      res.redirect(`/places/${req.params.id}`)
  })
  .catch(err => {
      console.log('err', err)
      res.send(render('error404'))
  })
})

//Place Delete
router.delete('/:id', (req, res) => {
  db.Place.findByIdAndDelete(req.params.id)
  .then(place => {
      res.redirect('/places')
  })
  .catch(err => {
      console.log('err', err)
      res.send(render('error404'))
  })
})

//Edit router
router.get('/:id/edit', (req, res) => {
  db.Place.findById(req.params.id)
  .then(place => {
      res.send(render('places/edit', { place }))
  })
  .catch(err => {
      res.send(render('error404'));
  })
})


router.post('/:id/rant', (req, res) => {
  res.send(render('GET /places/:id/rant stub'));
})

router.delete('/:id/rant/:rantId', (req, res) => {
    res.send(render('GET /places/:id/rant/:rantId stub'));
})

//Comments
router.post('/:id/comments', (req, res) => {
  let commentData = req.body;
  commentData.rant = commentData.rant === 'on';
  commentData.stars = parseFloat(commentData.stars);
  db.Comment.create(commentData)
      .then((comment) => {
          db.Place.findById(req.params.id)
              .then((place) => {
                  place.comments.push(comment);
                  place.save();
                  res.redirect(`/places/${place._id}`);
              })
              .catch((err) => {
                  console.log(err);
                  res.status(404).send('Not Found');
              });
      })
      .catch((err) => {
          console.log(err);
          res.status(400).send('Bad Request');
      });
});

module.exports = router;

