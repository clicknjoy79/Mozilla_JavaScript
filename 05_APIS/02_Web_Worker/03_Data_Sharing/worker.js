postMessage("I\'m working before postMessage(\'ali\')");

onmessage = function(e) {
    postMessage("Hi " + e.data);
}