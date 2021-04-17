$(function () {
var count = 0;
var current = 0;

    $('#ip').on('keyup', function (e) {
        shouldSend($(this).val(), $('#port').val())
    })
    $('#port').on('keyup', function (e) {
        shouldSend($('#ip').val(),$(this).val())
    })
    function shouldSend(ip, port){
        if(ip.length > 0 && port.length > 0){
            port = parseInt(port, 10)
            count++;
            send(ip, port)
            return true;
        }
        reset()
        return false;
    }
    function send(ip, port){
        var parameters = {
            ip: ip,
            port: port,
            count: count,
        };
        $.get('/tools/networking/open-port-check/port', parameters, function (data) {
            current++;
            if(data.count >= current && noneEmpty()){
                if(data.results.startsWith("invalid")){
                    $('#not-valid-message').css("display", "block")
                    $('#success-message').css("display", "none")
                    $('#waiting-message').css("display", "none")
                    if(data.results.endsWith("ip")){
                        $('#not-valid-message').html("Not a valid IP or hostname")
                    }
                    if(data.results.endsWith("port")){
                        $('#not-valid-message').html("Not a valid port")
                    }
                }
                else{
                    $('#not-valid-message').css("display", "none")
                $('#results').html(data.results);
                $('#port-copy').html(port)
                $('#ip-copy').html(ip)
                $('#waiting-message').css("display", "none")


                    $('#success-message').css("display", "block")
                    if(data.results == "open"){
                        $('#results').removeClass("closed")
                        $('#results').addClass("open")
                    }
                    if(data.results == "closed"){
                        $('#results').removeClass("open")
                        $('#results').addClass("closed")

                    }
                }


            }
        });
    }
    function noneEmpty(){
        if($('#ip').val().length > 0 && $('#port').val().length > 0){
            return true;
        }
        return false;
    }
    function reset(){
        $('#port-copy').html("")
        $('#ip-copy').html("")
        $('#success-message').css("display", "none")
        $('#not-valid-message').css("display", "none")
        $('#waiting-message').css("display", "block")
    }
});