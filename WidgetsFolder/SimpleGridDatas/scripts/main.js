function executeUpdateCode(){
    require([ "UWA/Core",
    "DS/TreeModel/TreeDocument",
    "DS/TreeModel/TreeNodeModel",
    "DS/DataGridView/DataGridView"],
    function(Core, TreeDocument, TreeNodeModel, WUXDataGridView){
        var myWidget = {
            displayData:function(){
                var currentMonth = new Date().getMonth(), currentYear = new Date().getFullYear();
                var data = [{
                    "Name": "Clara",
                    "Type": ["Project Space"],
                    "PriceRange": [],
                            "Duration" : [],
                            "Duration": [new Date().setMonth(currentMonth+1), new Date().setFullYear(currentYear+1)]
                  },
                  {
                    "Name": "Karl",
                    "Type": ["Germany"],
                    "State": "Draft",
                    "Duration" : [],
                            "StartDate": [new Date().setMonth(currentMonth+1), new Date().setFullYear(currentYear+1)]
                  },
                  {
                    "Name": "Mario",
                    "Type": undefined,
                    "State": "Draft",
                    "Duration" : [],
                    "State": [new Date().setMonth(currentMonth+5)]
                  },
                  {
                    "Name": "Andrew",
                    "Type": undefined,
                    "State": "Draft",
                    "Duration" : [],
                            "StartDate": []
                  },
                  {
                    "Name": "Rafael",
                    "Type": undefined,
                    "State": "Draft",
                    "Duration" : [],
                            "StartDate": []
                  },
                  {
                    "Name": "Johann",
                    "Type": undefined,
                    "State": "Draft",
                    "Duration" : [],
                    "StartDate": []
                  }
                ];
            
                // Columns definition
                var columns = [{
                    dataIndex: "tree",

                    text: "Name",
                          width: 100,
                  },
                  {
                    dataIndex: "Type",
                    text: "Type",
                    typeRepresentation: "string",
                    editionPolicy: "EditionOnOver",
                    getCellSemantics: function(cellInfos) {
                      return {
                        possibleValues: ["Project Space", "Task", "Phase", "Gate"],
                        allowMultipleValuesFlag: true
                      };
                    }
                  },
                  {
                    dataIndex: "State",
                    text: "State",
                    typeRepresentation: "string",
                    editionPolicy: "EditionOnOver",
                    getCellSemantics: function(cellInfos) {
                        return {
                          possibleValues: ["Draft", "In Work", "In Approval", "Completed"],
                          allowMultipleValuesFlag: true
                        };
                      }     
                    
                  }, {
                            dataIndex: "Duration",
                    text: "Duration",
                    typeRepresentation: "boundedNumber",
                    editionPolicy: "EditionOnOver",
                    getCellSemantics: function(cellInfos) {
                        return {
                                      minValue: 0,
                                      maxValue:1500,
                                      stepValue:1,
                          allowMultipleValuesFlag: false
                        };
                    }
                        },
                        {
                        dataIndex: "NextHolidays",
                        text: "Next Holidays",
                        typeRepresentation: "date",
                        editionPolicy: "EditionOnOver",
                        getCellSemantics: function(cellInfos) {
                                               return {
                                       allowMultipleValuesFlag: true
                        };
                    }
                        }
                ];
            
                // Create the model for the DataGridView
                var model = new TreeDocument();
            
                model.prepareUpdate();
            
                //Create the nodes of the model
                for (var i = 0, len = data.length; i < len; i++) {
                  var nodeData = data[i];
                  var aNode = new TreeNodeModel({
                    label: nodeData.Name, // The Label is used in the "tree" column
                    grid: nodeData
                  });
                  model.addChild(aNode);
                }
            
                model.expandAll();
            
                model.pushUpdate();
            
                // Create the DataGridView
                var dataGridView = new WUXDataGridView({
                  identifier: "AutoCompleteInDataGridViewId",
                  treeDocument: model,
                  columns: columns,
                  defaultColumnDef: { //Set default settings for columns
                    width: 200,
                    minWidth: 40,
                    editableFlag: true
                  }
                });
            
                dataGridView.inject(widget.body);
            },
            onload:function(){
                myWidget.displayData();
            }
        }

        widget.addEvent("onLoad",myWidget.onload);
    });
}