function getCookie ( cookie_name ) {
    var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
    if ( results )
        return ( unescape ( results[2] ) );
    else
        return null;
}

var cookieList = getCookie("list");
var cart = JSON.parse (cookieList);
var iList = '';
for (var i = 0; i < cart.length; i++) {
    var unitList = "<li><a class='list' href = 'http://" + cart[i].domain + "' target='_blanc'>" + cart[i].name + "</a></li>";
    iList = iList + unitList;
}
var domain = document.getElementById('domain');
domain.innerHTML = iList;