const express = require('express');
const router = express.Router();

let products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Coffee Maker', price: 49.99, category: 'Home' }
];

router.get('/', (req, res) => {
    res.json(products);
});

router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({message: 'Product not found'});
    res.json(product);
});

router.post('/:id', (req,res) => {
    const { name, price, category } = req.body;
    if (!name || !price) {
        return res.status(400).json({ message: 'Name and Price are required.' });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        category: category || 'uncategorized'
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price, category } = req.body;

    if (!name || price === undefined || !category){
        return res.status(400).json({
            message: 'Validation failed: name, price, and category are required.'
        });
    }
    if (typeof price !=='number' || price < 0){
        return res.status(400).json({ message: 'Price must be a positive number.' });
    }
    product.name = name;
    product.price = price;
    product.category = category;

    res.json(product);
});

router.delete("/:id", (req,res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) return res.status(404).json({message: 'Product not found'});

    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;