const express = require('express');
const router = express.Router();
const render = require('../render');
const places = require('../models/places');

// GET List of Places
router.get('/', (req, res) => {
    res.send(render('places/index', { places: places}));
});

//Get Details of a Place 
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send(render('Error404'));

    } else if (!places[id]) {
        res.status(400).send(render('Error404'));

    } else {
        res.send(render('places/Show', { place: places[id], id: id }));
    }
});

router.get('/new', (req, res) => {
    res.send(render('places/new'))
});
// Post Route
router.post('/', (req, res) => {
    const newPlace = { ...req.body };
    if (!newPlace.pic) {
        newPlace.pic = 'https://via.placeholder.com/300';
    }
    if (!newPlace.city) {
        newPlace.city = 'Unknown';
    }
    if (!newPlace.state) {
        newPlace.state = 'USA';
    }
    places.push(newPlace);
    res.redirect('/places');
});
// Put Route
router.put('/:id', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    }
    else if (!places[id]) {
        res.render('error404')
    }
    else {
        // Dig into req.body and make sure data is valid
        if (!req.body.pic) {
            // Default image if one is not provided
            req.body.pic = 'http://placekitten.com/400/400'
        }
        if (!req.body.city) {
            req.body.city = 'Anytown'
        }
        if (!req.body.state) {
            req.body.state = 'USA'
        }
  
        // Save the new data into places[id]
        places[id] = req.body
        res.redirect(`/places/${id}`)
    }
  })
  
  

// Edit Route
router.get('/:id/edit', (req, res) => {
    let id = Number(req.params.id)
    if (isNaN(id)) {
        res.render('error404')
    }
    else if (!places[id]) {
        res.render('error404')
    }
    else {
      res.render('places/edit', { place: places[id] })
    }
  })
  

// Delete a Place
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
    
        res.status(400).send(render('Error404'));
    } else if (!places[id]) {
        
        res.status(400).send(render('Error404'));
    } else {
        places.splice(id, 1);
        res.redirect('/places');
    }
});

module.exports = router;

