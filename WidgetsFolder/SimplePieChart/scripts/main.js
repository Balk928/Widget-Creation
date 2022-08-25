function executeWidgetCode(){
    require(["UWA/Drivers/jQuery","DS/W3DXComponents/Views/GraphView"],function($,GraphView){

        var myWidget={
            dataFull:[],

            displayData:function(){
                
                var test = "<h1>Project Progress</h1>";
                widget.body.innerHTML = test;
                new GraphView({
                    custoClass: 'my-chart',
                    title: 'my pie chart',
                    type: GraphView.TYPE_PIE,
                    unit: 'km',
                    series: [{
                        data: [
                            ['Completes 0.8%', 0.8],
                            ['In Work 0.6%',0.6],
                            ['Pending 98.6%', 98.6],
                        ]
                    }]
                }).render().inject(widget.body);
            },

            onLoadWidget:function(){
                myWidget.displayData();
            }
        }

        widget.addEvent("onLoad",myWidget.onLoadWidget);
    });
}