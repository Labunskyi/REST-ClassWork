let results = document.getElementById("results");
let orderForm = document.getElementById("order-form");
let userInfo = document.getElementById("user-info");
let loginForm = document.getElementById("login");
let registrationForm = document.getElementById("registration");
let carDetails = document.getElementById("details");
let orderDetails = document.getElementById("orderdetails");
let findDetails = document.getElementById("finddetails");

//var $savedUser = JSON.parse(localStorage.getItem("user") || '{}');
//$('span[name=infoUsername]').text($savedUser.username);
//console.log($savedUser);

function getCarList() {
    results.style.display = 'block';
    orderForm.style.display = 'none';
    let url = 'http://rest-classwork.local/Server/api/carshop/car/.json';
    $.get(url,  function (data) {
		console.log(data);
		let table = carsListToTable(data);
        results.innerHTML = table;
		
    }, "json");
}

function getDetails(id) {
    let url = 'http://rest-classwork.local/Server/api/carshop/car/'+id+'/.json';
    $.get(url, function (data) {
       
		let table = objToTable(data);
		let html = table;
		
		carDetails.innerHTML = html;
    }, "json");
}

function order() {
	
	let token = sendToken();
	console.log(token);
	if(token) {
		let url = 'http://rest-classwork.local/Server/api/orders/orders/';
		let formData = {
        
			'orderData': {
				'userid': token.userid,
				'carid': $('input[name=order-car-id]').val(),
				'name': $('input[name=name]').val(),
				'payment': $('select[name=payment]').val(),
			}
		};
		if (formData.orderData.name){
			$.post(url, formData, function (data) {
			var obj = $.parseJSON(data);	
			results.innerHTML = "<h3 class='text-success'>The car with id=" + obj.carid + " is successfully ordered!</h3>";    
        }, "text");
		} else {
			let errorMsg="";
			if (!formData.orderData.name){
				errorMsg += "<p>The name is empty!</p>";
			}
			document.getElementById("errorsOrderForm").innerHTML = errorMsg;
		}
	} else {
		errorMsg = "<p>Please register or login to order!</p>";
        document.getElementById("errorsLoginOrderForm").innerHTML = errorMsg;
	}

}

function carsListToTable(cars) {
    let table = '<table class="table" id="table">';
    if (cars.length) {
        table += '<tr class="row">';
        table += '<th class="col-md-1">id</th> <th class="col-md-3">mark</th> ' +
            '<th class="col-md-3">model</th><th class="col-md-3"></th>';
        table += '</tr>';
        for (let i in cars) {
            let id = cars[i]['CarId'];
            table += '<tr class="row">';
            table += '<td class="col-md-1">' + id + '</td> <td class="col-md-3">' +
                cars[i]['Brand'] + '</td> <td class="col-md-3">' + cars[i]['Model'] + '</td>';
            table += '<td class="col-md-3">' +
                '<button type="submit" class="btn btn-primary"' +
                'onclick="getDetails(' + id + ')">Details</button>' +
                '</td>';
            table += '</tr>';
        }
        table += '</table>';
    }
    return table;
}

function objToTable(o) {
    let table = '<table class="table" id="table">';
    if (o.length) {
        table += '<tr>';
        for (key in o[0]) {
            table += '<th>' + key + '</th>';
			
        }
        table += '</tr>';
        for (row in o) {
			
            table += '<tr>';
            for (cell in o[row]) {
                table += '<td>' + o[row][cell] + '</td>';
				
            }
			
            table += '</tr>';
			table += '<td class="col-sm-1" style="padding-left: 0px;">' +
					'<button type="submit" class="btn btn-danger"' +
					'onclick="getOrderForm(' + o[row]['CarId'] + ')">Order</button>' +
					'</td>';
        }
    } else {
        table += '<tr>';
        for (key in o) {
			
            table += '<th>' + key + '</th>';
        }
        table += '</tr>';

        table += '<tr>';
        for (key in o) {
            table += '<td>' + o[key] + '</td>';
        }
        table += '</tr>';
    }
	
    table += '</table>';
    return table;
}

function getOrderForm(id) {
	
    document.getElementById("order-car-id").value = id;
    orderForm.style.display = 'block';
  
}

function getRegisterForm(){
    $('#registration').show();
    $('#login').hide();
    
}

function register(){
    let url = 'http://rest-classwork.local/Server/api/users/users/';
    let datas = $('#registrationForm').serializeArray();
	
	let formData = {
            'username': datas[0].value,
            'password': datas[1].value,  
        }
	if (formData.username && formData.password){
	$.post(url, formData, function (data) {

		var obj = $.parseJSON(data);
		if (obj.name) {
			document.getElementById("resultsRegister").innerHTML = "<h3 class='text-success'>" + obj.name + " is successfully registered!</h3>";
			$('#registration').hide();
			//$('#login').show();
		} else { 
			errorMsg = "<p>The name is already used!</p>";
			document.getElementById("errorsRegister").innerHTML = errorMsg;
		}
    }, "text");
	} 
	else {
        let errorMsg="";
        if (!formData.username){
            errorMsg += "<p>The name is empty!</p>";
        } 
		if (!formData.password){
            errorMsg += "<p>The password is empty!</p>";
        }
        document.getElementById("errorsRegisterForm").innerHTML = errorMsg;
    }
}

