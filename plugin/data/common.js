/*
Root "namespace" object for all ININ JavaScript. It's main purpose is to be a container for other
objects so as not to pollute the global namespace with our objects.
*/

(function () {
    if (typeof ININ === "undefined") {
        ININ = {};
    }

    // Follows the same namespace requirements as the C# specification
    var __validNamespaceRegExp = /^(@?[a-z_A-Z]\w+(?:\.@?[a-z_A-Z]\w+)*)$/;

    function isExistingNamespace(ns) {
        return (typeof (ns) === 'object') && ns.__isNamespace;
    }

    function isNonNamespaceObject(ns) {
        return (typeof (ns) !== 'undefined') && !ns.__isNamespace;
    }

    ININ.__isNamespace = true;
    ININ.__typeName = 'ININ';

    /*
    Registers a namespace to use as a container for JavaScript. Typically the root namespace
    will be the this object (ININ) but that is not a requirement.

    This function is adapted from the "registerNamespace" function in the "Type" class in the
    ASP.NET AJAX core JavaScript library.
    */
    ININ.registerNamespace = function (namespacePath) {

        if (!namespacePath || namespacePath.search(__validNamespaceRegExp) === -1) {
            throw 'Invalid namespace!';
        }

        var namespaceParts = namespacePath.split('.');
        var rootObject = window;

        for (var i = 0; i < namespaceParts.length; i++) {

            var currentNsString = namespaceParts[i];
            var fullyQualifiedNsString = namespaceParts.slice(0, i + 1).join('.');
            var currentNsObj = rootObject[currentNsString];

            if (!isExistingNamespace(currentNsObj)) {
                if (isNonNamespaceObject(currentNsObj)) {
                    throw 'Invalid operation! Namespace already contains non-namespace object: ' + fullyQualifiedNsString;
                }

                // We've verified there is no existing namespace or current object with the
                // desired name, so we'll go ahead and create a new one, assigning it to the
                // current root object.
                currentNsObj = {
                    __isNamespace: true,
                    __typeName: fullyQualifiedNsString
                }
                rootObject[currentNsString] = currentNsObj;
            }

            rootObject = currentNsObj;
        }
    };
} ());

ININ.registerNamespace('ININ.Utils');

ININ.Utils.generateRandomId = function () {
    var id = '';
    while (id.length < 16) id += String.fromCharCode(((!id.length || Math.random() > 0.5) ?
    0x61 + Math.floor(Math.random() * 0x19) : 0x30 + Math.floor(Math.random() * 0x9)));
    return id;
}
