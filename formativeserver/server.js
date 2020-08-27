//this is a Node Express server
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')

//the model
var Artist = require('./artist-model')
var Type = require('./type-model')

//setup express server
var app = express()
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(logger('dev'))

//setup database connection
var connectionString = 'mongodb+srv://madmax:madmax@cluster0.v6sgl.mongodb.net/musicapp?retryWrites=true&w=majority'

//mongodb+srv://stacy2020:stacy2020@cluster0.bg9pc.mongodb.net/projects-music?retryWrites=true&w=majority
// mongodb://stacy2020:stacy2020@cluster0-shard-00-00.bg9pc.mongodb.net:27017,cluster0-shard-00-01.bg9pc.mongodb.net:27017,cluster0-shard-00-02.bg9pc.mongodb.net:27017/projects-music?ssl=true&replicaSet=atlas-9frhf9-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect(connectionString,{ useNewUrlParser: true })
var  db = mongoose.connection
db.once('open', () => console.log('Database connected'))
db.on('error', () => console.log('Database error'))



//setup routes
var router = express.Router();



//CRUD projects
router.get('/artists', (req, res) => {
  	Artist.find()
	.then((artist) => {
	    res.json(artist);
  	})
})

router.get('/artists/:id', (req, res) => {
  	Artist.findOne({id:req.params.id})
	.then((artist) => {
	    res.json(artist)
 	})
})

router.post('/artists', (req, res) => {

  	var artist = new Artist()
	artist.id = Date.now()
	
	var data = req.body
	Object.assign(artist,data)
	artist.save()
	.then((artist) => {
	  	res.json(artist)
  	})
  
})

router.put('/artists/:id', (req, res) => {

	Artist.findOne({id:req.params.id})
	.then((artist) => {
		var data = req.body
		Object.assign(artist,data)
		return artist.save()	
	})
	.then((artist) => {
		 res.json(artist)
	})

})

router.delete('/artists/:id', (req, res) => {

	Artist.deleteOne({ id: req.params.id })
	.then(() => {
		res.json('deleted')
	})
	
})

//type CRUD
router.get('/types', (req, res) => {
  	Type.find()
	.then((type) => {
	    res.json(type);
  	})
})

router.get('/types/:id', (req, res) => {
  	Type.findOne({id:req.params.id})
	.then((type) => {
	    res.json(type)
 	})
})

router.post('/types', (req, res) => {

  	var type = new Type()
	type.id = Date.now()
	
	var data = req.body
	Object.assign(type,data)
	type.save()
	.then((type) => {
	  	res.json(type)
  	})
  
})

router.put('/types/:id', (req, res) => {

	Type.findOne({id:req.params.id})
	.then((type) => {
		var data = req.body
		Object.assign(type,data)
		return type.save()	
	})
	.then((type) => {
		 res.json(type)
	})

})

router.delete('/types/:id', (req, res) => {

	Type.deleteOne({ id: req.params.id })
	.then(() => {
		res.json('deleted')
	})
	
})


//use server to serve up routes
app.use('/api', router)

// launch our backend into a port
const apiPort = 4000;
app.listen(apiPort, () => console.log('Listening on port '+apiPort))
