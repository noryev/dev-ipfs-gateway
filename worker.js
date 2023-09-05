addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request));
});

async function fetchAndApply(request) {
  // Extract the CID from the request URL path.
  const cid = new URL(request.url).pathname.slice(1);
  
  if (!cid) {
    return new Response('Invalid request. Please provide a CID.', { status: 400 });
  }
  
  const gatewayUrls = [
    `https://w3s.link/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
    `https://dweb.link/ipfs/${cid}`,
    `https://ipfs.io/ipfs/${cid}`,
    // Add or remove other gateways as needed
  ];
  
  const customHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };

  const fetchPromises = gatewayUrls.map(url => 
    fetch(url, { method: 'GET', headers: customHeaders }).then(response => {
      if (response.ok) return response;
      throw new Error('Not a valid response.');
    })
  );

  try {
    // Using Promise.race to get the fastest successful response
    const fastestResponse = await Promise.any(fetchPromises);

    // Return the fastest response
    return new Response(fastestResponse.body, {
      status: fastestResponse.status,
      statusText: fastestResponse.statusText,
      headers: fastestResponse.headers
    });
  } catch (error) {
    return new Response('Error fetching from IPFS gateways.', { status: 500 });
  }
}