import { ethers } from 'ethers';
import { abi } from '../../src/utils/Forwarder'
const address = process.env['REACT_APP_FORWARDER_ADDRESS']


console.log('address')
export function createInstance(provider) {
  return new ethers.Contract(address, abi['abi'], provider);
}
