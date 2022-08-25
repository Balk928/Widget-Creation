function executeWidgetCode() {
    require(["UWA/Drivers/jQuery",
    "DS/Tree/TreeDocument",
    "DS/Tree/TreeNodeModel",
    "DS/TreeModel/DataModelSet",
    "DS/DataGridView/DataGridView",
	"DS/Windows/ImmersiveFrame"], 
    function($, TreeDocument,
        TreeNodeModel,
        DataModelSet,
        DataGridView,
        WUXImmersiveFrame) {
        var myWidget = {
            dataFull: [],
            displayData: function() {
				
                var html = "<h1>Data Grid Format</h1>"; 
				
				widget.body.innerHTML=html ;

                var data = [{
                    "Text": "WebUX",
                    "Number": 20,
                    "Custom_field1": 20,
                    "Custom_field2": "#7faac2"
                  },
                  {
                    "Text": "WebAfr",
                    "Number": 40,
                    "Custom_field1": 10,
                    "Custom_field2": "#005686"
                  },
                  {
                    "Text": "DS",
                    "Number": 72,
                    "Custom_field1": 30,
                    "Custom_field2": "#3d3d3d"
                  },
                  {
                    "Text": "3DS",
                    "Number": 82,
                    "Custom_field1": 40,
                    "Custom_field2": "#E87B00"
                  },
                  {
                    "Text": "Exalead",
                    "Number": 70,
                    "Custom_field1": 90,
                    "Custom_field2": "#EA4F37"
                  },
                  {
                    "Text": "SolidWorks",
                    "Number": 252,
                    "Custom_field1": 80,
                    "Custom_field2": "#477738"
                  },
                  {
                    "Text": "CATIA",
                    "Number": 525824,
                    "Custom_field1": 60,
                    "Custom_field2": "#0087A3"
                  },
                  {
                    "Text": "V5",
                    "Number": 527825,
                    "Custom_field1": 70,
                    "Custom_field2": "#8F4C00"
                  },
                  {
                    "Text": "3DEXPERIENCE",
                    "Number": 8787587,
                    "Custom_field1": 50,
                    "Custom_field2": "#844138"
                  }
                ];
            
                //COLUMNS SETTINGS
                var cols = [{
                    "text": "Text",
                    "dataIndex": "Text"
                  },
                  {
                    "text": "Number",
                    "dataIndex": "Number"
                  },
                  {
                    "text": "Custom field 1",
                    "dataIndex": "Custom_field1",
                    "typeRepresentation": "progress"
                  },
                  {
                    "text": "Custom field 2",
                    "dataIndex": "Custom_field2",
                    "typeRepresentation": "color"
                  }
                ];
            
            
                //Create the node object used as model
                var dataModelSet = new DataModelSet();
            
                // Create the model for the DataGridView
                var model = new TreeDocument({
                  dataModelSet: dataModelSet
                });
            
                model.prepareUpdate();
            
            
                //Create the nodes of the model
                for (var i = 0, len = data.length; i < len; i++) {
                  var nodeData = data[i];
                  var aNode = TreeNodeModel.createTreeNodeDataModel(dataModelSet, {
                    label: nodeData.text,
                    grid: nodeData
                  });
                  model.addChild(aNode);
                }
            
                model.expandAll();
            
                model.pushUpdate();
            
                // Create the DataGridView
                var dataGridView = new DataGridView({
                  treeDocument: model,
                  columns: cols,
                  defaultColumnDef: { //Set default settings for columns
                    "width": "auto",
                    "typeRepresentation": "string"
                  }
                });
                
                 var immersiveFrame = new WUXImmersiveFrame();
                immersiveFrame.setContentInBackgroundLayer(dataGridView.getContent());
                immersiveFrame.reactToPointerEventsFlag = false;
            
                immersiveFrame.inject(widget.body);
				
            },
            onLoadWidget: function() {
                myWidget.displayData();
            },
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
    });
}