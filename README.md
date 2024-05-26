# BlockWhisper
Contributors:
- [itsmeyaw](https://github.com/itsmeyaw)
- [gopimehta](https://github.com/gopimehta)
- [alexhaeringer](https://github.com/alexhaeringer)
- [hashkode](https://github.com/hashkode)

# Table of Contents
1. [Problem Statement](#problem-statement)
2. [Constraints](#constraints)
   - [Anonymity](#anonymity)
   - [Time](#time)
   - [Free of Charge](#free-of-charge)
   - [Decentralized](#decentralized)
3. [How-To](#how-to)
   - [Frontend](#frontend)
   - [Smart Contract](#smart-contract)
   - [Zero-Knowledge-Proof (ZKP) System](#zero-knowledge-proof-zkp-system)
     - [Setup](#setup)
     - [Use](#use)
4. [Design Documentation](#design-documentation)
   - [Concept](#concept)
   - [Challenges](#challenges)
     - [Enable Free Transactions](#enable-free-transactions)
     - [Decentralized Reputation Scoring Without Public Accounts to Ensure Anonymity](#decentralized-reputation-scoring-without-public-accounts-to-ensure-anonymity)
5. [Competing Concepts](#competing-concepts)
   - [A blockchain-based anonymous reporting system with no central authority: Architecture and protocol](#a-blockchain-based-anonymous-reporting-system-with-no-central-authority-architecture-and-protocol)
   - [SecureDrop, GlobaLeaks](#securedrop-globaleaks)
   - [Diss-co](#diss-co)
   - [Paper](#paper)
6. [FAQ](#faq)
   - [What is the matter with anonymous vs. pseudonymous submissions?](#what-is-the-matter-with-anonymous-vs-pseudonymous-submissions)
   - [What is Proof of Human Work (PoHW)?](#what-is-proof-of-human-work-pohw)
   - [Why are externally funded transactions required?](#why-are-externally-funded-transactions-required)
   - [Is it feasible to ensure full anonymity even though the program takes care of my reputation?](#is-it-feasible-to-ensure-full-anonymity-even-though-the-program-takes-care-of-my-reputation)
   - [How do we handle wrong information?](#how-do-we-handle-wrong-information)
   - [How does BlockWhisper protect users from potential retaliation or exposure?](#how-does-blockwhisper-protect-users-from-potential-retaliation-or-exposure)
   - [How does BlockWhisper compare to other platforms like SecureDrop and GlobaLeaks in terms of functionality and security?](#how-does-blockwhisper-compare-to-other-platforms-like-securedrop-and-globaleaks-in-terms-of-functionality-and-security)


## Problem Statement
In today's digital age, privacy and identity crises present significant challenges, particularly within the blockchain space. Despite the promise of decentralization, many systems still expose individuals to risks of identification and retaliation when reporting sensitive information. Existing whistleblowing platforms, such as SecureDrop and GlobaLeaks, primarily cater to individual organizations and do not leverage the potential of blockchain technology to provide a truly decentralized, anonymous, and self-governing reporting system.

BlockWhisper aims to address these gaps by offering a decentralized platform that enables anyone to anonymously share sensitive information without fear of identity exposure, harassment, or legal repercussions. Our platform ensures that no single entity controls the information, thus preventing censorship and promoting transparency.

Keywords: Freedom of speech, Anonymity, Decentralization

## Constraints

### Anonymity
We put a strong emphasis on anonymity. The demo largely revolves around showing how a completely anonymous system can be built to prepare a decentralized, anonymous reputation system.

### Time
Due to time constraints, we left the Proof of Human Work (PoHW) (providing Sybil resistance) as a placeholder, but we see it as a key point to investigate post-hackathon.

### Free of Charge
Users can use a faucet system to fund single-use wallets, thereby effectively enabling free use, while solving the problem of anonymous onramping of user funds, which is very difficult for Ethereum.

### Decentralized
Our platform is fully decentralized, permissionless, free, and censorship-resistant due to its blockchain-native implementation with blockchain storage of submission data and votes.

# How-To

## Frontend
The frontend is a mobile-friendly web application. It interacts with a smart contract, which is deployed on Ethereum. The smart contract serves as the backend.

## Smart Contract
The smart contract is written in Solidity. Interaction happens via exposed calls, similar to any standard smart contract.

## Zero-Knowledge-Proof (ZKP) System

### Setup
Preconditions:
- git installed
- node and npm installed

```shell
mkdir tmp
cd tmp
git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom
circom -V
npm install -g snarkjs
```

### Use
To use the ZKP setup, perform the following steps:

```shell
cd circuit
./run.sh
```

# Design Documentation

## Concept
- BlockWhisper allows individuals to interact on a self-governing and decentralized platform. There, sensitive information can be shared anonymously, potentially addressing political accountability, law enforcement transparency, judicial system oversight, government surveillance and privacy, public service delivery, civil rights, and freedom. The reputation system allows users to trust the platform and enable a collaborative open system.
- Vision: Provide a decentralized platform, accessible to everybody, to anonymously share sensitive information if wrong has been done.
- Wow factor: Our governance of an anonymous feedback loop for sharing sensitive information.

## Challenges
Over the course of the hackathon, we faced a number of challenges. While we managed to address the critical ones, there are some edge cases which are still open for further investigation.

### Enable free transactions
Users should not face the issue of having to acquire ETH anonymously for transaction fee funding.
- https://eips.ethereum.org/EIPS/eip-2711#sponsored-transactions -> withdrawn
- https://eips.ethereum.org/EIPS/eip-3074#another-sponsored-transaction-eip -> draft
- https://eips.ethereum.org/EIPS/eip-4337#paymasters -> draft

Solution: We mimic faucets to fund user accounts, thereby alleviating them from the struggle to onramp anonymously.

### Decentralized Reputation Scoring Without Public Accounts to Ensure Anonymity
The score is implemented as a snapshot, calculated for any new submission and attached to the new submission's data structure by means of a zero-knowledge proof. Herein, we do not prove exact qualities, but rather abstract ones to avoid identity leaks. A proof could be something like "the anon submitted greater than 10 submissions before", "the anon's submissions have a mean reputation (upvotes/(upvotes + downvotes)) greater than 50 percent", "the anon's worst submission has a score greater than 20 percent" or similar. This effectively supports a feedback cycle—mandatory for any kind of self-governing system—without publicly disclosing an identity or even a pseudonym, which links submissions. We employ the technique of hierarchical deterministic wallets to create single-use wallets that mint a soul-bound NFT as proof of authorship (PoA) over a submission.

# Competing concepts

## "A blockchain-based anonymous reporting system with no central authority: Architecture and protocol"
Source: https://www.sciencedirect.com/science/article/pii/S277291842300019X

"To eliminate the central authority, a concept termed the virtual blockchain (VBC) is implemented as an embedded permissioned blockchain within a permissionless blockchain." (from the Abstract)

--> The approach is not open and permissionless.

## SecureDrop, Globaleaks
We are a self-governing rating system on-chain; they offer this to individual organizations and are not blockchain-based.

## Diss-co
Blockchain-enhanced commercial submission software.

## Paper
A blockchain-based anonymous reporting system with no central authority; not permissionless, no voting or reputation.

# FAQ

## What is the matter with anonymous vs. pseudonymous submissions?
Anonymous submissions do not reveal any identifiable information about the user, whereas pseudonymous submissions are linked to a consistent identifier (a pseudonym), which could potentially be traced back to the user. BlockWhisper handles them by ensuring that all submissions are anonymous and cannot be linked to a pseudonym or identity.

## What is Proof of Human Work (PoHW)?
Proof of Human Work (PoHW) is a mechanism designed to provide Sybil resistance by requiring users to perform tasks that are easy for humans but difficult for bots, ensuring that each user represents a unique human being.

## Why are externally funded transactions required?
Externally funded transactions are necessary to enable users to make transactions without needing to acquire ETH anonymously, which is a challenging process. By using a faucet system, users can fund single-use wallets for free, ensuring their anonymity and ease of use.

## Is it feasible to ensure full anonymity even though the program takes take of my reputation?
Yes, by employing zero-knowledge proofs and hierarchical deterministic wallets, BlockWhisper can ensure full anonymity while maintaining a reputation system. This way, users can build trust in the platform without revealing their identities.

## How do we handle wrong information?
The key goal is to not implement any censorship, filtering, or moderation. Therefore, the system is self-governing via votes, allowing the community to work together to evaluate submissions. This decentralized approach ensures that no single entity controls the information, promoting transparency and trust.

## How does BlockWhisper protect users from potential retaliation or exposure?
BlockWhisper uses self-custody HD wallets to prevent identity creation and employs language normalization via an LLM to avoid submissions being correlated based on style or wording. These measures help protect users from potential retaliation or exposure.

## How does BlockWhisper compare to other platforms like SecureDrop and GlobaLeaks in terms of functionality and security?
BlockWhisper is fully decentralized, permissionless, free, and censorship-resistant due to its blockchain-native implementation. Unlike SecureDrop and GlobaLeaks, which cater to individual organizations and are not blockchain-based, BlockWhisper offers a self-governing rating system on-chain, ensuring greater transparency and security.
