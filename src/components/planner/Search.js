import { useEffect, useState } from "react";
import "../../css/planner/Search.css";
import axios from "axios";
import Place from "./Place";
import React from "react";
import { useIdContext } from "../Context";
import { Button, Col, Row } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const areaCode = searchParams.get("areaCode");
    const sigunguCode = searchParams.get("sigunguCode");
    const [places, setPlaces] = useState(null);
    const [input, setInput] = useState("");
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const { contentTypeId, setContentTypeId } = useIdContext();
    const serviceKey = "serviceKey";
    const fetchData = async () => {
        try {
            const res = await axios.get(
                keyword === ""
                    ? `http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${serviceKey}&listYN=Y&arrange=A&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&cat1=&cat2=&cat3=&_type=json`
                    : `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&numOfRows=10&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&contentTypeId=${contentTypeId}&areaCode=${areaCode}&sigunguCode=${sigunguCode}&keyword=${keyword}`
            );
            setTotalPage(Math.ceil(res.data.response.body.totalCount / 10));
            let items = res.data.response.body.items.item;
            setPlaces(items);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [contentTypeId, keyword]);

    const onChange = (e) => {
        setInput(e.target.value);
    };

    let result = <div>로딩중...</div>;
    let pages;
    if (places === null || places === undefined) {
        result = <div>검색 결과가 없습니다.</div>;
    } else {
        result = places.map((data) => (
            <Place
                key={data.contentid}
                title={data.title}
                addr={data.addr1}
                image={data.firstimage}
                id={data.contentid}
                coord={{ coordX: data.mapx, coordY: data.mapy }}
            />
        ));
    }
    return (
        <div id="search">
            <Row className="p-2">
                <Col>
                    <Button onClick={() => setContentTypeId("32")}>숙소</Button>
                </Col>
                <Col>
                    <Button onClick={() => setContentTypeId("39")}>식당</Button>
                </Col>
                <Col>
                    <Button onClick={() => setContentTypeId("12")}>
                        관광지
                    </Button>
                </Col>
            </Row>
            <input type="text" onChange={onChange}></input>
            <Button size="sm" onClick={() => setKeyword(input)}>
                <BiSearchAlt></BiSearchAlt>
            </Button>
            <div id="search_result">{result}</div>
        </div>
    );
}

export default Search;
