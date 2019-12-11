'use strict'

const express = require('express');

const ArticleController = require('../controllers/articles');

const router = express.Router();

const multipart = require('connect-multiparty');
const md_upload = multipart({uploadDir: './upload/articles'});

//Routas utiles

//Routas para articulos
router.post('/save',ArticleController.saveArticles);

router.get('/articles/:last?',ArticleController.getArticles);

router.get('/article/:id',ArticleController.getArticleById);

router.put('/article/:id',ArticleController.updateArticle);

router.delete('/article/:id',ArticleController.deleteArticle);

router.post('/upload-image/:id',md_upload,ArticleController.upload);

router.get('/get-image/:image',ArticleController.getImage);

router.get('/search/:search',ArticleController.search);

module.exports = router;
