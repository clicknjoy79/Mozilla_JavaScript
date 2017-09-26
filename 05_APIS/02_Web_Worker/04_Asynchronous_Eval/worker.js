onmessage = function (oEvent) {
    postMessage({
        'id': oEvent.data.id,
        'evaluated': eval(oEvent.data.code)
    });
}