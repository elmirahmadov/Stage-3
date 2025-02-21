import React, { useState } from "react";
import styles from "./Count.module.css";
import Button from "./button";

function Caunt() {
  const initialState = { count: 0, text: "" };
  const [state, setState] = useState(initialState);
  const incrementFunc = () => {
    setState({ ...state, count: state.count + 1 });
  };
  const decrementFunc = () => {
    setState({ ...state, count: state.count - 1 < 0 ? 0 : state.count - 1 });
  };
  const handleText = (event) => {
    setState({ ...state, text: event.target.value });
  };
  const additionFunc = () => {
    setState({ count: state.count + Number(state.text), text: "" });
  };
  const substracFunc = () => {
    setState({
      count:
        state.count - Number(state.text) < 0
          ? 0
          : state.count - Number(state.text),
      text: "",
    });
  };
  const resetFunc = () => {
    setState(initialState);
  };

  function callBackFunction(el) {
    alert(`${el}`);
  }
  return (
    <div className={styles.parent}>
      <div className={styles.btnContainer}>
        <Button label="Save" onClick={callBackFunction} />
        <Button label="Back" onClick={callBackFunction} />
        <Button label="Delete" onClick={callBackFunction} />
        <Button label="Edit" onClick={callBackFunction} />
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={decrementFunc}>
          -
        </button>
        <h2>{state.count}</h2>
        <button className={styles.btn} onClick={incrementFunc}>
          +
        </button>
      </div>
      <input
        className={styles.input}
        value={state.text}
        type="text"
        onChange={handleText}
      />
      <div className={styles.btns}>
        <button className={styles.btn} onClick={additionFunc}>
          Addition
        </button>
        <button className={styles.btn} onClick={substracFunc}>
          Substrac
        </button>
        <button className={styles.btn} onClick={resetFunc}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default Caunt;
