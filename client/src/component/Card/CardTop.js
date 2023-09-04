import { useEffect, useState } from "react";
import style from "../../style/topBox.module.css";
import Heart from "react-heart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delFromFavoriteList, toFavoriteList } from "../../services/slices/productsSlice";

function CardTop({ props }) {
    const [active, setActive] = useState(false);
    const favoriteList = useSelector(state => state.product.favoriteList);
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.auth.loggedIn);

    function checkFavoriteList() {
        if(!favoriteList.length){
            setActive(false);
        }
        favoriteList.filter((item) => {
            if (item.product_id === props.product.product_id) {
                setActive(true);
                return false;
            }
            return false;
        })
    };

    
    function addToFavorite(active, id) {
        if (active) {
            dispatch(delFromFavoriteList(id));
            setActive(false);
            return;
        } else {
            dispatch(toFavoriteList({ id, loggedIn }));
            setActive(true);
            return;
        }
    };

    useEffect(() => {
        checkFavoriteList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, loggedIn]);
    return (
        <>
            <div className={style.topBox} >
                <NavLink to={`/product/${props.product.product_id}`}>
                    <img className={style.logo} src={props.product.url} alt="img" />
                </NavLink>
                <div className={style.img} >
                    <Heart isActive={active} onClick={() => addToFavorite(active, props.product.product_id)} />
                    {/* <Heart className={style.button} /> */}
                </div>
            </div>
        </>
    );
}

export default CardTop;