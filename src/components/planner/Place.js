import shortid from "shortid";
import "../../css/planner/Place.css";
import { useIdContext } from "../Context";
import { Button } from "react-bootstrap";

function Place({ id, title, image, addr, coord }) {
    const { setPlaceId, setSelectedCoord, placeList, setPlaceList } =
        useIdContext();
    let integerCoord = {
        coordX: parseFloat(coord.coordX),
        coordY: parseFloat(coord.coordY),
    };

    const selectedPlace = () => {
        setSelectedCoord(integerCoord);
        setPlaceId(id);
    };

    const addPlace = () => {
        setPlaceList([
            ...placeList,
            {
                id: shortid.generate(),
                title: title,
                coord: integerCoord,
            },
        ]);
    };
    return (
        <div className="place" onClick={selectedPlace}>
            <div className="place_info">
                <h4>{title}</h4>
                {image === "" ? <></> : <img src={image} alt="이미지 없음" />}
                <p>{addr}</p>
            </div>
            <Button
                variant="primary btn-sm"
                className="place_add"
                onClick={() => {
                    addPlace();
                    selectedPlace();
                }}
            >
                +
            </Button>
        </div>
    );
}

export default Place;
