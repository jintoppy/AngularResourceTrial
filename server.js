var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var employees = [{
    "id": 1,
    "name": "Ram",
    "country": "US",
    "designation": "CTO",
    "department": 1,
    "joiningDate": "1288323623006"
},
{
    "id": 2,
    "name": "Prabhu",
    "country": "India",
    "designation": "Developer",
    "department": 2,
    "joiningDate": "1288323623006"
}];
router.route('/users')
.get(function(req, res){
	res.json(employees);
})
.post(function(req, res){
	var employee = req.body;
	console.log(employee);
	employee.id = employees.length +1;
	employees.push(employee);
	res.json({message: 'Employee added'});
});

router.route('/users/:id').put(function(req, res){
	var empId = req.params.id;
	var isUpdated = false;
	var updatedEmp;
	employees.forEach(function(item, index){
		if(item.id == empId){
			for(prop in req.body){
				item[prop] = req.body[prop];
			}
			updatedEmp = item;
			isUpdated = true;
		}
	});
	console.dir(employees);
	if(isUpdated){
		res.json(updatedEmp);
	}
	else{
		res.send({message: 'Error in update'});
	}
})
.get(function(req, res){
	var empId = req.params.id;
	console.log(empId);
	var filteredArr = employees.filter(function(employee){
		console.log(employee.id);
		return employee.id == empId;
	});
	if(filteredArr.length>0){
		var currentEmp = filteredArr[0];
		return res.json(currentEmp);
	}
	else{
		return res.send({message: 'Error in getting'});
	}	
})
.delete(function(req, res){
	var empId = req.params.id;
	var filteredArr = employees.filter(function(employee){
		return employee.id == empId;
	});
	if(filteredArr.length>0){
		//var currentEmp = filteredArr[0];
		return res.json({ message: 'Successfully deleted' });
	}
	else{
		return res.send({message: 'Error in getting'});
	}
});

var app = express();
app.use(bodyParser.json());
app.use('/api', router);
app.use(express.static('public'));
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function(){
	console.log('server running on ' + server.address().port);
});
