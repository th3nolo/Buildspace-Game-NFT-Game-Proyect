import { useRef, useState, useContext } from 'react';
import { registerName,myFunc } from '../eth/register';
import { EthereumContext } from "../Provider";
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

function Register() {
  const [submitting, setSubmitting] = useState(false);
  const { registry, provider } = useContext(EthereumContext);

  const sendTx = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.log('HEREE')
    try {

      const response = await  myFunc(registry, provider)
      //console.log('ABER354654',resultmyfunc)
      //const response = await registerName(registry, provider);
   console.log('RESPONSE',response)
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://blockscout.com/poa/xdai/tx/${hash}`)
        : undefined;
      toast('Transaction sent!', { type: 'info', onClick });
    } catch(err) {
      console.log(err.message);
      
    } finally {
      setSubmitting(false);
 
    }
  }

  return <div className="Container">
    <form onSubmit={sendTx}>
 
      <button type="submit" disabled={submitting}>{submitting ? 'Registering...' : 'Register'}</button>
    </form>
  </div>
}

export default Register;