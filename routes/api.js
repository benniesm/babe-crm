const express = require ('express');
const router = express.Router();

const Users = require('../models/users');
const Customers = require('../models/customers');
const Contacts = require('../models/contacts');
const Login = require('../models/login');

const rbac = {
	"home": [[1,1,1,1], [1,1,1,1], [1,1,1,1], [1,1,1,1]],
	"contacts": [[0,0,0,0], [1,1,0,0], [1,1,1,0], [1,1,1,1]],
	"customers": [[0,0,0,0], [1,1,1,0], [1,1,1,1], [1,1,1,1]],
	"profile": [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
	"users": [[0,0,0,0], [0,0,0,0], [0,1,0,0], [1,1,1,1]],
};
  				
/*
* Authentication Component
*/
router.get('/login', (req, res, next) => {
  Login.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/crud', (req, res) => {
	if(req.body.act === "create") {
		req.body.rights[0] === 1 ?
		(res.json({stat: 202}))
		:
		(res.json({stat: 401}))
	} else if (req.body.act === "update") {
		req.body.rights[2] === 1 ?
		(res.json({stat: 202}))
		:
		(res.json({stat: 401}))
	} else if (req.body.act === "delete") {
		req.body.rights[3] === 1 ?
		(res.json({stat: 202}))
		:
		(res.json({stat: 401}))
	} else {
		res.json({stat: 403});
	}
});

router.get('/login/:loginCookie', (req, res, next) => {
  const login = JSON.parse(req.params.loginCookie);
  Login.findOne({
  	"_id": login.id,
  	"user_id": login.user_id,
  	"timestamp": login.timestamp
  })
    .then(data => {
    		if (data && data._id) {
					if (login.page === "home") {
						var pageLevel = 1;
    				var pageRbac = rbac.home;
					} else if (login.page === "profile") {
						var pageLevel = 1;
    				var pageRbac = rbac.profile;					
					} else if (login.page === "contacts") {
						var pageLevel = 2;
    				var pageRbac = rbac.contacts;
					} else if (login.page === "customers") {
						var pageLevel = 2;
    				var pageRbac = rbac.customers;
					} else if (login.page === "users") {
						var pageLevel = 3;
    				var pageRbac = rbac.users;
					} else {
						var pageLevel = 5;
    				var pageRbac = null;
					} 			
    			if (data.level >= pageLevel) {
    				res.json({stat: 202, actions: pageRbac[data.level - 1]});
    			} else {
    				res.json({stat: 403});
    			}
    		} else {
    			res.json({stat: 406});
    		}
    })
    .catch(next)
});

router.get('/level/:page', (req, res) => {

	
	return res.json(levels);
});

router.post('/authenticate', (req, res, next) => {
  if(req.body.username && req.body.password){
		var date = new Date();
		var timestamp = date.getTime();
		Users.findOne({"username": req.body.username, "password": req.body.password})
		  .then(
					data => {
						if (data && data._id) {							
							Login.deleteMany({"user_id": data._id})
    						.then()
    						.catch(next);
								Login.create({
									"user_id": data._id,
									"level": data.level,
									"timestamp": timestamp
								})
				  				.then(
				  					dataRes => res.json({
											"stat": 202,
											"id": dataRes._id,
											"user_id": dataRes.user_id,
											"timestamp": dataRes.timestamp
				  					})
				  				)
				  				.catch(next)
				  		
							} else {
								(res.json({stat: 406}))
							}
					}
		  )
		  .catch(next);
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/login/:loginId', (req, res, next) => {
  Login.deleteMany({"user_id": req.params.loginId})
    .then(data => res.json(data))
    .catch(next)
});

/*
* Contacts Component
*/
router.get('/contacts', (req, res, next) => {
  
  Contacts.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/contacts', (req, res, next) => {
  if(req.body.customer_id
  		&& req.body.user_id
  		&& req.body.category
  		&& req.body.details
  		&& req.body.timestamp){
    Contacts.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.put('/contacts', (req, res, next) => {
  if(req.body.id
  		&& req.body.customer_id
  		&& req.body.user_id
  		&& req.body.category
  		&& req.body.details
  		&& req.body.timestamp){
    Contacts.updateOne(
    	{"_id": req.body.id},
    	{$set:
    		{
		  		customer_id: req.body.customer_id,
		  		user_id: req.body.user_id,
		  		category: req.body.category,
		  		details:  req.body.details,
		  		timestamp: req.body.timestamp
    		}
    	}
    )
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/contacts/:id', (req, res, next) => {
  (Contacts.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next))
});

/*
* Customers Component
*/
router.get('/customers', (req, res, next) => {
  Customers.find({})
    .then(data => res.json(data))
    .catch(next)  
});

router.get('/customers/:id', (req, res, next) => {
  Customers.findById(req.params.id)
    .then(data => res.json(data))
    .catch(next)
  
});

router.post('/customers', (req, res, next) => {
  if(req.body.alt_id
  		&& req.body.category
  		&& req.body.fullname
  		&& req.body.email
  		&& req.body.telephone
  		&& req.body.city
  		&& req.body.address
  		&& req.body.comment
  		&& req.body.date){
    Customers.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.put('/customers', (req, res, next) => {
  if(req.body.alt_id
  		&& req.body.category
  		&& req.body.fullname
  		&& req.body.email
  		&& req.body.telephone
  		&& req.body.city
  		&& req.body.address
  		&& req.body.date
  		&& req.body.comment){
    Customers.updateOne(
    	{"_id": req.body.id},
    	{$set:
    		{
		  		alt_id: req.body.alt_id,
		  		category: req.body.category,
		  		fullname: req.body.fullname,
		  		email:  req.body.email,
		  		telephone: req.body.telephone,
		  		city: req.body.city,
		  		address: req.body.address,
		  		date: req.body.date,
		  		comment: req.body.comment
    		}
    	}
    )
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/customers/:id', (req, res, next) => {
  Customers.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
});

/*
* Users Component
*/
router.get('/users', (req, res, next) => {
  Users.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.get('/users/:id', (req, res, next) => {
  Users.findById(req.params.id) //error all rows returned
    .then(data => res.json(data))
    .catch(next)  
});

router.post('/users', (req, res, next) => {
  if(req.body.fullname
  		&& req.body.level
  		&& req.body.username
  		&& req.body.password
  		&& req.body.email){
    Users.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.put('/users', (req, res, next) => {
  if(req.body.id
  		&& req.body.fullname
  		&& req.body.level
  		&& req.body.username
  		&& req.body.password
  		&& req.body.email){
    Users.updateOne(
    	{"_id": req.body.id},
    	{$set:
    		{
		  		fullname: req.body.fullname,
		  		level: req.body.level,
		  		username: req.body.username,
		  		password:  req.body.password,
		  		email: req.body.email
    		}
    	}
    )
      .then(data => res.json(data))
      .catch(next)
  } else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/users/:id', (req, res, next) => {
  Users.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
});

module.exports = router;
