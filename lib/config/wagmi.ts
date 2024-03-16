import { base } from 'viem/chains';
import { cookieStorage, createConfig, createStorage, http } from 'wagmi';

export default createConfig({
  chains: [base],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  transports: {
    [base.id]: http()
  }
});
