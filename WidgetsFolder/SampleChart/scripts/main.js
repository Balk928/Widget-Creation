function executedUpdatedCode(){
    require([
        "UWA/Drivers/jQuery",'DS/W3DXComponents/Views/GraphView'
    ], function(
        $,GraphView
    ){
        var myWidget = {   
            displayData: function(){

                var html = "<h1>Phase Wise Project Health</h1>";
                widget.body.innerHTML = html;
                new GraphView({
                    custoClass: 'my-chart',
                    
                    subtitle: 'a subtitle',
                    type: GraphView.TYPE_COLUMN,
                    xAxis: {
                        title:'Project Phase Shown Here',
                        categories: ['Phase1', 'Phase2', 'Phase3', 'Phase4','Phase5'],
                    },
                    yAxis: {
                        title: 'Task Count'
                    },
                    series: [{
                        name: 'Phases',
                        data: [99,98,98,98,98],
                        stack: 'stackA'
                    },{
                        name:'Gates',
                        data:[2,1,1,1,1],
                        stack:'stackA'
                    }]
                }).render().inject(widget.body);
            },
            
            onLoadWidget: function(){
                
                myWidget.displayData();
            },
          
            
        };
        
        widget.addEvent("onLoad", myWidget.onLoadWidget);
       
    });
    }
    