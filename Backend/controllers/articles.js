'use strict'

const validator = require('validator');


const ArticleModel = require('../models/article');

const controller = {
  saveArticles: (req, res) => {
    let params = req.body;
    //Validar datos
    try {
      var validate_title = !validator.isEmpty(params.name);
      var validate_content = !validator.isEmpty(params.price);
    } catch (err) {
      return res.status(400).send({
        status: "error",
        message: "Faltan datos por enviar"
      });
    }

    if (validate_title && validate_content) {
      let article = new ArticleModel();

      article.name = params.name;
      article.price = params.price;
      article.image = params.image;
      article.title = params.title;
      article.description = params.description;

      article.save((err, articleStored) => {
        if (err || !articleStored) {
          return res.status(400).send({
            status: "error",
            message: "Error al guardar articulo"
          });
        } else {
          return res.status(200).send({
            article: articleStored
          });
        }
      });
    } else {
      return res.status(400).send({
        status: "error",
        message: "Los datos no son validos"
      });
    }
  },

  getArticles: (req, res) => {

    let query =  ArticleModel.find({})
    let last = req.params.last;
    if(last || last !=undefined){
        query.limit(5)
    }

    //Find
    query.sort("-date").exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            message: "Error en la peticion"
          });
        }
        return res.status(200).send({
          articles
        });
      });
  },

  getArticleById: (req, res) => {
      let articleId = req.params.id;
        if(!articleId || articleId == null){
            return res.status(400).send({
                message: `El articulo ${articleId} no exsiste`
              });
        }
      ArticleModel.findById(articleId,(err,article) =>{
        if(!article || err ){
            return res.status(400).send({
                message: `El articulo ${articleId} no exsiste`
              });
        }else{
            return res.status(200).send({
              article
              });
        }

      });
  },

  updateArticle:(req, res) =>{
    let articleId = req.params.id;

    let params = req.body;


    //Recoger los datos que llegan por put


    //Validar datos
    let validate_title;
    let validate_content;

    try {

      validate_title = !validator.isEmpty(params.title);
      validate_content = !validator.isEmpty(params.content);

    } catch (err) {
      return res.status(404).send({
        status: 'Error',
        message: 'Faltan datos por enviar'
      });
    };

    if (validate_title && validate_content) {
      //find and update
      ArticleModel.findOneAndUpdate({
        _id: articleId
      }, params, {
        new: true
      }, (err, articleUpdate) => {
        if (err) {
          return res.status(500).send({
            status: 'Error',
            message: 'Error en la peticion'
          });
        }

        if (!articleUpdate) {
          return res.status(404).send({
            status: 'Error',
            message: 'No exsiste el articulo'
          });
        }

        return res.status(200).send({
          article: articleUpdate
        });

      });
    } else {
      return res.status(404).send({
        status: 'Error',
        message: 'La validacion no es correcta'
      });
    }
},

deleteArticle: (req,res) =>{

    let articleId = req.params.id;

    ArticleModel.findByIdAndRemove({_id: articleId},(err,articleRemoved) =>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error en la peticion'
                  });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: `El articulo no ha sido encontrado`
                  });
            }
            return res.status(200).send({
                    article: articleRemoved
              });
    });
},
upload: (req,res) => {
    //Configurar conect multiparty module router/articles.js

    //Recoger el fichero de la peticion
    let fileName = 'Imagen no subida...';

    if (!req.files) {
      return res.status(404).send({
        status: 'Error',
        message: file_name
      });

    }
    //Conseguir nombre y extension
    let filePath = req.files.file0.path;
    let fileSplit = filePath.split('\\');

    // ADVERTENCIA: EN LINUK O MAC
    //let fileSplit = filePath.split('/');

    //Nombre del archivo
    let file_name = fileSplit[2];
    //Extension del fichero
    let extensionSplit = file_name.split('\.');
    let file_ext = extensionSplit[1];

    //Comprobar la extension,si no es validad borrar el fichero
    if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
        //Borrar archivo subido
        fs.unlink(filePath,(err)=>{
          return res.status(200).send({
            status: 'Error',
            message: 'La extension de la imagen no es valida !!'
          });
        })
    }else{
      let articleId = req.params.id;
      ArticleModel.findByIdAndUpdate(articleId,({image:file_name}), ({new: true}), (err,articleUpdated) =>{
        if (err || !articleUpdated) {
          return res.status(400).send({
            status: 'Error',
            message:'Error al guardar la imagen de articulo'
          });
        }
        return res.status(200).send({
          status: 'Success',
          articleUpdated
        });
      })
    }
  },
getImage: (req,res) =>{
  let file = req.params.image;
  let path_file = './upload/articles/'+file;

  fs.exists(path_file,(exsist)=>{
    if (exsist) {
      return res.sendFile(path.resolve(path_file))
    }else {
      return res.status(404).send({
        status: 'Error',
        message:'La imagen no existe!'
      });
    }
  });
},

search:(req,res)=>{
  let searchString =req.params.search;

//find or
  ArticleModel.find({ '$or': [
    { 'name': {'$regex': searchString, '$options': 'i'}}
  ]})
  .sort([['date','descending']])
  .exec((err,articles) => {
    if(err) {
      return res.status(500).send({
        status: 'Error',
        message:'Error en la peticion'
      });
    }
    if (!articles || articles.length <= 0){
      return res.status(404).send({
        status: 'Error',
        message:'No hay articulos para mostrar'
      });
    }
    return res.status(200).send({
      status: 'Success',
      articles
    });

  });
}


};

module.exports = controller;
