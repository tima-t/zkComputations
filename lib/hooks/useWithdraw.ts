import { useWriteContract } from 'wagmi';
import zkSolutionAbi from '../abis/zk_solution_abi';
import { Address } from 'viem';

export const useWithdraw = ({
  contract_address
}: {
  contract_address: Address;
}) => {
  const { writeContractAsync } = useWriteContract();

  const onWithdraw = async ({ solution }: { solution: string }) => {
    writeContractAsync({
      abi: zkSolutionAbi,
      address: contract_address,
      functionName: 'withdraw',
      args: [solution]
    });
  };

  return { onWithdraw };
};
