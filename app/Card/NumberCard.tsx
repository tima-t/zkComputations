'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CONTRACT_METADATA } from '@/lib/constants';
import { useGetWinner } from '@/lib/hooks/useGetWinner';
import { useSubmitProof } from '@/lib/hooks/useSubmitProof';
import { useWithdraw } from '@/lib/hooks/useWithdraw';
import Image from 'next/image';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

const image =
  'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*';

type NumberCardProps = {
  contract_address: Address;
};

export default function NumberCard({ contract_address }: NumberCardProps) {
  const { submitProof } = useSubmitProof({ contract_address });
  const { winner } = useGetWinner({ contract_address });
  const { address } = useAccount();
  const { onWithdraw } = useWithdraw({ contract_address });
  const isZeroAddress = winner === '0x0000000000000000000000000000000000000000';

  return (
    <Card className='space-y-4 rounded-t-none w-[300px] w-max-[350px]'>
      <div className='w-full h-[200px] relative overflow-hidden'>
        <Image
          src={CONTRACT_METADATA[contract_address]?.LOGO_URL}
          alt='image'
          fill
          className='hover:scale-125 transition duration-300'
        />
      </div>
      <div className='space-y-4 px-2 pb-2'>
        <Label className='overflow-hidden text-ellipsis'>
          {CONTRACT_METADATA[contract_address]?.NAME}
        </Label>
        <Input
          placeholder={CONTRACT_METADATA[contract_address]?.PLACEHOLDER}
          className='placeholder:text-gray-400'
        />
        {winner && !isZeroAddress ? (
          <div className='flex flex-col gap-2'>
          <Label>
            Winner: 
          </Label>
          
          <Label>{winner.slice(0, 10) + '...' + winner.slice(-10)}</Label>
          </div>
        ) : (
          <Button className='w-full' onClick={() => submitProof()}>
            Submit
          </Button>
        )}

        {winner === address && (
          <Button
            onClick={() =>
              onWithdraw({
                solution: CONTRACT_METADATA[contract_address]?.SOLUTION
              })
            }
          >
            Withdraw
          </Button>
        )}
      </div>
    </Card>
  );
}
