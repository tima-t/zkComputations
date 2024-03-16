import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Label } from '../ui/label';

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center gap-4 border-b p-4'>
      <Label className='font-bold text-lg text-blue-500'>ZK Computation</Label>
      <ConnectButton />
    </nav>
  );
}
