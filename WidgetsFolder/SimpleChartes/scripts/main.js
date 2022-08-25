function executeWidgetCode(){
    require([
        "UWA/Drivers/jQuery",
        "DS/3DXHighcharts/3DXHighcharts",
        "DS/PlatformAPI/PlatformAPI",
        "DSISWidgetModules/Connector3DSpace"
    ], function(
        $,
        Highcharts,
        PlatformAPI,
        Connector3DSpace
    ){
        var myWidget = {
            dataFull: [
            ],
            
            displayData: function(arrData){
                
                var showData=widget.getValue("showData");
                var tableHTML="";
                
                if(showData=="true"){
                    tableHTML="<div style='height:50%;overflow:auto;'><table><thead><tr>";
                    
                    var obj1=arrData[0];
                    for(var keyObj in obj1){
                        tableHTML=tableHTML+"<th>"+keyObj+"</th>";
                    }
                    tableHTML=tableHTML+"</tr></thead><tbody>";
                    
                    for(var i=0; i<arrData.length; i++){
                        tableHTML=tableHTML+"<tr>";
                        for(var keyObj in obj1){
                            tableHTML=tableHTML+"<td>"+arrData[i][keyObj]+"</td>";
                        }
                        tableHTML=tableHTML+"</tr>";
                    }
                    
                    tableHTML+="</tbody></table></div><div id='chart' style='height:50%;overflow:auto;'></div>";
                    
                }else{
                    tableHTML+="<div id='chart' style='height:100%;overflow:auto;'></div>";
                }
                
                widget.body.innerHTML=tableHTML;
                
                //Count Obj by key value
                var keyToUse = widget.getValue("catKey");//Can be a comma separated list of multiple keys
                var resMap = {};
                for(var i=0; i< arrData.length ; i++){
                    var obj=arrData[i];
                    var valCategorie="";
                    
                    var arrKeys=keyToUse.split(",");
                    for(var j=0; j < arrKeys.length; j++){
                        var singleKey=arrKeys[j];
                        valCategorie=valCategorie+(valCategorie.length>=1 ? ", " : "")+obj[singleKey];
                    }
                    
                    var objCat=resMap[valCategorie];
                    if(typeof objCat==="undefined"){
                        objCat={
                                nbInCat:1,
                                arrIds:[obj.id]
                        };
                    }else{
                        objCat.nbInCat=objCat.nbInCat+1;
                        objCat.arrIds.push(obj.id);
                    }
                    resMap[valCategorie]=objCat;
                }
            
                
                var outSeriesData=[];
                for(var keyCat in resMap){
                    var valCat=resMap[keyCat].nbInCat;
                    var categorie={
                            name:keyCat,
                            y: valCat,
                            arrIdsCat: resMap[keyCat].arrIds,
                            events:{
                                select: function(){
                                    //console.log("Select Data");
                                    //console.log(this);
                                    PlatformAPI.publish("Select_Ids", {"widgetId":widget.id,"ids":this.arrIdsCat});
                                },
                                unselect: function(){
                                    //console.log("Unselect Data");
                                    PlatformAPI.publish("Select_Ids", {"ids":[]});
                                }
                            }
                    };
                    outSeriesData.push(categorie);
                }
                //console.log(outSeriesData);
                
                var chartTitle=widget.getValue("chartTitle");
                widget.setTitle(chartTitle);
                var objTitle4Chart={
                        text:""
                };
                if(widget.getValue("dispChartTitle")==="true"){
                    objTitle4Chart={
                            text: chartTitle
                    }
                }
                
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    credits:{
                        enabled: true,
                        text: "3DSpace Data",
                        href: "#"
                    },
                    exporting:{
                        enabled: false
                    },
                    navigation:{
                        enabled: false
                    },
                    title: objTitle4Chart,
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> - {point.y} objects'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            },
                            size:"85%"
                            /*startAngle : -120,
                            endAngle : 120*/
                        }
                    },
                    series: [{
                        name: 'Type',
                        colorByPoint: true,
                        data: outSeriesData
                    }]
    
                });
                
            },
            
            selectIds: function(dataSelect){
                var wdgId=dataSelect.widgetId;
                if(widget.id===wdgId)return;//Ignore event when it's coming from the widget itself
                
                //console.log("selectIds...");
                var arrIds=dataSelect.ids;
                //console.log(arrIds);
                
                if(arrIds.length>=1){
                    var arrFiltered=[];
                    var arrToFilter=myWidget.dataFull;
                    
                    for(var i=0; i < arrToFilter.length; i++){
                        var objToTest=arrToFilter[i];
                        var idObj=objToTest.id;
                        for(var j=0; j < arrIds.length; j++){
                            var idSelected=arrIds[j];
                            if(idSelected===idObj){
                                arrFiltered.push(objToTest);
                                break;
                            }
                        }
                    }
                    
                    //console.log("displayData arrFiltered");
                    //console.log(arrFiltered);
                    myWidget.displayData(arrFiltered);
                    
                    //Add Filter Icon
                    var $divFilter = $("<div id='divFilter'></div>");
                    $divFilter.attr("title", "Data displayed in this chart is being filtered\nClick here to reset filters");
                    var $imgFilter = $("<div class='imgFilter'></div>");
                    $divFilter.append($imgFilter);
                    $("#chart").append($divFilter);
                    
                    $divFilter.on("click", function(){
                        PlatformAPI.publish("Select_Ids", {"ids":[]});
                    });
                }else{
                    //console.log("displayData Full");
                    myWidget.displayData(myWidget.dataFull);
                }
            },
            
            onLoadWidget: function(){
                var wdgUrl = widget.getUrl();
                wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
                widget.setIcon(wdgUrl+"/assets/icons/Chart.png");
                
                myWidget.callData();
                
                PlatformAPI.subscribe("Select_Ids", myWidget.selectIds);
                
                myWidget.displayData(myWidget.dataFull);
            },
            
            onSearchWidget: function(searchQuery){
                var arrResult=[];
                var searchKeys=widget.getValue("searchKeys").split(",");
                
                for(var i=0; i<myWidget.dataFull.length; i++){
                    var objData=myWidget.dataFull[i];
                    for(var j=0; j < searchKeys.length; j++){
                        var searchKey=searchKeys[j];
                        if(objData[searchKey].indexOf(searchQuery)!==-1){
                            arrResult.push(objData);
                            break;
                        }
                    }
                }
                myWidget.displayData(arrResult);
            },
            
            onResetSearchWidget: function(){
                myWidget.displayData(myWidget.dataFull);
            },
            
            callData: function(){
                
                var opts = {
                    url: "/DSISTools/Find",
                    method: "GET",
                    type: "json",
                    data: {
                        "type": widget.getValue('typeObj'),
                        "selects": widget.getValue("selects")
                    },
                
                    onComplete: function (dataResp){
                        if(dataResp.msg==="OK"){
                            myWidget.dataFull=dataResp.data;
                            myWidget.displayData(myWidget.dataFull);
                            //console.log(myWidget.dataFull);
                        }else{
                            widget.body.innerHTML += "<p>Error in WebService Response</p>";
                            widget.body.innerHTML += "<p>"+JSON.stringify(dataResp)+"</p>";
                        }
                    },
                    onFailure: function(error){
                        widget.body.innerHTML += "<p>Call Faillure</p>";
                        widget.body.innerHTML += "<p>"+JSON.stringify(error)+"</p>";
                        console.error("Call Faillure : "+JSON.stringify(error));
                    }
                };
                
                Connector3DSpace.call3DSpace(opts);
                
            }
        };
        
        widget.addEvent("onLoad", myWidget.onLoadWidget);
        widget.addEvent("onRefresh", myWidget.onLoadWidget);
        widget.addEvent("onSearch", myWidget.onSearchWidget);
        widget.addEvent("onResetSearch", myWidget.onResetSearchWidget);
    });
    }
    