import { ethers } from 'ethers';
import { abi } from '../utils/Forwarder'
const address = "0xf8F38887ea903eBF82bc9069dFB782cc517baDeC"
console.log('address')
export function createInstance(provider) {
  return new ethers.Contract(address, abi['abi'], provider);
}
