const express = require('express');
const router  = express.Router();
const Task    = require('../models/task');

// LIST
router.get('/tasks', (req, res, next) => {
    Task.find().sort({'createdAt': -1})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json(err))
});

// CREATE
router.post('/tasks', (req, res, next)=>{
    Task.create({
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    })
        .then(task=> res.status(201).json(task))
        .catch(err => res.status(500).json(err))
})

// UPDATE
router.put('/tasks/:id', (req, res, next)=>{
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(task => res.json(task))
        .catch(err => res.status(500).json(err))
})

// DESTROY
router.delete('/tasks/:id', (req, res, next)=>{
    Task.findByIdAndRemove(req.params.id)
        .then(task => res.status(204).send())
        .catch(err => res.status(500).json(err))
})

module.exports = router;
