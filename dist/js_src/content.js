var url = document.location.href;
chrome.runtime.sendMessage({greeting: url}, function (response) {
    if (response.farewell != "") {
        if (response.farewell != "0") {
            var message = response.farewell;
            var body = document.getElementsByTagName("body")[0];
            var html = "<div class='bordmsg' id='msg'><div class='msg'>" + message + "<div class='close'><a>X</a></div></div></div>";
            body.innerHTML = html + body.innerHTML;
            $("div.close a").click(function () {
                $("div.bordmsg").css("visibility", "hidden");
                chrome.runtime.sendMessage({greeting: "close"}, function (response) {
                    console.log(response.farewell);
                });
            });
        }
    }
});



var qw = $("div.f kv _SWb");
//qw.innerHTML = "какая-то херня!!!!!!" + qw.innerHTML;
console.log("1234567890"+qw.html());
//alert( $('._Rm').html() );
$('div.s').html() = "123";
/*
var rm = document.getElementsByTagName("cite")[5];
alert("1234567890"+rm.innerHTML);
console.log("1234567890"+rm.innerHTML);
*/