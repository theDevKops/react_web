import { useState } from "react";
import BoardFrm from "./BoardFrm";

const BoardWrite = () => {
    //제목, 썸네일, 내용, 첨부파일 -> 글 작성을 위해서 사용자에게 받야야하는 정보 -> state생성(데이터 전송용)
    const [boardTitle, setBoardTitle] = useState("");
    const [thumbnail, setThumbNail] = useState("");
    const [boardContent , setBoardContent] = useState("");
    const [boardFile, setBoardFile] = useState([]);
    //사용자 화면 출력용 state(화면전송시 사용하지 않음)
    const [boardImg, setBoardImg] = useState(null); //썸네일 미리보기용
    const [fileList, setFileList] = useState([]);   //첨부파일 미리보기용

    const write = () => {
        console.log("게시글 작성 고고");
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
        />
    </div>
    );
};

export default BoardWrite;