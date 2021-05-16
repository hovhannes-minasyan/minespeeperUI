import './index.css';

export default function DigitalText({text}) {
  return (<span className="game-digital">
    {`${text}`.split('').map((number, i) => (<span className="game-letter" key={i}> {number} </span>))}
  </span>);
}
