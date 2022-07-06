#!/bin/bash

cd deployments

rm -rf "1258188407"
# rm -rf "80001"
# rm -rf "81"
 
cd ../

npx hardhat run --network "1258188407" ./scripts/deploy/mylilius.ts
# npx hardhat run --network "81" ./scripts/deploy/network.ts
# npx hardhat run --network "80001" ./scripts/deploy/network.ts