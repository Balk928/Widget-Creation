function executeWidgetCode() {
    require(["UWA/Drivers/jQuery"], 
    function($) {
        var myWidget = {
            dataFull: [],
            displayData: function() {
				var html = "<h2>Auto Number Generator</h2>"+
                            "<table id='Usecase'><tr>"+
                            "<div class='heading'><th>Report Type</th><th>Filter Criteria</th><th>How do you want Report</th><th>Report Status</th>"+
                            "</tr>"+
                            "<tr id='first'>"+
                            "<td>Part Report</td><td>Generates all Part Report</td>"+
                            "<td><input type='checkbox' name='box' value='Download'><label>Download</label>"+"<br/>"+
                              "<input type='checkbox' name='box' value='Mailback'><label>Mailback</label>"+
                            "</td></tr>"+
                            "<tr id='second'>"+
                            "<td>Detailed Part Report</td>"+
                            "<td id='Name'><label>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><input type='text' name='uname' require/>"+
                            "<br/>"+
                            "<label>Revision:&nbsp;&nbsp;</label><input type='text' name='revision' require/>"+
                            "</td><td>"+
                            "<input type='checkbox' name='box' value='Download'><label>Download</label>"+"<br/>"+
                            "<input type='checkbox' name='box' value='Mailback'><label>Mailback</label>"+
                            "</td></tr>"+
                            "<tr id = 'third'>"+
                            "<td>ALL Part Report</td><td>Part Report with attributes</td><td></td>"+
                            "<td><button type='submit'>Downloaded Report</button></td>"+
                            "</tr></table>";
				widget.body.innerHTML = html;

                $(document).ready(function(){
                  $('')
                });
            },
            onLoadWidget: function() {
                myWidget.displayData();
            },
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
    });
}