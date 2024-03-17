# zkComputations
Large Computations Market based on zero-knowledge proofs.

# How it works? 
<ol>
<li>Solution Seeker X wants to find the answer of Large Computation Problem.</li>
<li>X generates a verifier contract and deploys it</li>
<li>The verifier contract is funded by X with some amount that will be used for potential reward </li>
<li>The Problem desciption is posted on ZkComputations UI app</li>
<li>Problem Solver Y  tries to solve the big computation problem</li>
<li>If Y finds the solution then Y generates the proof off-chain using zokrates</li>
<li>Y send transaction to Verifier Contract containing the proof and withdraws half of the amount </li>
<li>Y is insentivized to reveal the actual solution to X (via email or on-chain) in order to receive the rest of the reward</li>
<li>X can verify the actual solution and then send the extraReward to Y, otherwise his rating goes down and money are locked forever</li>
<li>If X and Y finish the flow end to end this constitutes a Nash equilibrium,</li>
</ol>

# Diagrams



# Install Zokrates and generate proofs
```bash
curl -LSfs get.zokrat.es | sh
# Set export path
export PATH=$PATH:/Users/tima_t/.zokrates/bin
cd zokrates-contracts/prime-numbers
# compile
zokrates compile -i primes.zok
# perform the setup phase
zokrates setup
# export a solidity verifier
zokrates export-verifier
# execute the program
zokrates compute-witness -a 1087
# generate a proof of computation
zokrates generate-proof
# or verify natively
zokrates verify
```

## Start Fe App
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
