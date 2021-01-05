var express = require('express');
var hstore = require('hstore.js');
var pgp = require('pg-promise')({})
var gisUtil = require('../utilities/GisUtilities');
var regexPattern = require('../consts/regexPattern');

var router = express.Router();
// var db0 = pgp('postgres://postgres:123456@127.0.0.1:5432/geo')
var db0 = pgp('postgres://postgres:admin_123@192.168.4.2:5432/mapapi')

// var db0 = pgp('postgres://postgres:admin_123@192.168.4.118:5432/geocoding')

// var db2 = pgp('postgres://postgres:admin_123@192.168.1.68:5432/giamsathanhtrinh')

router.get('/', function (req, res, next) {
	let query = 'select * from '
	let { q, type } = req.query
	try {
		const address = q.match(regexPattern.HOUSE_ADDRESS)[0]
		var matches = address.match(regexPattern.NUMBER);
		q = q.replace(address, '')
		matches.forEach(number => q += ` ${number}`)
		console.log(matches)
	} catch (e) {
		console.log(e)
	}
	if (type)
		query += `fts_geocoding_with_type('${q}','${type}')`
	else
		query += `fts_geocoding('${q}')`

	console.log(query)
	db0.query(query)
		.then(function (data) {
			const result = []
			data.forEach(row => {
				result.push({
					...row,
					tags: hstore.parse(row.tags)
				})
			});
			res.send(result)
		})
		.catch(function (error) {
			console.log('ERROR:', error)
			res.send('fail')
		})
});

router.get('/reverse', function (req, res, next) {
	const { lat, lng } = req.query
	db0.query(`select * from gcd_reverse_geocoding('POINT (${lng} ${lat})')`)          
		.then(function (data) {
			const result = []
			if (data && data.length > 0) {
				let row = data[0]
				res.send({
					...row
				})
			}
			else res.send({})
		})
		.catch(function (error) {
			console.log('ERROR:', error)
			res.send('fail')
		})
});

router.get('/autoload', function (req, res, next) {
	const { lat, lng } = req.query
	db0.query(`select * from gcd_reverse_geocoding('POINT (${lng} ${lat})')`)          
		.then(function (data) {
			const result = []
			if (data && data.length > 0) {
				let row = data[0]
				res.send({
					...'123'
				})
			}
			else res.send({})
		})
		.catch(function (error) {
			console.log('ERROR:', error)
			res.send('fail')
		})
});

router.get('/types', function (req, res, next) {
	db0.query('select gcd_poi_types()')
		.then(function (data) {
			res.send(data.map(e => e.gcd_poi_types))
		})
		.catch(function (error) {
			console.log('ERROR:', error)
			res.send('fail')
		})
});

module.exports = router;
