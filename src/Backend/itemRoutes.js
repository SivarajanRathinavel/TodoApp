const express = require('express');
const router = express.Router();
const Item = require('../Backend/Item')

// @route POST /api/items
// @desc Create an item
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route GET /api/items
// @desc Get all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route PUT /api/items/:id
// @desc Update an item
router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route DELETE /api/items/:id
// @desc Delete an item
router.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



// const express = require('express')
// const router = express.Router();
// const Item = require('../Backend/Item')
// //@route POST /api/items
// //@desc Create an item

// router.post('/items', async(req, res)=>{
//     try{
//         const newItem = new Item(req.body);
//         const savedItem = await newItem.save();
//         res.json(savedItem)
//     } catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
// })
// router.get('/items',async(req, res)=>{
//     try{
//         const items = await Item.find();
//         res.json(items);
//     }catch(err){
//         res.status(500).json({error:err.message})
//     }
// })

// //@route PUT/api/items:id
// //@desc Update an item

// router.put('/items/:id',async(req, res)=>{
//     try{
//         const updateItem = await Item.findByIdAndUpdate(req.params.id, req.body,{new:true} );
//         res.json(updateItem)
//     }catch(err){
//         res.status(500).json({error:err.message});
//     }
// })

// //@route DELETE /api/items/:id
// //@desc Delete an item
// router.delete('/items/id:', async(req, res)=>{
//     try{
//         await Item.findByIdAndUpdate(req.params.id);
//         res.json({message:"Item Deleted"});
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
// })
// module.exports = router;