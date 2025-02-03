import Modules from "../Modules/modul";
import style from "./main.module.css";
function Main() {
  return (
    <div>
      <div className={style.mainContainer}>
        <p className={style.title}>Main Component</p>
        <Modules />
      </div>
    </div>
  );
}

export default Main;
