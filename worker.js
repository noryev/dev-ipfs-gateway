addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request))
})

async function fetchAndApply(request) {
  // Extract the CID from the request URL path.
  const cid = new URL(request.url).pathname.slice(1);

  if (!cid) {
    return new Response('Invalid request. Please provide a CID.', { status: 400 });
  }

  // Construct the IPFS gateway URLs using the CID.
  const gatewayUrls = [
    `https://w3s.link/ipfs/${cid}`,
    `https://cloudflare-ipfs.com/ipfs/${cid}`,
   // `https://ipfs.filebase.io/ipfs${cid}`, - It seems as if they have settings that make this unallowable!
 //   `https://fleek.io/ipfs/${cid}`,
  //  `https://filebase.io/ipfs/${cid}`
  ];

  // Modify this section to add custom headers to each fetch request
  const customHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };
  const responses = gatewayUrls.map(url => fetch(url, { method: 'GET', headers: customHeaders }));

  try {
    // Using Promise.race to get the fastest response
    const fastestResponse = await Promise.race(responses);

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
