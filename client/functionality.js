
const urlBus = 'https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes';
const headersSent = {
  'Content-Type':'application/json',
  'Accept': 'application/json',
  'x-api-key': 'Yrk3AZ1yOT7PIBbWJNrkB541cLBnff5w6cSZH9qr'
};

$( document ).ready(function() {
  retrieveRouteData()
});

function delete_route() {
  $('#deleteModal').modal('toggle')
  let urlBusDelete = urlBus + '/' + $('#deleteRouteId').val()
  // $.ajax({
  //   url: urlBusDelete,
  //   headers: headersSent,
  //   method: 'DELETE',
  //   dataType: 'json',
  //   success: function(data){
    //     console.log(data)
  //     $("#inicioDeTabla").empty()
  //     retrieveRouteData();
  //   },
  //   error: function(err){
    //     console.log(err)
  //   }
  // });
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
  $('#createModal').modal('toggle')
  console.log("sent sent sent");
  // $.ajax({
  //   url: urlBus,
  //   headers: headersSent,
  //   data: JSON.stringify(newRouteInformation),
  //   method: 'POST',
  //   dataType: 'json',
  //   success: function(data){
    //     console.log(data)
  //     $("#inicioDeTabla").empty()
  //     retrieveRouteData();
  //   },
  //   error: function(err){
    //     console.log(err)
  //   }
  // });
  resetValuesModal();
}

function resetValuesModal() {
  $("#createFormId").val("")
  $("#createFormOrigin").val("");
  $("#createFormDestination").val("");
  $("#createFormDeparture").val("");
  $("#createFormArrival").val("");
  $("#createFormCompany").val("");
}

function retrieveRouteData() {
  $.ajax({
    url: urlBus,
    headers: headersSent,
    method: 'GET',
    dataType: 'json',
    success: function(data){
      let informationToShow = data.data.routes.map((elem, index) => {
        return makingTable(elem, index);
      })
    },
    error: function(err){
      console.log(err)
    }
  });
}

function makingTable(elem, index) {
  let secuence = index + 1;
  console.log(elem.id)
  elem.id = (elem.id === "[object Undefined]") ? elem.id = "Sin registro" : elem.id
  let step = $('#inicioDeTabla');
  let tableContent = '<tr><th scope="row">' + secuence + '</th>';
  tableContent += '<td>' + elem.id + '</td>';
  tableContent += '<td>' + elem.company_name + '</td>';
  tableContent += '<td>' + elem.arrival_time + '</td>';
  tableContent += '<td>' + elem.departure_time + '</td>';
  tableContent += '<td>' + elem.origin_id + '</td>';
  tableContent += '<td>' + elem.destination_id + '</td>';
  step.append(tableContent);
}

