
const urlBus = 'https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes';
const headersSent = {
  'Content-Type':'application/json',
  'Accept': 'application/json',
  'x-api-key': 'Yrk3AZ1yOT7PIBbWJNrkB541cLBnff5w6cSZH9qr'
};

$(document).ready(function() {
  retrieveRouteData()
});

function deleteRoute() {
  $('#deleteModal').modal('toggle')
  let urlBusDelete = urlBus + '/' + $('#deleteRouteId').val()

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlBusDelete,
    "method": "DELETE",
    "headers": headersSent
  }

  $.ajax(settings).done(function (response) {
    $("#inicioDeTabla").empty();
    retrieveRouteData();
  });
  resetValuesModal();
}

function createRoute() {
  let newRouteInformation = {
    "id": $("#createFormId").val(),
    "origin_id": $("#createFormOrigin").val(),
    "destination_id": $("#createFormDestination").val(),
    "departure_time": $("#createFormDeparture").val(),
    "arrival_time": $("#createFormArrival").val(),
    "company_name": $("#createFormCompany").val()
  }
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlBus,
    "method": "POST",
    "headers": headersSent,
    "processData": false,
    "data": JSON.stringify(newRouteInformation)
  }

  $.ajax(settings).done(function (response) {
    $("#inicioDeTabla").empty()
    retrieveRouteData();
  });

  resetValuesModal();
}

function resetValuesModal() {
  $("#createFormId").val("")
  $("#createFormOrigin").val("");
  $("#createFormDestination").val("");
  $("#createFormDeparture").val("");
  $("#createFormArrival").val("");
  $("#createFormCompany").val("");
  $("#deleteRouteId").val("");
}

function retrieveRouteData() {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlBus,
    "method": "GET",
    "headers": headersSent
  }

  $.ajax(settings).done(function (response) {
    let informationToShow = response.data.routes.map((elem, index) => {
      return makingTable(elem, index);
    })
  });
}

function makingTable(elem, index) {
  let secuence = index + 1;
  console.log(elem.id)
  elem.id = (elem.id === "[object Undefined]") ? elem.id = "Sin registro" : elem.id
  let step = $('#inicioDeTabla');
  let tableContent = '<tr><td scope="row">' + secuence + '</td>';
  tableContent += '<td>' + elem.id + '</td>';
  tableContent += '<td>' + elem.company_name + '</td>';
  tableContent += '<td>' + elem.arrival_time + '</td>';
  tableContent += '<td>' + elem.departure_time + '</td>';
  tableContent += '<td>' + elem.origin_id + '</td>';
  tableContent += '<td>' + elem.destination_id + '</td><tr>';
  step.append(tableContent);
}

