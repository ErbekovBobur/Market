// import Rating from "../UI/rating";
import style from '../../style/bottomBox.module.css'
import { useDispatch } from 'react-redux';
import { toBasket } from '../../services/slices/productsSlice';
import Rate from "../../UI/rate";


function CardBottom({ props }) {
    const dispatch = useDispatch()
    function tobasket() {
        dispatch(toBasket(props.product))
    }
    return (
        <>
            <div
                className={style.lower}
            >
                <div className={style.price}>
                    <span>{new Intl.NumberFormat("ru-RU").format(props.product.price)} сум</span>
                </div>
                <div className={style.name}>
                    {props.product.name}
                </div>
                <div>
                    <Rate product={props.product} />
                </div>
                <button
                    onClick={tobasket}
                    className={style.button}>
                    <span className={style.text}
                    >
                        В корзину
                    </span>
                </button>
            </div>
        </>
    );
}

export default CardBottom;