import React, { useEffect, useState } from "react";
import "../../css/planner/Content.css";
import { useIdContext } from "../Context";
import axios from "axios";

//

function Content() {
    const { placeId, contentTypeId } = useIdContext();
    const [data, setData] = useState("로딩중...");
    let url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=serviceKey&contentTypeId=${contentTypeId}&contentId=${placeId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                setData(res.data.response.body.items.item[0]);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [url]);

    return (
        <div id="content">
            <h2>{data.title}</h2>
            {data.firstimage === "" ? (
                <></>
            ) : (
                <img src={data.firstimage} alt={data.title} />
            )}
            <p>{data.overview}</p>
        </div>
    );
}

export default Content;
