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
	app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)
	//movie
	app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
	app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
	app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.save)
	app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
	app.get('/movie/:id',Movie.detail)
	app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
}