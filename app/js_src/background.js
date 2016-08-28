var links = new Array();
var counts = new Array();

function getCookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
    if (results)
        return ( unescape(results[2]) );
    else
        return null;
}

var period = 60 * 60 * 1000;

function loadList() {
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://www.softomate.net/ext/employees/list.json", true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var loaded = xhr.responseText;
                var parse1 = JSON.parse(loaded);


                var fly = JSON.stringify(parse1);
                var date = new Date(new Date().getTime() + period);
                document.cookie = "list=" + fly + "; path=/; expires=" + date.toUTCString();
                document.cookie = "date=" + Now;
                for (var i = 0; i < parse1.length; i++) {
                    var k = 0;
                    for (var j = 0; j < links.length; j++) {
                        if (parse1[i] == links[j]) {
                            k++;
                        }
                    }
                    if (k == 0) {
                        links[links.length] = parse1[i];
                        counts[counts.length] = 0;
                    }
                }
                setTimeout(loadList, period);
            }
        };
        xhr.send();
    }
    catch (err) {
        alert("Отсутствует интернет");
    }
}

var cookieList = getCookie("list");

if (cookieList == null) {
    loadList();
} else {
    var cookieDate = getCookie("date");
    var Now = new Date().getTime();
    var Interval = cookieDate + period - Now;
    setTimeout(loadList, Interval);
}


// Отвечаем на запросы от страниц
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var str = "";
        for (var i = 0; i < links.length; i++) {
            if (request.greeting.indexOf(links[i].name) > -1) {
                if (counts[i] < 3) {
                    str = links[i].message;
                } else {
                    str = "0";
                }
                counts[i] = counts[i] + 1;
                sendResponse({farewell: str});
            }
        }
        if (request.greeting == "close") {


            for (var i = 0; i < links.length; i++) {
                if (sender.tab.url.indexOf(links[i].name) > -1) {
                    counts[i] = 4;
                    sendResponse({farewell: "Closed"});
                }
            }
            sendResponse({farewell: "goodbye"});
        }

    });

