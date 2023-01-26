# Leto.gg(gateway.leto.gg) 

> A caching layer built for the leto metrics engine(this repo currently is using the configuration built by NFT.Storage)

This repo was originally written by the team at NFT.Storage. Big thanks to them for making this project possible!

## Getting started

This configuration is not recommended for any production enviroment, just as a testbed for api workings within the project leto.gg
- get an ec2 server on AWS! dont loose your pem key
- configure your networks inbound and outbound rules within your EC2 Security Group(dont mess this up lol)
- install IPFS(Kubo is what I used)
- get your services setup(run the ipfs daemon and check the badbits registry on start automatically)
    you will also need to setup a service for gunicorn(to connect your networking from the EC2 server to the outside wrld)
- configure your api(I am using flask but I will probably change that very soon)
- tie the gateway to a domain name

Setup system services to startup upon rb
