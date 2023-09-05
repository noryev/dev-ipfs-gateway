// main.js

const worker = new Worker('web-worker.js');

worker.addEventListener('message', event => {
  const content = event.data;
  console.log('Received content:', content);

  // Do something with the content

  // Optionally, you can terminate the worker if you're done with it
  worker.terminate();
});

// Send an IPFS CID to the worker to fetch
worker.postMessage('YOUR_IPFS_CID_HERE');
