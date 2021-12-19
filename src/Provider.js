import { ethers } from 'ethers';
import { createContext } from 'react';
import { abi } from './utils/Regalis.json'

export const EthereumContext = createContext({});


export function createProvider() {
  console.log('REACT_APP_MAIN_ENDPOINT','https://polygon-mumbai.g.alchemy.com/v2/hL-50oTyiSlgj8H4rF-T9N032-Wh8-Xa')
  return new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/hL-50oTyiSlgj8H4rF-T9N032-Wh8-Xa', 80001);}
const regalisAddress="0xeB65390F221F2e536dbe4869Fba69e7B48C45118"
export function createInstance(provider) {
  return new ethers.Contract(regalisAddress, abi, provider);
  
}

function Provider({ children }) {
  const provider = createProvider();
  const registry = createInstance(provider);
  const ethereumContext = { provider, registry };

  return (
    <EthereumContext.Provider value={ethereumContext}>
      {children}
    </EthereumContext.Provider>
  );
}

export default Provider;
