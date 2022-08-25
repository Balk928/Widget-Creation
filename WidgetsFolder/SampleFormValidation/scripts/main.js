function executeWidgetCode() {
    require(["UWA/Drivers/jQuery"], 
    function($) {
        var myWidget = {
            dataFull: [],
            displayData: function() {
				
                var html = "<div class='center'>"+
                             "<h1>Login</h1>"+
                              "<form method='post'>"+
                               "<div class='txt_field'>"+
                                "<input type='text' require>"+
                                
                                 "<label>UserName</label>"+
                                 
                                "</div>"+
                                "<div class='txt_field'>"+
                                "<input type='password' require>"+
                                 "<label>Password</label>"+
                                "</div>"+
                                "<input type='submit' value='Login'>"+
                                "<div class='signup_link'>"+
                                "Not a member ? <a href='#'>Signup</a>"+
                                "</div>"+
                                "</form>"+
                                "</div>";
				widget.body.innerHTML = html;
            },
            onLoadWidget: function() {
                myWidget.displayData();
            },
        };

        widget.addEvent("onLoad", myWidget.onLoadWidget);
    });
}