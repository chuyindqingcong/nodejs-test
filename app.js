var express = require('express');
var path=require('path');
var port=process.env.PORT || 3000;
var mongoose = require('mongoose');
var Movie = require('./mondels/movie')
var _=require('underscore')
var app =express();
var serverStatic=require('serve-static');
var bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost/imooc')

app.use(serverStatic('bower_components'));
app.set('views','./views/pages');
app.set('view engine','jade');
app.use(bodyParser.urlencoded());
app.listen(port);
console.log('port'+port);

// index page
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}	
		res.render('index',{
			title:'imooc 首页',
			movies:movies
		})
	})
})
// detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id;

	Movie.findById(id,function(err,movie){
		res.render('detale',{
			title:'imooc'+movie.title,
			movie:movie
			})
	})
})
// admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imooc 后台录入页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})
//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie._id;
	var movieObj= req.body.movie;
	var _movie
	if(id!='undefined') {
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err)
			}
			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err)
				}
				res.redirect('/movie/'+ movie._id)
			})
		})
	}else{
		_movie = new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash,
		})
	}
})
// list page
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'imooc 列表页面',
		movies:[{
			title:'机械战警',
			_id:1,
			doctor:'何塞',
			country:'中国',
			year:2018,
			language:'日本',
			flash:'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
		}]
	})
})