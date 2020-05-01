const express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var ObjectId = require('mongoose').Types.ObjectId;

var { Movie } = require('../models/movie');


var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
     }
  });
  
  var upload = multer({
    storage:Storage
  }).single('file');
  
  router.get('/getall',async (req, res) => {
    var movie =  await Movie.find({})
    if(movie){
        res.json({
            status:'200',
            data:movie
        });
    }
    else{
        res.json({
            status:'400',
            message:'Bad Request'
        });
    }
    
});



router.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    var movie =  await Movie.findOne({_id:req.params.id});
    if(movie){
        res.json({
            status:'200',
            data:movie
        });
    }
    else{
        res.json({
            status:'400',
            message:'Bad Request'
        });
    }
    
});

router.post('/moviedata',upload,async (req, res) => {
    console.log(req.body);
    var mov = new Movie({
        name: req.body.name,
        image: req.file.filename,
        summary: req.body.summary,
        
    });
   var saveData = await mov.save();
   try{
    if(saveData){
        res.json({
        status:'200',
        data : saveData
        })
    }
   }
   catch(ex){
    console.error(ex);
   }
  
});

router.put('/:id',async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);  
  var  movie =  await Movie.findByIdAndUpdate({_id:req.params.id}, { $set: {
    name: req.body.name,
    summary: req.body.summary
    } });
    if(movie){
        res.json({
            status:'200',
            data:movie
        });
    }
    else{
        res.json({
            status:'400',
            message:'Bad Request'
        });
    }
    
});

router.delete('/:id',async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        var movie =  await Movie.findByIdAndRemove({_id:req.params.id});
        if(movie){
            res.json({
                status:'200',
                data:movie
            });
        }
        else{
            res.json({
                status:'400',
                message:'Bad Request'
            });
        }
        
    });



module.exports = router;