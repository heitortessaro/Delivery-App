const { Router } = require('express');
const path = require('node:path');

const imagesRouter = Router();

imagesRouter.get('/images/:image', (req, res) => {
    const { image } = req.params;
    res.sendFile(path.resolve(__dirname, `../images/${image}`));
});

module.exports = imagesRouter;