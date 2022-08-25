function executeWidgetCode(){
    require(["UWA/Drivers/jQuery",'DS/W3DXComponents/Views/GraphView'],function($,Graph){
        var myWidget={
            datafull:[
            //     {"events":[{"subject":"Subject #1111","label":"Event number 1","start":"2015-03-13","end":"","color":"red","a float":"8.2","info":"Test event","owner":"cmi","url":"","icon":"drafted","receivedOrder":3,"id":3,"parent_id":0},{"subject":"Subject #1","label":"Second ponctual event","start":"2015-05-19","end":"","color":"","a float":"7.3","receivedOrder":4,"id":4,"parent_id":0},
            //     {"subject":"Subject #1","label":"Another period","start":"2015-07-16","end":"2015-08-12","color":"green","a float":"6.4","receivedOrder":5,"id":5,"parent_id":0},
            //     {"subject":"Subject #2","label":"A medium period","start":"2015-03-07","end":"2015-06-29","color":"black","a float":"5","info":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","owner":"ok8","url":"https://fr.wiktionary.org/wiki/season","icon":"conceptualized","receivedOrder":7,"id":7,"parent_id":0,"gateDescr":"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en "},
            //     {"subject":"soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.","receivedOrder":8,"id":8,"parent_id":0},
            //     {"subject":"Project #3","label":"Meeting","start":"2015-07-22 15:45:07","end":"2015-07-22 16:05:09","color":"red","a float":"-3.2","info":"","owner":"ldt","url":"https://en.wikipedia.org/wiki/Meeting","icon":"released","receivedOrder":11,"id":11,"parent_id":0,"gateDescr":"GA"}
            // ]}
            ],
            displayData:function(){
                var html = "<h1>Data is Shows</h1>";
                widget.body.innerHTML = html;
                new Graph({
                    
                
                    yAxis: {
                        title: {
                            text: 'Number of Employees'
                        }
                    },
                
                    xAxis: {
                        accessibility: {
                            rangeDescription: 'Range: 2010 to 2017'
                        }
                    },
                
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2010
                        }
                    },
                
                    series: [{
                        name: 'Pending',
                        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                    }, {
                        name: 'Overdue',
                        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    }, {
                        name: 'Late Start',
                        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    }, {
                        name: 'Complete',
                        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    }, {
                        name: 'Other',
                        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }],
                
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                
                }).render().inject(widget.body);
            },

            onload:function(){
                myWidget.displayData();
            }
        };
        widget.addEvent("onLoad",myWidget.onload);
    });
}