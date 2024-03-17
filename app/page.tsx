import { ADDRESSES } from '@/lib/constants';
import NumberCard from './Card/NumberCard';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {new Array(3).fill(0).map((el, idx) => (
          <NumberCard key={idx} contract_address={ADDRESSES[idx]} />
        ))}
      </div>
    </main>
  );
}
