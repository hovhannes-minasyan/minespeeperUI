import {useState, useEffect} from 'react';
import DigitalText from "./DigitalText";

export default function Timer({ reset, setReset, isStopped }) {
  const [time, setTime] = useState(0);
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

  return (<DigitalText text={`${time}`.padStart(3, '0')} />)
}
