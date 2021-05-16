import DigitalText from "./DigitalText";
import Timer from "./Timer";

export default function Board({matrix}) {

  return (<div className="game-container old-button">
    <div className="game-options">
      <div className="game-score">
        <DigitalText text="999"/>
      </div>
      <div className="game-restart old-button fail">
      </div>
      <div className="game-score">
        <Timer/>
      </div>
    </div>
    {matrix.map((item, i) => {
      return <div className="game-row" key={i * item.length}>{item.map((cell, j) => {
        return (<div className="game-cell old-button" key={j}></div>)
      })}</div>
    })}
  </div>)
}
