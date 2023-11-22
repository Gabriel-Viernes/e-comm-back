const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTag = await Tag.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(allTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })
    res.status(200).json(oneTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  // expected req.body: 
  // {
  //   tag_name: "whatever"
  // }
  Tag.create(req.body).then((product) => {
    res.status(200).json(product)
  }).catch((err) => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((product) => {
    res.status(200).json({ message: "Tag updated!"})
  }).catch((err) => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: { 
        id: req.params.id
      }
    })
    if(!delTag) {
      res.status(404).json({message:"No tag found with provided id"})
      return
    } else {  
      res.status(200).json({ message: "Tag deleted!"})
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
