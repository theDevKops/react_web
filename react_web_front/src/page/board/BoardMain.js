import { Route, Routes } from "react-router-dom";
import "./board.css";
import BoardList from "./BoardList";


const BoardMain = (props) => {
    const isLogin = props.isLogin
    return(
        <div className="board-all-wrap">
            <div className="board-title">게시판</div>
            <Routes>
                <Route path="/list" element={<BoardList isLogin={isLogin} />} />
            </Routes>
        </div>
    )
}

export default BoardMain;