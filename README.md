The click to call plugins will turn phone numbers on web pages into clickable links. When clicking the links,
the callto: uri is called for external applications like the desktop Interaction Client to handle.
 It can also use the web client to dial numbers if it is running in another tab.

Running locally
===============
A rakefile has been included to assist in packaging and testing the plugin.  The Mozilla cfx tool is needed for it to work, it can be downloaded here https://developer.mozilla.org/en-US/Add-ons/SDK/Tools/cfx

The default rake script will create a xpi in the bin folder.  Using 'rake run' will compile the xpi and launch a new instance of FireFox with the Add-on already loaded. 
