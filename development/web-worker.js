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
        if (response.ok && !completed) {
          completed = true;
          return {
            content: response.text(),
            gateway: gatewayURL
          };
        }
        throw new Error('Not a valid response or race already completed.');
      })
      .then(data => {
        self.postMessage(data);
      })
      .catch(error => {
        console.error('Error fetching from', gatewayURL, error);
      });
  });
});