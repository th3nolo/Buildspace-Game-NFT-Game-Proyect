import { ethers } from 'ethers';
import { createContext } from 'react';
import { abi } from './utils/Regalis.json'

export const EthereumContext = createContext({});

export function createProvider() {
  return new ethers.providers.JsonRpcProvider(process.env['REACT_APP_MAIN_ENDPOINT'], 80001);
}
const regalisAddress=process.env['REACT_APP_REGALIS_ADDRESS']
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
