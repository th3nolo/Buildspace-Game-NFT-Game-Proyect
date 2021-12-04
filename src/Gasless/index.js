// User client-side code for signing a meta-tx request
// Note that, instead of sending the tx, the end-user signs the request and sends it to a relayer server
// This server will process the request, and if valid, send the tx via a Defender Relayer
import ethers from 'ethers';
import RegalisAbi from '../abis/Regalis.json';
import ForwarderAbi from '../../utils/Forwarder.json';

const ZeroAddress = '0x0000000000000000000000000000000000000000';
const RegalisAddress = process.env['REACT_APP_REGALIS_ADDRESS'] || ZeroAddress;
const ForwarderAddress = process.env['REACT_APP_REGALIS_ADDRESS'] || ZeroAddress;
const RelayUrl = process.env['REACT_APP_FORWARDER_ADDRESS']
//const RelayUrl = process.env.REACT_APP_RELAY_URL || '/relay';

//Forwarded doployed to: 0xdb324EE4ab2B5D6e546d146455C3dc63Aaa8Fc8B
//Contract deployed to: 0x3C2179fadfC51206048eF946AF38062307f8268


const EIP712DomainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' }
]

const ForwardRequestType = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'value', type: 'uint256' },
  { name: 'gas', type: 'uint256' },
  { name: 'nonce', type: 'uint256' },
  { name: 'data', type: 'bytes' }
]

const TypedData = {
  domain: {
    name: 'Defender',
    version: '1',
    chainId: 80001,
    verifyingContract: ForwarderAddress,
  },
  primaryType: 'ForwardRequest',
  types: {
    EIP712Domain: EIP712DomainType,
    ForwardRequest: ForwardRequestType
  },
  message: {}
};


export async function submit(number) {
  
  // Initialize provider and signer from metamask
  await window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const from = await signer.getAddress();
  const network = await provider.getNetwork();
  if (network.chainId !== 80001) throw new Error(`Must be connected to Mumbai`);

  // Get nonce for current signer
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, provider);
  const nonce = await forwarder.getNonce(from).then(nonce => nonce.toString());

  // Encode meta-tx request
  const RegalisInterface = new ethers.utils.Interface(RegalisAbi);
  const data = RegalisInterface.encodeFunctionData('getRandomBox', []);
  const request = {
    from,
    to: RegalisAddress,
    value: 0,
    gas: 1e6,
    nonce,
    data
  };
  const toSign = { ...TypedData, message: request };

  // Directly call the JSON RPC interface, since ethers does not support signTypedDataV4 yet
  // See https://github.com/ethers-io/ethers.js/issues/830
  const signature = await provider.send('eth_signTypedData_v4', [from, JSON.stringify(toSign)]);

  // Send request to the server
  const response = await fetch(RelayUrl, {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...request, signature })
  }).then(r => r.json());

  return response;
}