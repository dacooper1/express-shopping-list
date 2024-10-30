const express = require('express');
const items = require('./fakeDb')
const router = new express.Router();

router.get('/', function getList(req, res) {
    if (items.length == 0){
        return res.json({"message" : "This shopping list is empty, please add items."})
    } else {
        return res.status(200).json(items)
    }
})

router.post('/', function createItem(req, res) {
    let newItem = req.body
    items.push(newItem)
    res.status(201).json({item : newItem})
})

router.get('/:name', function getItem(req, res) {
    let reqItem = req.params.name
    for (let item of items) {
        if (item.name === reqItem) {
            return res.status(200).json({item:item});
        }
    }
})

router.patch('/:name', function editItem(req, res) {
    let reqItem = req.params.name
    let name = req.body.name
    let price = req.body.price
    for (let item of items) {
        if (item.name === reqItem) {
            let oldItem = {...item}
            item.name = name || item.name
            item.price = price || item.price
            return res.status(200).json({
                item: oldItem,
                updated: item
            });
        }
    }    
})

router.delete('/:name', function deleteItem(req, res) {
    const index = items.findIndex(item => item.name.toLowerCase() === req.params.name);

    if (index !== -1) {
        items.splice(index, 1);
    }
    return res.status(200).json({message : "Deleted"})
    
})

module.exports = router;