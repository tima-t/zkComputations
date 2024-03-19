// SPDX-License-Identifier: MIT 
// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.8.0;
library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    /// @return the generator of G1
    function P1() pure internal returns (G1Point memory) {
        return G1Point(1, 2);
    }
    /// @return the generator of G2
    function P2() pure internal returns (G2Point memory) {
        return G2Point(
            [10857046999023057135944570762232829481370756359578518086990519993285655852781,
             11559732032986387107991004021392285783925812861821192530917403151452391805634],
            [8495653923123431417604973247489272438418190587263600148770280649306958101930,
             4082367875863433681332203403145435568316851327593401208105741076214120093531]
        );
    }
    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point memory p) pure internal returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }
    /// @return r the sum of two points of G1
    function addition(G1Point memory p1, G1Point memory p2) internal view returns (G1Point memory r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
    }


    /// @return r the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point memory p, uint s) internal view returns (G1Point memory r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success);
    }
    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] memory p1, G2Point[] memory p2) internal view returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++)
        {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[1];
            input[i * 6 + 3] = p2[i].X[0];
            input[i * 6 + 4] = p2[i].Y[1];
            input[i * 6 + 5] = p2[i].Y[0];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
        return out[0] != 0;
    }
    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(G1Point memory a1, G2Point memory a2, G1Point memory b1, G2Point memory b2) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2,
            G1Point memory d1, G2Point memory d2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}

contract Verifier {
    using Pairing for *;
    address public  admin;
    address public winner;
    string public solution;
    constructor() {
      admin = msg.sender;
    }
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0e225d7250e936fd1111d75f8a2f6bc7d8a53bb72bc5f9094b7d3853956d4c04), uint256(0x14eadfbb71d9143911911d0ad74050c2bd03406f85dd135a79b4a9ef8da85464));
        vk.beta = Pairing.G2Point([uint256(0x259c33da4bf1c30ed85a0673832a1703eb93d61e2ef53ae6ccf44e0c9cdd936d), uint256(0x1fcf3cfe4d60373ab747b16a52714310cd7d6983d864bf898bda16eb4d7f982d)], [uint256(0x17b678d4c4ae4cb94bfd5ddef346026700bec27b7e94ba5c77af5f8419934554), uint256(0x2f008469a20e81b50be6e9c1bec0fd3eb017e95ffd4795720aa2a1c66e975476)]);
        vk.gamma = Pairing.G2Point([uint256(0x0664869058e29fbb87a8449c8867104332f76eb881d2feacceab181cc1ebce72), uint256(0x1aa5642e96e6625c9bd996375d468b7c3dbaf55636e4b3437b68468b26b4ce2f)], [uint256(0x05d1f6508807e5d121c59f8090cb135028d9db1a73debcf93fea36dd1ee7079f), uint256(0x01ebcc221decce48f5fc6990a4893348ea278a2bd0d75070c31171bb10eb54fe)]);
        vk.delta = Pairing.G2Point([uint256(0x271dc7e5645ffbdb625f3d74e3f3ae05c5fa6125f3f1b0e406dc24c5c55a2a9b), uint256(0x0d2b9054b358953b9c1c225f8bb882f82fb01b84050bf658562ceeb99bc4eda4)], [uint256(0x0fb03305507399e0ef21d56c10ec5ac9dcabc057d946c91477e8104ce293498d), uint256(0x1fc27b5415bc53c8bdfb314e886cd72e39e9369ab69578eabf0b3abfcb56b2dc)]);
        vk.gamma_abc = new Pairing.G1Point[](1);
        vk.gamma_abc[0] = Pairing.G1Point(uint256(0x181e822a0c1aaf19ecb009e930d9f54a43afb2fe76d2de3f757077c880f621d6), uint256(0x11cd323443226f94a5b3a8de82b738f1f0a12a2c1e512ce30f976608eec0bbe2));
    }
    function verify(uint[] memory input, Proof memory proof) internal view returns (uint) {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(vk_x, Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i]));
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if(!Pairing.pairingProd4(
             proof.a, proof.b,
             Pairing.negate(vk_x), vk.gamma,
             Pairing.negate(proof.c), vk.delta,
             Pairing.negate(vk.alpha), vk.beta)) return 1;
        return 0;
    }
    // function verifyTx(
    //         Proof memory proof
    //     ) public view returns (bool r) {
    //     uint[] memory inputValues = new uint[](0);
        
    //     if (verify(inputValues, proof) == 0) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
      function verifyTx(
            Proof memory proof
        ) public returns (bool r) {
        require(winner == address(0), "Winner exists");
        
        uint[] memory inputValues = new uint[](0);
        
        if (verify(inputValues, proof) == 0) {
            winner = msg.sender;
            return true;
        } else {
            return false;
        }
    }

    function deposit() external payable {
      require(msg.sender == admin, "Only owner");
    }

    function withdraw(string memory _solution) public {
        uint amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        require(msg.sender == winner, "Only winner can withdraw");
        solution = _solution;
        
        (bool success, ) = msg.sender.call{value: amount / 2}("");
        require(success, "Transfer failed.");
    }

    function sendExtraReward() public {
        require(msg.sender == admin, "Only owner");
        uint amount = address(this).balance;
        require(amount > 0, "No funds to withdraw");
        require(winner != address(0), "Only winner can withdraw");
        
        (bool success, ) = payable(winner).call{value: amount}("");
        winner = address(0);
        require(success, "Transfer failed.");
    }

}
