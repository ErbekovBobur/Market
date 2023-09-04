
import CardBottom from "./CardBottom.js";
import CardTop from "./CardTop.js";


function CardBox(props) {
    return (
        <div className="box">
            <CardTop props={props}/>
            <CardBottom props={props} />
        </div>
    )
}

export default CardBox;