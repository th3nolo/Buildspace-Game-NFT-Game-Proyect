import { ethers } from 'ethers';
import { createInstance } from './forwarder';
import { signMetaTxRequest } from '../ethUtils/signer';

async function sendTx(registry) {
  console.log(`Sending register tx to set ABER`);
  console.log("Ese es el registry adress", registry.address)
  return registry.getRandomBox();
}

async function sendMetaTx(registry, provider, signer) {
  console.log(`Sending register meta-tx to set`);
  const url = "https://api.defender.openzeppelin.com/autotasks/def07ae6-6a83-4841-8476-2b07b0ad5cf8/runs/webhook/56656eb4-0c5f-4ccc-86ee-9e05851efc95/SgdgtrYjFBeRGSLBZasYqB";
  if (!url) throw new Error(`Missing relayer url`);

  const forwarder = createInstance(provider);
  const from = await signer.getAddress();
  const data = registry.interface.encodeFunctionData('getRandomBox', []);
  const to = registry.address;
  
  const request = await signMetaTxRequest(signer.provider, forwarder, { to, from, data });
  console.log(request)
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(request),  
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function registerName(registry, provider) {
console('ABER1')
    //

  if (!window.ethereum) throw new Error(`User wallet not found`);
console('ABER')
  await window.ethereum.enable();
  const userProvider = new ethers.providers.Web3Provider(window.ethereum);
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 80001) throw new Error(`Please switch to xDAI for signing`);

  const signer = userProvider.getSigner();
  const from = await signer.getAddress();
  const balance = await provider.getBalance(from);
  
  const canSendTx = balance.gt(1e15);
  if (canSendTx) return sendTx(registry.connect(signer));
  else return sendMetaTx(registry, provider, signer);
}

export const myFunc=async(registry, provider)=>{
   if (!window.ethereum) throw new Error(`User wallet not found`);

   await window.ethereum.enable();
 

  const userProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
                       
  const userNetwork = await userProvider.getNetwork();
  if (userNetwork.chainId !== 80001) throw new Error(`Please switch to xDAI for signing`);
  console.log(userProvider)

   const signer = userProvider.getSigner();
  console.log(signer)
  const from = await signer.getAddress();
  console.log(from)
  const balance = await provider.getBalance(from);
 
  const canSendTx = balance.gt(1e15);

  if (canSendTx) return sendTx(registry.connect(signer));
  else return sendMetaTx(registry, provider, signer);
}