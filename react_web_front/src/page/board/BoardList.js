import { useEffect, useState } from "react";
import { Button2 } from "../../component/FormFrm";
import "./board.css";
import axios from "axios";

const BoardList = (props) => {
    const isLogin = props.isLogin;
    const [boardList, setBoardList] = useState([]);
    //페이징을 구현하는 화면도 react로 작성 -> 페이징 구현에 필요한 데이터들을 객체로받음
    const [pageInfo, setPageInfo] = useState({});
    const [reqPage, setReqPage] = useState(1);
    const backServer = process.env.REACT_APP_BACK_SERVER;
    useEffect(()=>{
        axios
        .get(backServer+"/board/list/" + reqPage)
        .then((res) => {
            console.log(res.data)
        })
        .catch((res) => {
            console.log(res);
        });
    }, [reqPage]);
    return(
        <>
            {isLogin ? (
                <div className="board-write-btn">
                    <Button2 text="작성" />
                </div>
            ) : (
            ""
            )}
        </>
    );
};

export default BoardList;