export default [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sendExtraReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'solution',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'X',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'Y',
                type: 'uint256'
              }
            ],
            internalType: 'struct Pairing.G1Point',
            name: 'a',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256[2]',
                name: 'X',
                type: 'uint256[2]'
              },
              {
                internalType: 'uint256[2]',
                name: 'Y',
                type: 'uint256[2]'
              }
            ],
            internalType: 'struct Pairing.G2Point',
            name: 'b',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'uint256',
                name: 'X',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'Y',
                type: 'uint256'
              }
            ],
            internalType: 'struct Pairing.G1Point',
            name: 'c',
            type: 'tuple'
          }
        ],
        internalType: 'struct Verifier.Proof',
        name: 'proof',
        type: 'tuple'
      }
    ],
    name: 'verifyTx',
    outputs: [
      {
        internalType: 'bool',
        name: 'r',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'winner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_solution',
        type: 'string'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
