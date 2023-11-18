const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const allCat = Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(allCat)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.get('/:id', (req, res) => {
  try {
    const oneCat = Category.findByPk({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(oneCat)
  } catch(err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  // {
  //   category_name:"Whatever"
  // }
    Category.create(req.body).then((newCat) => {
      res.status(200).json(newCat)
    }).catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((newCat) => {
    res.status(200).json(newCat)
  }).catch((err) => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!delCat) {
      res.status(404).json({message: "No Category found with provided id"})
      return
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
