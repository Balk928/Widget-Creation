function executeWidgetCode(){
    require(["UWA/Drivers/jQuery","DS/DataGridView/DataGridView", 
    "DS/Windows/ImmersiveFrame", "DS/Tests_DataGridView/spec/Tests_DataGridView_Utils"],
        function($,WUXDataGridView, WUXImmersiveFrame, DataGridViewUtils){
            var myWidget = {

                displayData:function(){
                    var html = "<h1>Data is Shown in Range</h1>";
                    widget.body.innerHTML = html;

                    var mainObject = {
                        data: undefined, // Will contains raw data of nodes
                        model: undefined, // Will contains the TreeDocument object
                        view: undefined, // Will contains the DataGridView object
                        columns: undefined, // Will contains the columns definition
                      };
                  
                      var options = {
                        dataTypeRepresentation: "string",
                        rowNumberByLeafNode: 50,
                        columnNumber: 10,
                        leftPinnedColumnNumber: 1,
                        rightPinnedColumnNumber: 1,
                        treeDepth: 2,
                        numberOfNodesByDepthLevel: 4
                      };
                  
                      DataGridViewUtils.generateTreeDocument(mainObject, options);
                  
                      // Create the DataGridView
                      var myDataGridView = new WUXDataGridView({
                        identifier: "myDataGridViewId",
                        treeDocument: mainObject.model,
                        columns: mainObject.columns,
                        defaultColumnDef: { //Set default settings for columns
                          width: 150,
                          minWidth: 40,
                          editableFlag: true
                        },
                      });
                  
                      var immersiveFrame = new WUXImmersiveFrame({
                        reactToPointerEventsFlag: false
                      });
                      immersiveFrame.setContentInBackgroundLayer(myDataGridView.getContent());
                  
                      immersiveFrame.inject(document.body);
                      myDataGridView.onReady(function() {
                        myDataGridView.ensureNodeModelVisible(myDataGridView.model[100]);
                      });
                    
                  
                },
                onload:function(){
                    myWidget.displayData();
                }
            };
            widget.addEvent("onLoad",myWidget.onload);
        }
    );
}