stock_ticker = ""; 
today_date="";

function Clear() {
    document.getElementById("error").innerHTML="";
    document.getElementById("tab-section").innerHTML="";
    document.getElementById("outlookTable").innerHTML="";
    document.getElementById("summaryTable").innerHTML="";
    document.getElementById("chart-graph").innerHTML="";
    document.getElementById("news").innerHTML="";
}

function myFunction() {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if(xhttp.readyState==4 && xhttp.status ==200) {
            var stock_tiker_time = JSON.parse(xhttp.response);
            stock_ticker = stock_tiker_time[0]; 
            today_date = stock_tiker_time[1]
            var valid_input = stock_tiker_time[2];
            document.getElementById("input").value = stock_ticker;
            if (valid_input == "no") {
                document.getElementById("error").innerHTML = "<p>Error: No record has been found, please enter a valid symbol.</p>"; 
                document.getElementById("tab-section").innerHTML="";
                document.getElementById("outlookTable").innerHTML="";
                document.getElementById("summaryTable").innerHTML="";
                document.getElementById("chart-graph").innerHTML="";
                document.getElementById("news").innerHTML="";

            }
            else {
                document.getElementById("error").innerHTML="";
                document.getElementById("outlookTable").style.display = "block"
                document.getElementById("summaryTable").style.display = "none"
                document.getElementById("chart-graph").style.display = "none"
                document.getElementById("news").style.display = "none"
                generateTab();
                document.getElementById("outlookTable").innerHTML="";
                document.getElementById("summaryTable").innerHTML="";
                document.getElementById("chart-graph").innerHTML="";
                document.getElementById("news").innerHTML="";
                request_info(stock_ticker, request_type="outlook", loadFunc=loadOutlook);
                request_info(stock_ticker, request_type="summary", loadFunc=loadSummary);
                request_info(stock_ticker, request_type="chart", loadFunc=loadChart);
                request_info(stock_ticker, request_type="news", loadFunc=loadNews);
            }
        }
    }
    xhttp.open("GET", "/api/stockName?symbol="+document.getElementById("input").value);
    xhttp.send();
};

function request_info(stock_ticker, request_type, loadFunc){ //pass loadFunc as var
    let stock_request = new XMLHttpRequest(); //function variable
    stock_request.onreadystatechange = function()
    {
        if(stock_request.readyState==4 && stock_request.status ==200) {
            var response_obj = JSON.parse(stock_request.responseText); // convert to json
            loadFunc(response_obj);
        }
    }
    stock_request.open("GET", "/api/"+request_type+"?symbol="+stock_ticker);
    stock_request.send();
}

function loadOutlook(response) 
{
    html = ["<table>", "<tr>", "<td class=\"firstwidth\">"];
    html.push
    //company name
    html.push("Company Name");
    html.push("</td>");
    html.push("<td class=\"secwidth\">");
    html.push("&nbsp;");
    html.push(response.name);
    html.push("</td>");
    html.push("</tr>");
    //ticker symbol
    html.push("<tr>")
    html.push("<td>");
    html.push("Stock Ticker Symbol");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    html.push(response.ticker);
    html.push("</td>");
    html.push("</tr>");

    //stock exchange code
    html.push("<tr>")
    html.push("<td>");
    html.push("Stock Exchange Code");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    html.push(response.exchangeCode);
    html.push("</td>");
    html.push("</tr>");
    //company start date
    html.push("<tr>")
    html.push("<td>");
    html.push("Company Start Date");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    html.push(response.startDate);
    html.push("</td>");
    html.push("</tr>");

    //description
    html.push("<tr>")
    html.push("<td>");
    html.push("Description");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    html.push(response.description);
    html.push("</td>");
    html.push("</tr>");
    html.push("</table>");
    document.getElementById("outlookTable").innerHTML = html.join("");
}

