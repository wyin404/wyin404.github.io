var arr = ["#39a7c5", "#3996c5", "#39b0c5", "#39a2c5", "#398fc5", "#3986c5", "#3976c5", "#396cc5"];
var idx = 0;
function changeColor() {
    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark') {
        document.getElementById("site-name").style.textShadow = arr[idx] + " 0 0 20px";
        document.getElementById("site-title").style.textShadow = arr[idx] + " 0 0 20px";
        document.getElementById("site-subtitle").style.textShadow = arr[idx] + " 0 0 20px";
        document.getElementsByClassName("author-info__name")[0].style.textShadow = arr[idx] + " 0 0 15px";
        document.getElementsByClassName("author-infi__description")[0].style.textShadow = arr[idx] + " 0 0 15px";
        idx++;
        if (idx == 8) {
            idx = 0;
        }

    } else {
        document.getElementById("site-name").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        document.getElementById("site-title").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        document.getElementById("site-subtitle").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        document.getElementsByClassName("author-info__name")[0].style.textShadow = "";
        document.getElementsByClassName("author-infi__description")[0].style.textShadow = "";
    }
}

window.setInterval(changeColor, 1200)