var stock_request = new XMLHttpRequest(); 
stock_request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
stock_request.open("GET", "books.xml", true); // asynchronous 
function myFunction(xml) {
    var xmlDoc = xml.responseXML; document.getElementById("demo").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
}