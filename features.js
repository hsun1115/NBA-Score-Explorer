// var Str='SELECT A, F WHERE E= "'+id+'"label F "'+id+'"';
// function checkVisitor() {
//
//     var v = document.getElementById("visitor").value;
//     if(v==="0"){
//         Str='SELECT A, F WHERE E= "'+team1+'"label F "'+team1+'"';
//     }else if(v==="1"){
//         Str='SELECT A, D WHERE C= "'+id+'"label D "'+id+'"';
//     }else if(v==="2"){
//         Str='SELECT A, F, D WHERE C= "'+id+'" or E = "'+id+'"label D "'+id+'"';
//     }
// }
function drawGID(){
    var queryString = encodeURIComponent(Str);

    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString);
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var options = {
        title: id,
        curveType: 'none',
        legend: {position: 'bottom', label: id},
        pointSize: 5
    };
    var data = response.getDataTable();

    // function changeType() {
    //var flag = true;
    //flag = document.getElementById("changeType").value;
    if (flag === false) {
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }else if(flag===true){
        var table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, options);
    }
}



function multiCharts() {
    team1 =document.getElementById("mySelect").value;
    team2 =document.getElementById("mySelect2").value;

    var ready = [false, false];
    // create an array to hold the DataTables
    var dataArray = [];

    function handleQueryResponse(response, index) {
        if (response.isError()) {
            alert('Error in query ' + index + ': ' + response.getMessage() + ' ' + response.getDetailedMessage());
            return;
        }
        ready[index] = true;
        dataArray[index] = response.getDataTable();
        var allReady = true;
        // check if all the queries have returned
        for (var i = 0; i < ready.length; i++) {
            if (!ready[i]) {
                allReady = false;
                break;
            }
        }
        if (allReady) {
            var options = {
                title: 'Multi-Charts',
                curveType: 'none',
                legend: {position: 'bottom'},
                series: {
                    0: { color: '#e2431e' },
                    1: { color: '#000000' },
                    2: { color: '#f1ca3a' },
                    3: { color: '#6f9654' },
                    4: { color: '#800080' },
                    5: { color: '#43459d' },
                },
                pointSize: 5
            };
            var formatter = new google.visualization.DateFormat({pattern: "MM/dd/yy"});
            formatter.format(dataArray[0], 0);
            formatter.format(dataArray[1], 0);
            //formatter.format(dataArray[2], 0);

            var edata = new google.visualization.data.join(dataArray[0], dataArray[1], 'full', [[0, 0]], [1], [1]);
           // var res = new google.visualization.data.join(edata, dataArray[2], 'full', [[0, 0]], [1,2], [1]);
            formatter.format(edata, 0);
            //formatter.format(res, 0);

             //tables[0] = new google.visualization.Table(document.getElementById('table_div0'));
             //tables[0].draw(dataArray[0]);
            if(flag === true) {
                var tables = [];
                tables[1] = new google.visualization.Table(document.getElementById('table_div'));
                tables[1].draw(edata, options);
            }


            // charts[0] = new google.visualization.LineChart(document.getElementById('visualization0'));
            // charts[0].draw(dataArray[2], options);
            if (flag === false){
                var charts = [];
                charts[1] = new google.visualization.LineChart(document.getElementById('chart_div'));
                charts[1].draw(edata, options);
            }
        }
    }
    if(HV===false){
        var queryString0 = encodeURIComponent('SELECT A, F WHERE E= "'+team1+'"label F "'+team1+'"');
        var queryString1 = encodeURIComponent('SELECT A, F WHERE E= "'+team2+'"label F "'+team2+'"');
        var query0 = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString0);
        var query1 = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString1);
        //var query2 = new google.visualization.Query(
        //   'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString2);
        query0.send(function (response) {
            handleQueryResponse(response, 0);
        });
        query1.send(function (response) {
            handleQueryResponse(response, 1);
        });
    }else if(HV===true){
        var queryString2 = encodeURIComponent('SELECT A, F WHERE E= "'+team1+'"label F "'+team1+' Home"');
        var queryString3 = encodeURIComponent('SELECT A, D WHERE C= "'+team1+'"label D "'+team1+' Visitor"');
        var query2 = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString2);
        var query3 = new google.visualization.Query(
            'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString3);
        //var query2 = new google.visualization.Query(
        //   'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString2);
        query2.send(function (response) {
            handleQueryResponse(response, 0);
        });
        query3.send(function (response) {
            handleQueryResponse(response, 1);
        });
    }
    //var queryString2 = encodeURIComponent('SELECT A, D WHERE C="Golden State Warriors"');
    // var query0 = new google.visualization.Query(
    //     'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString0);
    // var query1 = new google.visualization.Query(
    //     'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString1);
    // //var query2 = new google.visualization.Query(
    //  //   'https://docs.google.com/spreadsheets/d/1FlQ5efRYsxrIjQSjfl26B4TaEs4-SM_XRpNZe5efiog/gviz/tq?tq=' + queryString2);
    // query0.send(function (response) {
    //     handleQueryResponse(response, 0);
    // });
    // query1.send(function (response) {
    //     handleQueryResponse(response, 1);
    // });
    // query2.send(function (response) {
    //     handleQueryResponse(response, 2);
    // });
}
function Customizeplot() {

    var array=[];

    var stringArray = document.getElementById('text-area').value.split('\n');
    for(var i=0;i<stringArray.length;i++) {
        array.push(stringArray[i].split(" "));
    }
    for(var x=0;x<array.length;x++){
        for(var y=0;y<array[0].length;y++){
            array[x][y]=parseInt(array[x][y]);
        }
    }

    //console.log(array);
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Y');
    data.addColumn('number', 'X');
    data.addRows(array);
    //console.log("OK");
    var options = {
        title: 'X-Y Plot',
        curveType: 'none',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
    //google.charts.setOnLoadCallback(Customizeplot);
}