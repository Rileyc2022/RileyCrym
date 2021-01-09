
var recents = new Recents()

if(localStorage.hasOwnProperty('recently-used')){
    let retrievedObject = localStorage.getItem('recently-used')
    recents.reBuild(JSON.parse(retrievedObject))
}

recents.add("Open Port Check", timestamp())

localStorage.setItem('recently-used', JSON.stringify(recents.toArray()));


function timestamp(){
    var t = new Date();
    var date = ('0' + t.getDate()).slice(-2);
    var month = ('0' + (t.getMonth() + 1)).slice(-2);
    var year = t.getFullYear();
    var hours = ('0' + t.getHours()).slice(-2);
    var minutes = ('0' + t.getMinutes()).slice(-2);
    var seconds = ('0' + t.getSeconds()).slice(-2);
    var time = `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    return time;
}

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
        $.get('/tools/networking/open-port-check/port', parameters, function (data) {
            console.log("Received" + data.count)
            current++;
            if(data.count >= current && noneEmpty()){
                if(data.results == "invalid"){
                    $('#not-valid-message').css("display", "block")
                    $('#success-message').css("display", "none")
                    $('#waiting-message').css("display", "none")
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
        $('#not-valid-message').css("display", "none")
        $('#waiting-message').css("display", "block")
    }
});