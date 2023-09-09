let gatewaddr = '';

function setGatewayAddress() {
    gatewayaddr = document.getElementById('gatewayAddr').value;
    if (!gatewayaddr) {
        alert("Please provide a valid gateway address.");
        return;
    }
}