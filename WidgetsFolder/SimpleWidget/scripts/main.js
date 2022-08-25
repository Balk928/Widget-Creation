function executeWidgetCode(){
    require(["UWA/Drivers/jQuery"],function($){
        var myWidget = {
            displayData:function(){
                widget.body.innerHTML = "<br/><br/>"+"<h2>User Name :"+widget.getPreference("userName").value+"</h2>"+"<br/><br/>"+
                "<h2>User Account Status is :" + widget.getValue("3DExpAccountCheck")+"</h2>"+"<br/><br/>"+
                "<h2>User Role is : "+ widget.getValue("userRole") +"</h2>"+"<br/><br/>"+
                "<h2> User Location is :"+widget.getValue("userLocation")+"</h2>"+"<br/><br/>"+
                "<h2>User Job Level is:" +widget.getValue("limit")+ "</h2>"+"<br/><br/>"+
                "<h2>User Date of Birth is: "+widget.getValue("userDOB")+"</h2>"+"<br/><br/>"; 
            },
            onLoad:function(){
                widget.addPreference({
                    name:"userLocation",
                    type:"text",
                    label:"User Location",
                    defaultValue:""
                });
                widget.addPreference({
                    name:"userDOB",
                    type:"hidden",
                    label:"User Date of Birth",
                    defaultValue:""
                });
                myWidget.displayData();
            }
        }
        widget.addEvent("onLoad",myWidget.onLoad);
    });
}