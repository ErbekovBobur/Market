import ReactStars from "react-rating-stars-component";
import style from "../style/bottomBox.module.css";
import { useEditProductMutation } from "../services/api/productApi";
import { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";

function Rate({ product }) {
    const [updateRate, result] = useEditProductMutation();
    const [showThanks, setShowThanks] = useState(false);

    function rating(newRate) {
        let count = product.rateamount || 1;
        let rate = product.rate;
        let rating = (rate * count + newRate) / (count + 1);
        return {
            product_id: product.product_id,
            newData: {
                rate: rating.toFixed(2),
                rateamount: count + 1
            }
        };
    };

    const setRate = async (newRating) => {
        await updateRate(rating(newRating))
            .unwrap()
            .then((res) => {
                setShowThanks(true);
                setTimeout(() => {
                    setShowThanks(false);
                }, 3000);
            })
            .catch((er) => {
                console.log(er);
            });
    };

    useEffect(() => {
        // console.log(result);
    }, [result])

    return (
        <>
            <ReactStars
                className={style.rating}
                // value={Number(product.rate)}
                count={5}
                onChange={setRate}
                size={24}
                activeColor="#ffd700"
            />
            <Toast bg={'light'} show={showThanks} className="bg-opacity-25 w-100 position-absolute position-absolute start-50 translate-middle">
                {/* <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header> */}
                <Toast.Body className={'text-succes fw-bold text-center'}>{'Спасибо за оценку :)'}</Toast.Body>
            </Toast>
        </>
    );
}

export default Rate;