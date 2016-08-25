var Index = require('../app/controller/index');
var User = require('../app/controller/user');
var Movie = require('../app/controller/movie')

module.exports=function(app){
	//预处理
	app.use(function(req,res,next){
		var _user = req.session.user;
		if(_user){
			res.locals.user=_user;
		}
		return next();
	})
	// index page
	app.get('/',Index.index)
	// User
	app.post('/user/signup',User.signup)
	app.post('/user/signin',User.signin)
	app.get('/signin',User.showSignin)
	app.get('/signup',User.showSignup)
	app.get('/logout',User.logout)
	app.get('/admin/userlist',User.list)
	//movie
	app.get('/admin/new',Movie.new)
	app.get('/admin/update/:id',Movie.update)
	app.post('/admin/movie',Movie.save)
	app.get('/admin/list',Movie.list)
	app.get('/movie/:id',Movie.detail)
	app.delete('/admin/list',Movie.del)
}