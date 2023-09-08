// utilities for the dedicated gateway add func

let gatewayAddress;

function setGatewayAddress() {
    gatewayAddress = document.getElementById('gatewayInput').value;
    console.log("Gateway address set to:", gatewayAddress);
// Add DNS entry of users assigned gateway address