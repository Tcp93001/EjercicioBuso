$( document ).ready(function() {
  retrieveRouteData()
});

function createRoute() {
  console.log("ready");
}

function delete_route() {
  console.log("ok");
}

function retrieveRouteData() {
  $.ajax({
    url: 'https://0sysjslkra.execute-api.us-east-1.amazonaws.com/test/routes',
    headers: {
      'Content-Type':'application/json',
      'Accept': 'application/json',
      'x-api-key': 'Yrk3AZ1yOT7PIBbWJNrkB541cLBnff5w6cSZH9qr'
    },
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
  elem.id = ((elem.id).length == 1) ? elem.id = "Sin registro" : elem.id
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
