import "./App.css";
import BasicExample from "./components/BasicExample";
import Button from "./components/button";

function App() {
  function callBackFunction(el) {
    alert(`${el}`);
  }
  return (
    <>
      <Button label="Save" onClick={callBackFunction} />
      <Button label="Back" onClick={callBackFunction} />
      <Button label="Delete" onClick={callBackFunction} />
      <Button label="Edit" onClick={callBackFunction} />
      <BasicExample />
    </>
  );
}

export default App;
