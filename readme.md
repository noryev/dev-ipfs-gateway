# Racing IPFS Gateways using Cloudflare Workers[Development Only]
- Technically a type of Forward Proxy Gateway/API

## Instructions

Throw this code into a worker.js file into a Cloudflare Worker and boom! Working Racing Gateway! 

Here is an example you can use to see if the proxy gateway is working https://gateway-racing-cc74.deanlaughing.workers.dev/QmZh5s7e4d4kS815aJutJgnm1scQjZdn6sgxjPF8AAJBKm

The files with 'web-worker' within the filename are dedicated to another Racing Gateway that has asynchronysis requests to the multiple gateways instead of doing a simpler version of "racing". 
