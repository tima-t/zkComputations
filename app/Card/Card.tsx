import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const image =
  'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*';

export default function NumberCard() {
  return (
    <Card className='space-y-4 rounded-t-none'>
      <div className='w-full h-[200px] relative overflow-hidden'>
        <Image
          src={image}
          alt='image'
          fill
          className='hover:scale-125 transition duration-300'
        />
      </div>
      <div className='space-y-4 px-2 pb-2'>
        <Input
          placeholder='Enter prime number'
          className='placeholder:text-gray-400'
        />
        <Button className='w-full'>Submit</Button>
      </div>
    </Card>
  );
}