function getLoginForm(){
    $('#registration').hide();
    $('#login').show();
    
}

function login(){
    let url = 'http://rest-classwork.local/Server/api/users/userslogin/';
	let data = $('#loginForm').serializeArray();
	
	let formData = {
            'username': data[0].value,
            'password': data[1].value,  
        }
		
    $.ajax({
        url: url,
        type: 'POST',
		data: formData,
        dataType: 'json',
        success: function(response) {
			
			if (response) {
			localStorage.setItem("user", JSON.stringify(response));
			var savedUser = JSON.parse(localStorage.getItem("user"));
			
            loginForm.style.display = 'none';
			document.getElementById("login-register").style.display = 'none';
            userInfo.style.display = 'block';
			$('span[name=infoUsername]').text(savedUser.username);
			} else {
				errorMsg = "<p>The wrong password or username!</p>";
				document.getElementById("errorsLogin").innerHTML = errorMsg;
			}
        }
     });
}

function logout(){
    	 localStorage.clear();
		 userInfo.style.display = 'none';
		 loginForm.style.display = 'none';
		 document.getElementById("login-register").style.display = 'block';
}

function sendToken(){
	let url = 'http://rest-classwork.local/Server/api/orders/token/';
	let savedUser = JSON.parse(localStorage.getItem("user") || '{}');
	let formData = {
		'token': savedUser.token		
	}
	var msg = $.ajax({type: "POST", url: url, dataType: 'text', data: formData, async: false}).responseText;

	var obj = $.parseJSON(msg);
	//console.log(msg);
	if (obj === null) {
		return false;
	} else {
		
		return obj;
	}	
}

function getOrderList() {
    
	let token = sendToken();
	console.log(token);
	if (token) {
		let formData = {
			'userid': token.userid		
		}
		let url = 'http://rest-classwork.local/Server/api/orders/orderlist/';
		$.post(url, formData, function (data) {
		console.log(formData);
		console.log(data);
		var obj = $.parseJSON(data);
		
		let table = objToOrderTable(obj);
		let html = table;
		
		orderDetails.innerHTML = html;
		}, "text");
	} else {
		errorMsg = "<p>Please register or login to get list cars!</p>";
        document.getElementById("errorsGetOrderForm").innerHTML = errorMsg;
	}
}

function objToOrderTable(o) {
    let table = '<table class="table" id="table">';

    if (o) {
		
        table += '<tr>';
        for (key in o[0]) {
            table += '<th>' + key + '</th>';
			
        }
        table += '</tr>';
        for (row in o) {
			
            table += '<tr>';
            for (cell in o[row]) {
                table += '<td>' + o[row][cell] + '</td>';
				
            }
			
            table += '</tr>';

        }
    } else {
		errorMsg = "<p>No yet cars!</p>";
        document.getElementById("errorsGetOrderForm").innerHTML = errorMsg;
    }
	
    table += '</table>';
    return table;
}

function find() {
	let datas = $('#findForm').serializeArray();
	console.log(datas);
	let formData = {
            'brand': datas[0].value,
            'model': datas[1].value,  
			'capacity': datas[2].value, 
			'year': datas[3].value, 
			'colour': datas[4].value, 
			'speed': datas[5].value,
			'price': datas[6].value,
        }
	if (formData.year) {
		let url = 'http://rest-classwork.local/Server/api/carshop/findcars/';
		$.post(url, formData, function (data) {
		console.log(formData);
		console.log(data);
		var obj = $.parseJSON(data);
		
		let table = objToFindOrderTable(obj);
		let html = table;
		
		findDetails.innerHTML = html;
		}, "text");
	} else {
		errorMsg = "<p>The year field is required!</p>";
		document.getElementById("errorsFind").innerHTML = errorMsg;
	}
}

function objToFindOrderTable(o) {
    let table = '<table class="table" id="table">';

    if (o) {
		
        table += '<tr>';
        for (key in o[0]) {
            table += '<th>' + key + '</th>';
			
        }
        table += '</tr>';
        for (row in o) {
			
            table += '<tr>';
            for (cell in o[row]) {
                table += '<td>' + o[row][cell] + '</td>';
				
            }
			
            table += '</tr>';

        }
    } else {
		errorMsg = "<p>No cars!</p>";
        document.getElementById("errorsFindCarForm").innerHTML = errorMsg;
    }
	
    table += '</table>';
    return table;
}
