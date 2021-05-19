import {useState, useEffect} from 'react';
import DigitalText from "./DigitalText";

export default function Timer({ reset, setReset, isStopped, initialTime=0 }) {
  const [time, setTime] = useState(0);
  console.log(initialTime)
  useEffect(() => {
    const id = setInterval(() => setTime(prev => {
      if(isStopped || prev >= 999) return prev;
      return prev + 1;
    }), 1000);
    return () => clearInterval(id);
  }, [isStopped]);

  useEffect(() => {
    if(reset){
      setTime(0);
      setReset(false);
    }
  }, [reset, setReset])

  return (<DigitalText text={`${Math.min(initialTime + time, 999)}`.padStart(3, '0')} />)
}
