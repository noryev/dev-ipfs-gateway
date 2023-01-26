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

## Bad-Bits Denylist Script for automated removal

    #!/bin/bash

    # specify the path to the default IPFS storage directory
    IPFS_STORAGE_DIR="~/.ipfs"

    # specify the deny-list file containing the CIDs of the files to be removed
    DENY_LIST_FILE="deny-list.json"

    # read the deny-list file
    CIDS=$(jq -r '.[]' $DENY_LIST_FILE)

    # loop through the CIDs in the deny-list file
    for CID in $CIDS; do
    # run the ipfs pin rm command to remove each CID
    ipfs pin rm $CID
    
- NOTE: Script Accessibility(you need to make sure the script can read the bad-bits file in regards to the filesystem the bad-bits.json file. 
done

