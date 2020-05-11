# FlightSurety

FlightSurety is a sample real-world application project for Udacity's Blockchain course.

## Goal

The goal of this  DApp (Decentralized application) is to create a transparent, automated flight delay insurance policy. No more talking to the agent and filing claims. You will get paid as soon as the flight is landed, if the delay is caused by to the airline. Since there is no third party (the insurance company) involved, we can lower the cost and the increase the payout. The current implementation is just a prototype. But it shows the potential of dapp in insurance industry.

## Implementation

### Smart Contracts

The smart contracts are written in Solidity and developed using truffle framework. The data layer and the application layer are split to insure upgradability. The contracts are designed to allow interactions with the following three entities. All functions are protected with modifiers to only allow specific entities to call the functions.


#### Airlines
1.	Provide initial funding to the contract.
2.	Introduce new airlines to contract. If there are more than four participating airlines, a multiparty consensus of more than 50% airlines is required to add a new airline. Only funded airlines have the right to vote.
3.	Add future flight for passengers to purchase insurance for. 

#### Oracles(Data source to provide flight delay information)
1.	Register itself to participate the contract.
2.	Submit response when the flight status is requested.
3.	A random response will be selected to create trustless oracles.

#### Passengers
1.	Purchase insurance for a flight.
2.	Get credit if the insured flight is late due to airline.
3.	Check balance of the credit they received.
4.	Withdraw the balance.

### Web Application
A web app is created for the passengers to interact with the smart contract.
It is developed using node.js and webpack.

### Server
A web server is created simulate the oracle response.
It is developed using node.js, express and webpack.



## Install

This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS) and server app scaffolding.

To install, download or clone the repo, then:

`npm install`
`truffle compile`

## Develop Client

To run truffle tests:

`truffle test ./test/flightSurety.js`
`truffle test ./test/oracles.js`

To use the dapp:

`truffle migrate`
`npm run dapp`

To view dapp:

`http://localhost:8000`

## Develop Server

`npm run server`
`truffle test ./test/oracles.js`

## Deploy

To build dapp for prod:
`npm run dapp:prod`

Deploy the contents of the ./dapp folder


## Resources

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)
