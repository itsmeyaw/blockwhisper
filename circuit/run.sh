#!/usr/bin/env bash

## setup phase
# circuit compilation
circom reputation.circom --r1cs --wasm --sym --c

# trusted setup ceremony
snarkjs powersoftau new bn128 12 pot12_0000.ptau -v
snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v
snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v
snarkjs groth16 setup reputation.r1cs pot12_final.ptau reputation_0000.zkey
snarkjs zkey contribute reputation_0000.zkey reputation_0001.zkey --name="1st Contributor Name" -v
snarkjs zkey export verificationkey reputation_0001.zkey verification_key.json

## use-phase
cd reputation_js
# generate witness
echo "{\"totalSubmissions\": \"25\"}" > input.json
node generate_witness.js reputation.wasm input.json witness.wtns

# generate proof
snarkjs groth16 prove ../reputation_0001.zkey witness.wtns proof.json public.json

# verify proof
snarkjs groth16 verify ../verification_key.json public.json proof.json
