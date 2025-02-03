import style from "./modul.module.css";

let CardComponent = () => {
  return <p className={style.paragraf}>card component</p>;
};

function Modules() {
  return (
    <div className={style.moduleContainer}>
      <CardComponent />
    </div>
  );
}

export default Modules;
