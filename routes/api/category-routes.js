const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCat = await Category.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(allCat)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.get('/:id', async (req, res) => {
  try {
    const oneCat = await Category.findByPk({
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
    res.status(200).json({ message: "Category updated"} )
  }).catch((err) => {
    console.log(err)
    res.status(400).json(err)
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy( {
      where: {
        id: req.params.id
      }
    })
    if(!delCat) {
      res.status(404).json({message: "No Category found with provided id"})
      return
    } else {
      res.status(200).json({ message: "Category deleted!"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

module.exports = router;
