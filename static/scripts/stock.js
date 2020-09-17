class stock {
    constructor() {
        this.tikr = "AAPL";
    }

    Start() {
        this.RetreiveTikr();
        $("#symbol").on("click", function () {
            $(this).val("");
        })
    }

    RetreiveTikr() {
        var that = this;
        $.ajax({
            url: "/quote?symbol=" + that.symbol,
            method: "GET",
            cache: false
        }).done(function (data) {

            // set up a data context for just what we need.
            var context = {};
            context.shortName = data.shortName;
            context.symbol = data.symbol;
            context.price = data.ask;

            if (data.quoteType = "MUTUALFUND") {
                context.price = data.previousClose
            }

            // call the request to load the chart and pass the data context with it.
            that.LoadChart(context);
        });
    }
}

