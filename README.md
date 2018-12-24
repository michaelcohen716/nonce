# Nonce

*Nonce is a ticketing and collectible dApp (decentralized app) powered by the Ethereum blockchain. This document catalogs the ideation, planning and development process and will evolve as the project progresses.*

## **Stage 0: Config** 
There are two key issues with the vast majority of dApps:

- The **friction** of interacting with the Ethereum network
- The **cost** of transacting on the Ethereum network

**Friction** 
The typical dApp architecture requires users to interact with Ethereum using a browser extension like MetaMask, which acts as a bridge to the network. Because internet users have been conditioned to interact with the web seamlessly -- and because most internet users are ignorant of the underlying protocol -- a dApp built in the MetaMask model is unlikely to break through with non-technical users. 

**Cost**
Every change of state registered on the Ethereum main chain -- big or small -- costs ether. That means that a dApp user is paying a few cents every time they 'like' or 'post'. The high cost of micro-interactions lends to a poor user experience and is a clear barrier to mainstream adoption.

...

With these challenges well understood, there are several projects in the Ethereum ecosystem developing "Layer 2" solutions that abstract away the role of the network while mitigating the cost. 

Nonce implements [Loom Network's PlasmaChain](https://medium.com/loom-network/deploying-your-first-app-to-loom-plasmachain-installing-loom-setting-up-your-environment-and-b04aecfccf1f), a sidechain built on top of the Ethereum main chain, where the transactions are nearly frictionless and the marginal cost approaches zero. PlasmaChain also offers an implementation of Plasma Cash, an approach to the challenge of securely moving cryptoassets on and off the main network. 

Configuring Loom required downloading a local client, running a few initialization commands and pulling Loom test tokens off the development faucet.

In addition to Loom, Nonce uses a conventional Truffle/React project setup for smart contract and UI code management. 

*...continued*