import PropType from "prop-types";
import style from "./Button.module.css";
function Button({ label, onClick }) {
  function handleFunc() {
    onClick(label);
  }
  return (
    <div className={style.Button}>
      <button onClick={handleFunc}>{label}</button>
    </div>
  );
}

export default Button;

Button.propTypes = {
  label: PropType.string.isRequired,
  onClick: PropType.func.isRequired,
};
