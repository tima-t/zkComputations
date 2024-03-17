import { useReadContract } from 'wagmi';
import zkSolutionAbi from '../abis/zk_solution_abi';
import { Address } from 'viem';

export const useGetWinner = ({
  contract_address
}: {
  contract_address: Address;
}) => {
  const { data } = useReadContract({
    abi: zkSolutionAbi,
    address: contract_address,
    functionName: 'winner'
  });

  return { winner: data as Address };
};
