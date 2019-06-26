let results = document.getElementById("results");
let orderForm = document.getElementById("order-form");
let userInfo = document.getElementById("user-info");
let loginForm = document.getElementById("login");
let registrationForm = document.getElementById("registration");

function getCarList() {
    results.style.display = 'block';
    orderForm.style.display = 'none';
    let url = 'api/carshop/.json';
    $.get(url,  function (data) {
        showOnTable(data);
		console.log(data);
    }, "json");
}

function getDetails(id) {
    let url = 'api/carshop/'+id+'/.json';
    $.get(url, function (data) {
        showOnDetails(data)
    }, "json");
}

function searchCars() {
    results.style.display = 'block';
    orderForm.style.display = 'none';
    let url = 'api/cars/.json';
    let formData = {
        'filter': {
            'mark': $('select[name=mark]').val(),
            'model': $('input[name=model]').val(),
            'year': $('input[name=year]').val(),
            'engine': $('input[name=engine]').val(),
            'color': $('select[name=color]').val(),
            'maxspeed': $('input[name=maxspeed]').val(),
            'price': $('input[name=price]').val(),
        },
    };
    $.get(url, formData, function (data) {
        showOnTable(data);
    }, "json");

}

function order() {
    let url = 'api/orders/';
    let formData = {
        'action': 'order',
        'orderData': {
            'idcar': $('input[name=order-car-id]').val(),
            'firstname': $('input[name=name]').val(),
            'lastname': $('input[name=surname]').val(),
            'payment': $('select[name=paytype]').val(),
        }
    };
    if (formData.orderData.firstname && formData.orderData.lastname){
        $.post(url, formData, function (data) {
           orderForm.style.display = 'none';
            results.style.display = 'block';
            if (data['errors']) {
                results.innerHTML = '<h3 class="text-danger">Error: ' + data.errors + '</h3>';
            } else {
                let id = data.id;
                results.innerHTML = "<h3 class='text-success'>The car with id=" + id + " is successfully ordered!</h3>";
            }
        }, "text");
    }else{
        let errorMsg="";
        if (!formData.orderData.firstname){
            errorMsg += "<p>The name is empty!</p>";
        }
        if (!formData.orderData.lastname){
            errorMsg += "<p>The surname is empty!</p>";
        }
        document.getElementById("errorsOrderForm").innerHTML = errorMsg;
    }

}

function getOrderForm(id) {
    document.getElementById("order-car-id").value = id;
    orderForm.style.display = 'block';
    results.style.display = 'none';
}

function login(){
    let url = 'api/users/';

    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        success: function(response) {
            $('span[name=infoUsername]').text(response.username);
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
        }
     });
}

function logout(){
    let url = 'api/users/';

    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: function(xhr){
            xhr.setRequestHeader('HTTP/1.0 401 Unauthorized');
        },
        statusCode: {
            401: function() {
                loginForm.style.display = 'block';
                userInfo.style.display = 'none';
            }
          },
        success: function(response) {
            loginForm.style.display = 'block';
            userInfo.style.display = 'none';
        },
        error: function(response){
            if (response.status==401){
                loginForm.style.display = 'block';
                userInfo.style.display = 'none';
            }
        }
     });
}

function getRegisterForm(){
    $('#registration').show();
    $('#login').hide();
    
}

function register(){
    let url = 'api/users/';
    let formData = $('#registrationForm').serializeArray();
    $.post(url, formData, function (data) {
        $('#registration').hide();
                $('#login').show();
    }, "text");
    // $.ajax({
    //     url: url,
    //     type: 'POST',
    //     data: data,
    //     dataType: 'json',
    //     success: function(response) {
    //         $('#registration').hide();
    //         $('#login').show();
    //     }
    //  });
}

function showOnTable(data) {
    if (data.length != 0) {
        if (data['errors']) {
            results.innerHTML = '<h3 class="text-danger">Error: ' + data.errors + '</h3>';
        } else {
            let table = carsListToTable(data);
            results.innerHTML = table;
        }
    } else {
        results.innerHTML = '<h3>No cars found.</h3>';
    }
    document.getElementById("details").innerHTML = "";
}

function showOnDetails(entry) {
    let t = document.getElementById("details");
    let table = objToTable(entry);
    let html = "<h3>Car details</h3>" + table;
    t.innerHTML = html;
}


function carsListToTable(cars) {
    let table = '<table class="table" id="table">';
    if (cars.length) {
        table += '<tr class="row">';
        table += '<th class="col-lg-1">id</th> <th class="col-lg-4">mark</th> ' +
            '<th class="col-lg-5">model</th> <th class="col-lg-1"></th> <th class="col-lg-1"></th>';
        table += '</tr>';
        for (let i in cars) {
            let id = cars[i]['CarId'];
            table += '<tr class="row">';
            table += '<td class="col-lg-1">' + id + '</td> <td class="col-lg-4">' +
                cars[i]['Brand'] + '</td> <td class="col-lg-5">' + cars[i]['Model'] + '</td>';
            table += '<td class="col-lg-1">' +
                '<button type="submit" class="btn btn-primary"' +
                'onclick="getDetails(' + id + ')">Details</button>' +
                '</td>';
            table += '<td class="col-lg-1">' +
                '<button type="submit" class="btn btn-danger"' +
                'onclick="getOrderForm(' + id + ')">Order</button>' +
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