function loadSummary(response) 
{
    response = response[0];
    html = ["<table>", "<tr>", "<td>"];
    html.push
    //Stock Ticker Symbol
    html.push("Stock Ticker Symbol");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.ticker != null) html.push(response.ticker);
    html.push("</td>");
    html.push("</tr>");
    //Trading Day
    html.push("<tr>")
    html.push("<td>");
    html.push("Trading Day");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.timestamp != null) {html.push(response.timestamp.substring(0,10));}
    html.push("</td>");
    html.push("</tr>");
    //Previous Closing Price
    html.push("<tr>")
    html.push("<td>");
    html.push("Previous Closing Price");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.prevClose != null) html.push(parseFloat(response.prevClose));
    html.push("</td>");
    html.push("</tr>");
    //Opening Price
    html.push("<tr>")
    html.push("<td>");
    html.push("Opening Price");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.open != null) html.push(parseFloat(response.open));
    html.push("</td>");
    html.push("</tr>");

    //High Price
    html.push("<tr>")
    html.push("<td>");
    html.push("High Price");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.high != null) html.push(parseFloat(response.high));
    html.push("</td>");
    html.push("</tr>");

    //Low Price
    html.push("<tr>")
    html.push("<td>");
    html.push("Low Price");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.low != null) html.push(parseFloat(response.low));
    html.push("</td>");
    html.push("</tr>");

    //Last Price
    html.push("<tr>")
    html.push("<td>");
    html.push("Last Price");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.last != null) html.push(parseFloat(response.last));
    html.push("</td>");
    html.push("</tr>");
    
    //Change
    var change = parseFloat(response.last) - parseFloat(response.prevClose);
    html.push("<tr>")
    html.push("<td>");
    html.push("Change");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.last != null) {
        html.push(change.toFixed(2));
        if (change >0) {
            html.push("<img src=\"https://csci571.com/hw/hw6/images/GreenArrowUp.jpg\"></img>")
        }
        if (change <0) {
            html.push("<img src=\"https://csci571.com/hw/hw6/images/RedArrowDown.jpg\"></img>")
        }
    }
    html.push("</td>");
    html.push("</tr>");
    

    //Change Percent
    var change_percent = (change/parseFloat(response.prevClose))*100;
    html.push("<tr>")
    html.push("<td>");
    html.push("Change Percent");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.last != null) {
        html.push(parseFloat(change_percent.toFixed(2))+"%");
        if (change_percent >0) {
            html.push("<img src=\"https://csci571.com/hw/hw6/images/GreenArrowUp.jpg\"></img>")
        }
        if (change_percent <0) {
            html.push("<img src=\"https://csci571.com/hw/hw6/images/RedArrowDown.jpg\"></img>")
        }
    }
    html.push("</td>");
    html.push("</tr>");

    //Number of Shares Traded
    html.push("<tr>")
    html.push("<td>");
    html.push("Number of Shares Traded");
    html.push("</td>");
    html.push("<td>");
    html.push("&nbsp;");
    if(response.volume != null) html.push(response.volume);
    html.push("</td>");
    html.push("</tr>");
    html.push("</table>");
    document.getElementById("summaryTable").innerHTML = html.join("");
}

function loadNews(response) {
    var i;
    var html = [""];
    for (i=0; i<response.length && i<5; i++) { //get first 5 stories
        var title = response[i].title;
        var imageUrl = response[i].urlToImage;
        var date = response[i].publishedAt.substring(0,10);
        var origLink = response[i].url;
        var s = `    <div class = "news-section">
                        <div class="news-pic">
                            <img src="` + imageUrl +`" , alt="photo">
                        </div>
                        <div class="news-text">
                            <p id ="news-content"><b>`+ title +`</b> <br> 
                            `+date+` <br><a href="`+origLink+`" target="_blank">See Original Post</a></p>
                        </div>
                    </div>`
        html.push(s);
    }
    document.getElementById("news").innerHTML = html.join(""); 
}

function loadChart(response) 
{
    var price_series = [];
    var volume_series = [];

    var i = 0;
    for (i = 0; i<response.length; i++) //iterate through daily data
    {
        var close_price = response[i].close;
        var volume = response[i].volume;
        var date_string = response[i].date.substring(0,10);
        var date = Date.parse(date_string);
        if (date_string!=null) 
        {
            price_series.push([date, close_price]);
            volume_series.push([date, volume]);
        }
    };
    var upperStock = stock_ticker.toUpperCase();
    // Create the chart
    Highcharts.stockChart('chart-graph', {

        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 7,
                text: '7d'
            }, {
                type: 'day',
                count: 15,
                text: '15d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }],
            selected: 5,
            inputEnabled: false
        },

        title: {
            text: 'Stock Price ' + upperStock + " " + today_date,
        },

        subtitle: {
            useHTML: true,
            text: '<a href="https://api.tiingo.com/" target="_blank">Source: Tiingo</a>',
        },

        yAxis: [
            {
                title: {
                    text: 'Stock Price'
                },
                opposite:false,
                labels: {
                    align: 'right'
                }
                
            },
            {
                title: {
                    text: 'Volume'
                },
                opposite:true,
                labels: {
                    align: 'left'
                }
            }
        ],

        series: [{
            name: 'Stock Price',
            data: price_series,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        }, {
            name: 'Volume',
            pointWidth: 3,
            data: volume_series,
            type: 'column',
            color: "#3D3D3D",
            yAxis: 1,
            threshold: null,
            tooltip: {
                valueDecimals: 0
            },
        }],
    });
}



function generateTab() {
    document.getElementById("tab-section").innerHTML = `
    <button class="tablinks active" onclick="openTab(event, 'outlookTable')">Company Outlook</button>
        <button class="tablinks" onclick="openTab(event, 'summaryTable')">Stock Summary</button>
        <button class="tablinks" onclick="openTab(event, 'chart-graph')">Charts</button>
        <button class="tablinks" onclick="openTab(event, 'news')">Latest News</button>`
}

function openTab(event, sectionName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(sectionName).style.display = "block";
    event.currentTarget.className += " active";
}