// web-worker.js

const gateways = [
    'https://w3s.link/ipfs/${cid}',
    'https://cloudflare-ipfs.com/ipfs/${cid}',
    'https://dweb.link/ipfs/${cid}',
    'https://ipfs.io/ipfs/${cid}',
  ];
  
  let completed = false;
  
  self.addEventListener('message', event => {
    const ipfsCID = event.data;
  
    gateways.forEach(gatewayURL => {
      fetch(`${gatewayURL}${ipfsCID}`)
        .then(response => {
          // If a valid response and we haven't completed the race yet
          if (response.ok && !completed) {
            completed = true;
            return response.text();  // or response.json() if it's a JSON
          }
          throw new Error('Not a valid response or race already completed.');
        })
        .then(data => {
          // Send the data back to the main thread
          self.postMessage(data);
        })
        .catch(error => {
          // Handle the error if needed
          console.error('Error fetching from', gatewayURL, error);
        });
    });
  });
  