const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tags = Tag.findAll({
      include: Product
    });
    if (tags) {
      res.json(tags)
    }
    else {
      res.status(404).json({error: 'error loading'});
    }
  } catch (error) {
    res.status(500).json({error: 'error occured on the server'})
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  try {
    const tags =  Tag.findByPk(req.params.id, {
      include: Product
    })
    if (tags) {
      res.json(tags)
    } else {
      res.status(404).json({error: 'error loading page'})
    }
  } catch (error) {
    res.status(500).json({error: 'error occured on the server'})
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  try {
    const tags = Tag.create(req.body);
    if (tags) {
    res.status(200).json(Category)
    } else {
      res.status(404).json({error: 'error loading page'})
    }
  } catch (error) {
    res.status(500).json({error: 'error occured on the server'})
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  try {
    const tags =  Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tags[0]) {
      req.status(404).json({message: 'No tag with this id!'})
      return;
    }
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({error: 'error occured on the server'})
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const tags = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tags) {
      res.status(404).json({message: 'No tag with this id!'})
      return;
    }
    res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({error: 'error occured on the server'})
  }
  // delete on tag by its `id` value
});

module.exports = router;
