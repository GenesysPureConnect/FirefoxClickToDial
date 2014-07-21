require("sdk/tabs").on("ready", init);
var ClientTitle = "Interaction Client";

function isWebClientRunning(){
    var tabs = require('sdk/tabs');
    var webClientIsRunning = false;

    for each (var tab in tabs){
        if (tab.title === ClientTitle)
        {
            webClientIsRunning = true;
        }
    }

    return webClientIsRunning;
}

function init(tab) {
    var self = require("sdk/self");

    worker = tab.attach({
        contentScriptFile: [ self.data.url("common.js"),
        self.data.url("jquery-1.6.1.min.js"),
        self.data.url("jqueryNoConflict.js"),
        self.data.url("inin-jquery-extensions.js"),
        self.data.url("ClickToDial.js")],
        contentScript:['ININ.ClickToDial.Core.SetIsWebClientRunning('+ isWebClientRunning() + ');',
        'ININ.ClickToDial.Core.Initialize(document);'
        ]

    });

    //We will listen to a callto event from the page, then find the webclient page and use it to handle
    //making the call.
    worker.port.on("callto", function(number) {
        console.log('place call:' + number);

        var tabs = require("sdk/tabs");
        for each (var tab in tabs){
            if (tab.title === ClientTitle)
            {
                tab.attach({
                    contentScript: ["document.getElementById('myInteractionsPanel_makeCallComboBox_selection').value = '"+ number +"';",
                    "document.getElementById('myInteractionsPanel_makeCallButton').removeAttribute('disabled');",
                    "setTimeout(function(){document.getElementById('myInteractionsPanel_makeCallButton').click()}, 2000);"
                    ]
                });
            }
        }

    });
}
