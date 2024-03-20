import { useState } from "react";
import BoardFrm from "./BoardFrm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./board.css";


const BoardWrite = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    //제목, 썸네일, 내용, 첨부파일 -> 글 작성을 위해서 사용자에게 받야야하는 정보 -> state생성(데이터 전송용)
    const [boardTitle, setBoardTitle] = useState("");
    const [thumbnail, setThumbNail] = useState("");
    const [boardContent , setBoardContent] = useState("");
    const [boardFile, setBoardFile] = useState([]);
    //사용자 화면 출력용 state(화면전송시 사용하지 않음)
    const [boardImg, setBoardImg] = useState(null); //썸네일 미리보기용
    const [fileList, setFileList] = useState([]);   //첨부파일 미리보기용
    const navigate = useNavigate();
    const write = () => {
        console.log(boardTitle);
        console.log("boardContent " +boardContent);
        console.log(thumbnail);
        console.log(boardFile);
        if(boardTitle !== "" && boardContent !==""){
        //전송용 form 객체 생성
        const form = new FormData();
        form.append("boardTitle",boardTitle);
        form.append("boardContent",boardContent);
        if(thumbnail !== null){
            form.append("thumbnail", thumbnail);
        }
        //첨부파일도 첨부되는 갯수만큼 반복해서 추가
        for(let i=0; i<boardFile.length; i++){
            form.append("boardFile", boardFile[i]);
        }
        axios
        .post(backServer + "/board", form, {
            headers : {
                ContentType : "mutipart/form-data",
                processData: false,
            },
        })
        .then((res) => {
            console.log(res);
            navigate(backServer + "/board/list")
        })
        .catch((res)=>{
            console.log(res);
        })
        }
    };
    return(
    <div className="board-writer-wrap">
        <div className="board-frm-title">게시글 작성</div>
        <BoardFrm
            boardTitle={boardTitle}
            setBoardTitle={setBoardTitle}
            boardContent={boardContent}
            setBoardContent={setBoardContent}
            thumbnail={thumbnail}
            setThumbNail={setThumbNail}
            boardFile={boardFile}
            setBoardFile={setBoardFile}
            boardImg={boardImg}
            setBoardImg={setBoardImg}
            fileList={fileList}
            setFileList={setFileList}
            buttonFunction={write}
            type="write"
        />
    </div>
    );
};

export default BoardWrite;