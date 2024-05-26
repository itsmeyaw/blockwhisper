# BlockWhisper
Contributors:
- [itsmeyaw](https://github.com/itsmeyaw)
- [gopimehta](https://github.com/gopimehta)
- [alexhaeringer](https://github.com/alexhaeringer)
- [hashkode](https://github.com/hashkode)

## Problem Statement


## Constraints

### Time
We put a strong emphasis on anonimity. Therefore, the demo largely revolves around showing how a completely anonymous system can be built, so to prepare a decentralised, anonymous reputation system.

Due to the time constraint, we left the PoHW (providing sybil resistance) as a placeholder, but see it as a key point to investigate post hackathon.

# How-To

## Frontend

## Smart Contract

## Zero-Knowledge-Proof System

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

# Design Documentation

## Concept

## Challenges
Over the course of the hackathon, we faced a number of challenges. While we managed address the critical ones, there are some edge cases, which are still open for further investigation.

### Enable free transactions
Users should not face the issue of having to acquire Eth anonymously for transmission fee funding
- https://eips.ethereum.org/EIPS/eip-2711#sponsored-transactions -> withdrawn
- https://eips.ethereum.org/EIPS/eip-3074#another-sponsored-transaction-eip -> draft
- https://eips.ethereum.org/EIPS/eip-4337#paymasters -> draft

Solution: we mimic faucets, so to fund user accounts, thereby aleviating them from the struggle to onramp anonymously.

# Competing concepts

## "A blockchain-based anonymous reporting system with no central authority: Architecture and protocol"
Source: https://www.sciencedirect.com/science/article/pii/S277291842300019X

"To eliminate the central authority, a concept termed the virtual blockchain (VBC) is implemented as an embedded permissioned blockchain within a permissionless blockchain." (from the Abstract)

--> The approach is not open and permissionless.

# FAQ

## What is the matter with anonymous vs. pseudonomious submissions?

## What is Proof of Human Work (PoHW)?

## Why are externally funded transactions required?
