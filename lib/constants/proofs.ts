import {
  MAGIC_SQUARE_NUMBER_CONTRACT_ADDRESS,
  MAGIC_TRIANGLE_CONTRACT_ADDRESS,
  PRIME_NUMBERS_CONTRACT_ADDRESS
} from '.';

const magic_square_a = [
  '0x0dee1c68841d2183be5ba9ec34bc06275665ce601b3c6d1e6a6456d0171d417d',
  '0x159f524466f24b92fd9158473e7c0932096c298396eb41915566d0727336dae4'
];
const magic_square_b = [
  [
    '0x247ea6ddd003673651725c14878d90b11bf7c3be6ecbabc2c75666bcdaa98850',
    '0x231795d14f90e88e9846487d496d016ece4e56bfd26e8e14c32072983d6da094'
  ],
  [
    '0x1b63f053f98745b13e90d5e5d53a58fb39e0dbb7c945d8599bb1dfcdd298d164',
    '0x146748a29a6e8fedfeeda06b67b739f3d59080583ecb27f1e1c3574326c2a053'
  ]
];
const magic_square_c = [
  '0x1f0f23c83b08ce70e7e196e69101081d690dcd4690fc44809b08cfac667f9b0f',
  '0x2d21e058b23e3c2a7b6a5f5795b830559f637ef3eb58d0e393d630def4ca19cc'
];
const magic_square_proof = [magic_square_a, magic_square_b, magic_square_c];

const magic_triangle_a = [
  '0x0527817f662b3d332ad1704420744349039c1a85209af26c5e5cc50335811ca8',
  '0x01e3971cd382043bb3ed384b6e23eede0e53e05b72081593540ba2bd9592144f'
];

const magic_triangle_b = [
  [
    '0x0c5ffd7535427f8959534a80c979c0c061341f907980969f6f788123e75c4e4e',
    '0x03699d604fef703aaa4b67c1b359323ec79b7b2b25b3042b517ee578e0016312'
  ],
  [
    '0x0ec3201f2497b8c8366a4da38eb769d5eff917aceb44d84c7527db9087e1d700',
    '0x19bf91a766ee9baf83e60ca282da428b736e8bf88a1a78e6d527954f736b6302'
  ]
];

const magic_triangle_c = [
  '0x1a7dc0de5d1269baeae6f8cc4463f11063f5e040f542791778ee4a75ecb21fcd',
  '0x2d8cda1ef65fae6fdcffbc78dc248ef5b8a33e326230d813aef248d4f1bbd9ad'
];

const magic_triangle_proof = [
  magic_triangle_a,
  magic_triangle_b,
  magic_triangle_c
];

const prime_numbers_a = [
      "0x19b5db04fa73491a87116a81bbbcee30d648119d54723b98808c01042501888a",
      "0x303ab5e4ef878bea2e88b9140592861051ab663e68d0ecc504930cd6fd3330b8"
    ];

const prime_numbers_b = [
      [
        "0x1760572f3d926eaebb6e4a36d2982d3a60011d6e55e52ce3082262be7fcc8cf5",
        "0x1cb2387e82613191784c5496b0266b6bcf56015c668e6b0fcce0b6e9c36f986f"
      ],
      [
        "0x17178fae7f7bd978e0665f3819683b0055cd1eef5813a47b02f9efa31fd41902",
        "0x0a6aa093d8f7a1cdc3ca88909129870246a26439ed98065bfdfcbda6b6cde79f"
      ]
    ];

const prime_numbers_c = [
      "0x00d0d1a8012cd44bbe280a2a47bed9c85b93a6b123686694df1198e28a034180",
      "0x28878bef5958d596021d514157d3a5199e7a95096b762f5b81b94f1f321bb0c8"
    ];

const prime_numbers_proof = [prime_numbers_a, prime_numbers_b, prime_numbers_c];

export const mappingProofArgs: { [key: string]: any } = {
  [MAGIC_SQUARE_NUMBER_CONTRACT_ADDRESS]: magic_square_proof,
  [MAGIC_TRIANGLE_CONTRACT_ADDRESS]: magic_triangle_proof,
  [PRIME_NUMBERS_CONTRACT_ADDRESS]: prime_numbers_proof
};
