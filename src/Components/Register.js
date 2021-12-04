import { useRef, useState, useContext } from 'react';
import { registerName,myFunc } from '../eth/register';
import { EthereumContext } from "../Provider";
import { toast } from 'react-toastify';

function Register() {
  const [submitting, setSubmitting] = useState(false);
  const { registry, provider } = useContext(EthereumContext);

  const sendTx = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    console.log('HEREE')
    try {
      console.log('BEFORE',registry,provider)
      const response = await myFunc(registry, provider);
      console.log('RESPONSE',response)
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://blockscout.com/poa/xdai/tx/${hash}`)
        : undefined;
      toast('Transaction sent!', { type: 'info', onClick });
    } catch(err) {
      toast(err.message || err, { type: 'error' });
      
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