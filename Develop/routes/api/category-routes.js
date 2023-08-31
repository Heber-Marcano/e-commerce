const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  const categories = Category.findAll({
    include: Product
  });
  if (categories) {
    res.json(categories)
  } else {
    res.status(404).json({error: 'error loading'});
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  const categories = Category.findByPk(req.params.id, {
    includes: Product
  });
  if (categories) {
    res.json(categories)
  } else {
    res.status(404).json({error: 'error loading'});
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const categories =  Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json(err);
  }
  
  // create a new category
});

router.put('/:id', (req, res) => {
  try {
    const categories =  Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categories[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const categories = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categories) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;
