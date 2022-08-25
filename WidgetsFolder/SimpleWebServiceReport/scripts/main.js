function executeWidgetCode(){
    require(["UWA/Drivers/jQuery",
    "DS/3DXHighcharts/3DXHighcharts",
    "DS/PlatformAPI/PlatformAPI",
    "DSISWidgetModules/Connector3DSpace"
    ],function($,Highcharts,PlatformAPI,Connector3DSpace){
        var myWidget = {
            datafull:[],
            displayData:function(arrData){
                var tableHTML="<div id='chart' style='height:100%;overflow:auto;'></div>";
                widget.body.innerHTML=tableHTML;
                
                // Count Obj by key value
                var keyToUse = widget.getValue("catKey");//Can be a comma separated list of multiple keys
                var resMap = {};
                for(var i=0; i< arrData.length; i++){
                    var obj=arrData[i];
                    var valCategorie="";
                    
                    var arrKeys=keyToUse.split(".");
                    for(var j=0; j < arrKeys.length; j++){
                        var singleKey=arrKeys[j];
                        valCategorie+=(valCategorie.length>=1 ? ", " : "")+obj[singleKey];
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
                                    console.log("Select Data");
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
                
                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'chart',
                        plotBackgroundColor:null,
                        plotBorderWidth: null,
                        plotShadow: true,
                        type: 'pie',
                        options3d: {
                            enabled: true,
                            alpha: 45
                        }
                    },
                    credits:{
                        enabled: true,
                        text: "3DSpace Data",
                        href: "#"
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
                            size:"70%"
                        }
                    },
                    series: [{
                        name: 'Type',
                        colorByPoint: true,
                        data: outSeriesData
                    }]
    
                });
                
            },
            onload:function(){
                var wdgUrl = widget.getUrl();
                wdgUrl=wdgUrl.substring(0, wdgUrl.lastIndexOf("/"));
                widget.setIcon(wdgUrl+"/assets/icons/Chart.png");
                
                myWidget.callData();
                
            
                
                myWidget.displayData(myWidget.dataFull);
            },
            callData:function(){
                var opts = {
                    url: "/WebTools/service",
                    method: "GET",
                    type: "json",
                    data: {
                        "type": widget.getValue('typeObj'),
                        "selects": widget.getValue("selects"),
                        "nlscurrent":widget.getValue("nlscurrent")
                    },
                
                    onComplete: function (dataResp){
                        if(dataResp.msg==="OK"){
                            myWidget.dataFull=dataResp.data;
                            myWidget.displayData(myWidget.dataFull);
                            //console.log(myWidget.dataFull);
                        }
                    },
                };
                Connector3DSpace.call3DSpace(opts)
            }
        };
        widget.addEvent("onLoad",myWidget.onload);
        widget.addEvent("onRefresh",myWidget.onload);
    });
}