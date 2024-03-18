import { Input } from "../../component/FormFrm";

const BoardFrm = (props) => {
    const boardTitle = props.boardTitle;
    const setBoardTitle = props.setBoardTitle;
    const boardContent = props.setBoardContent;
    const setBoardContent = props.setBoardContent;
    const thumbnail = props.thumbnail;
    const setThumbNail = props.setThumbNail;
    const boardFile = props.boardFile;
    const setBoardFile = props.setBoardFile;

    const boardImg = props.boardImg;
    const setBoardImg = props.setBoardImg;
    const fileList = props.fileList;
    const setFileList = props.setFileList;
    
    const buttonFunction = props.buttonFunction;

    //썸네일 파일 추가시 동작할 함수
    const changeThumbnail = (e) => {
        const files = e.currentTarget.files;
        if(files.length !== 0 && files[0] != 0){
            setThumbNail(files[0]);// 전송용 state에 file 객체를 세팅
            //화면에 썸네일 미리보기
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setBoardImg(reader.result);
            }
        }else{
            setThumbNail(null);
            setBoardImg(null);
        }
    };
    return(
        <div className="board-frm-wrap">
            <div className="board-frm-top">
                <div className="board-thumnail">
                    {boardImg===null ? ( <img src="/image/default.png"/>
                    ) : (
                    <img src={boardImg}/>
                    )}
                </div>
                <div className="board-info">
                    <table className="board-info-tbl">
                        <tbody>
                            <tr>
                                <td>
                                    <label htmlFor="boardTitle">제목</label>
                                </td>
                                <td>
                                    <Input type="text" data={boardTitle} setData={setBoardTitle} content="boardTitle"/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="thumbnail">대표이미지</label>
                                </td>
                                <td>
                                    <input type="file" id="thumbnail" accept="image/*" onChange={changeThumbnail} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="board-frm-bottom"></div>
        </div>
    );
};

export default BoardFrm;