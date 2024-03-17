import { useSimulateContract, useWriteContract } from 'wagmi';
import zkSolutionAbi from '../abis/zk_solution_abi';
import { Address } from 'viem';
import { mappingProofArgs } from '../constants/proofs';
import { useToast } from '@/components/ui/use-toast';

export const useSubmitProof = ({
  contract_address
}: {
  contract_address: Address;
}) => {
  const { toast } = useToast();

  const { writeContractAsync } = useWriteContract();

  const submitProof = async () => {
    try {
      const hash = await writeContractAsync({
        abi: zkSolutionAbi,
        address: contract_address,
        functionName: 'verifyTx',
        args: [mappingProofArgs[contract_address]]
      });
      toast({ title: `Tx successfully submitted` });
    } catch (err) {
      toast({ title: `Error submitting proof`, variant: 'destructive' });
      console.log('Err', err);
    }
  };

  return {
    submitProof
  };
};
