_Nonce is a ticketing, content and collectible dApp (decentralized app) powered by the Ethereum blockchain. The project is intended to be a flexible vehicle for offchain benefits or rewards, e.g., permissioned and verifiable access to events, content or collectibles. This document catalogs the ideation, planning and development process and will evolve as the project progresses._

<p align="center">
  <img src="./src/assets/readme/provisional-logo.png" width="550px" /> 
</p>

# **Table of Contents**

0. [ Ethereum Config ](#eth-config)
1. [ Implementing ERC721X Token Standard](#erc721x)
2. [ Front End Config](#frontend-config)
3. [ Authentication and Identity Management](#auth)

<a name="eth-config"></a>
## **Stage 0: Ethereum Config**

There are two key issues with the vast majority of dApps:

- The **friction** of interacting with the Ethereum network
- The **cost** of transacting on the Ethereum network

**Friction**

The typical dApp architecture requires users to interact with Ethereum using a browser extension like MetaMask, which acts as a bridge to the network. Because internet users have been conditioned to interact with the web seamlessly -- and because most internet users are ignorant of the underlying protocol -- a dApp built in the MetaMask model is unlikely to break through with non-technical users.

**Cost**

Every change of state registered on the Ethereum main chain -- big or small -- costs ether. That means that a dApp user is paying a few cents every time they 'like' or 'post', for example. The high cost of micro-interactions lends to a poor user experience and is a clear barrier to mainstream adoption.

...

With these challenges well understood, there are several projects in the Ethereum ecosystem developing "Layer 2" solutions that abstract away the role of the network while mitigating the cost.

Nonce is being developed on [Loom Network's PlasmaChain](https://medium.com/loom-network/deploying-your-first-app-to-loom-plasmachain-installing-loom-setting-up-your-environment-and-b04aecfccf1f), a sidechain built on top of the Ethereum main chain, where the transactions are nearly frictionless and the marginal cost approaches zero. Beyond the efficiency benefits, PlasmaChain offers an implementation of Plasma Cash, an approach to the challenge of securely moving cryptoassets on and off the main network.

![Loom](./src/assets/readme/loom-network.jpg)

Configuring Loom required downloading a local client, running a few initialization commands and pulling Loom test tokens off the development faucet.

In addition to Loom, Nonce uses a conventional Truffle project setup for smart contract and UI code management.

<p align="center">
  <img src="./src/assets/readme/truffle.png" width="450px" /> 
</p>

<a name="erc721x"></a>
## **Stage 1: Applying Loom's ERC721x Token Standard**

The bare bones smart contract implementation of Nonce should satisfy the following product specifications:

#### There should be **two types of user**

- **Minters** create tokens and control the supply
- **Patrons** acquire, trade or burn tokens

A generic user can play either role.

#### Minters should be able to mint a unique set of transferable tokens, mapping to an offchain benefit or reward

- The set can be limited or unlimited in quantity
- The minter can set or change the ether price of tokens in their set (it can be free, of course)

#### Patrons should be able to acquire and prove ownership of a portfolio of non-fungible tokens

- The patron can acquire an unclaimed token with a paid or unpaid transaction
- The patron can demonstrate ownership of an asset to the minter, potentially for an offchain benefit or reward
- Future implementation will include a mechanism for trading, spending and/or reselling tokens

#### Pull Requests for this Stage:

- ERC721X infrastructure: [PR #1](https://github.com/michaelcohen716/nonce/pull/1)
- Basic functionality for minting, acquiring tokens: [PR #2](https://github.com/michaelcohen716/nonce/pull/2), [PR #5](https://github.com/michaelcohen716/nonce/pull/5)
- Foundation for future implementation of PlasmaChain gateway: [PR #3](https://github.com/michaelcohen716/nonce/pull/3)
- Testing: [PR #4](https://github.com/michaelcohen716/nonce/pull/4), [PR #5](https://github.com/michaelcohen716/nonce/pull/5)

<a name="frontend-config"></a>
## **Stage 2: Front End Config**

To get started with Loom, the initial Nonce directory cloned the [Truffle Dappchain Example](https://github.com/loomnetwork/truffle-dappchain-example) which uses a conventional React web setup. Nonce also uses Redux for state management.

<p align="center">
    React image
  <img src="./src/assets/readme/redux.png" width="200" style="margin-bottom: -20px" /> 
</p>

#### Pull Requests for this Stage:

- React Native, Typescript setup: [PR #6](https://github.com/michaelcohen716/nonce/pull/6)
- Redux, Linting: [PR #8](https://github.com/michaelcohen716/nonce/pull/8)

<a name="auth"></a>
## **Stage 3: Authentication and Identity Management**
_...continued_