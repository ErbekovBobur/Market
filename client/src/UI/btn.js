import style from "../style/btn.module.css";

function Btn({ type = "", label = ""}) {
    return (
        <button className={style.btn} type={type}>
            <span className={style.text}>
                {label}
            </span>
        </button>
    )
}
export default Btn;