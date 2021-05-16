import {useState, useEffect} from 'react';
import DigitalText from "./DigitalText";

export default function Timer() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (<DigitalText text={`${time}`.padStart(3, '0')} />)
}
