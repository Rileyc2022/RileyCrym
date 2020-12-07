$(function () {
var count = 0;
var current = 0;

    $('#ip').on('keyup', function (e) {

        // console.log($(this).val(),$('#port').val())
        shouldSend($(this).val(), $('#port').val())
    })
    $('#port').on('keyup', function (e) {

        // console.log($('#ip').val(),$(this).val())
        shouldSend($('#ip').val(),$(this).val())
    })
    function shouldSend(ip, port){
        if(ip.length > 0 && port.length > 0){
            // console.log(`shouldSend(${ip}, ${port})`)
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
        // console.log("sent")
        console.log("Sent" + count)
        $.get('/compsci/port', parameters, function (data) {
            console.log("Received" + data.count)
            current++;
            if(data.count >= current && noneEmpty()){
                $('#results').html(data.results);
                $('#port-copy').html(port)
                $('#ip-copy').html(ip)
                $('#success-message').css("display", "block")
                $('#waiting-message').css("display", "none")
                if(data.results == "open"){
                    $('#results').removeClass("closed")
                    $('#results').addClass("open")
                }
                if(data.results == "closed"){
                    $('#results').removeClass("open")
                    $('#results').addClass("closed")
                }
            }
            console.log(data, parameters, current)
        });
    }
    function noneEmpty(){
        if($('#ip').val().length > 0 && $('#port').val() > 0){
            return true;
        }
        return false;
    }
    function reset(){
        $('#port-copy').html("")
        $('#ip-copy').html("")
        $('#success-message').css("display", "none")
        $('#waiting-message').css("display", "block")
    }
});