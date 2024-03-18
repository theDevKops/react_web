import "./pagination.css";


const Pagination = (props) => {
    const pageInfo = props.pageInfo;
    const reqPage = props.reqPage;
    const setReqPage = props.setReqPage;

    const changePage = (e) => {
        const pageNo = e.currentTarget.innerText;
        setReqPage(Number(pageNo));
    }
    //paging jsx가 저장될 배열
    const arr = new Array();
    //맨앞으로 버튼(어느페이지에서든 1페이지로 이동하는 버튼)
    arr.push(
    <span
        key="first-page"
        onClick={()=>{
            setReqPage(1);
    }} 
        className="material-icons"
    >
        first_page
    </span>
    );
    //이전 버튼(어느페이지에서든 현재 보고있는 페이지보다 1 작은 페이지, 단 1페이지면 동작 x)
    arr.push(
        <span
        key="prev-page"
        onClick={()=>{
            if(reqPage != 1) {
                setReqPage(reqPage-1);
            }
        }}
        className="material-icons">navigate_before</span>
    );
    //페이징 숫자
    let pageNo=pageInfo.pageNo;
    for(let i=0; i<pageInfo.pageNaviSize; i++){
        if(pageNo === Number(reqPage)){
            arr.push(<span key={"page"+i} className="page-item active-page">{pageNo}</span>);
        }else{
            arr.push(<span key={"page"+i} onClick={changePage} className="page-item">{pageNo}</span>);
        }
        pageNo++;
        if(pageNo > pageInfo.totalPage) {
            break;
        }
    }
    //다음페이지
    arr.push(
    <span 
        key="next-page" 
        onClick={()=> {
        if(reqPage != pageInfo.totalPage) {
            setReqPage(Number(reqPage) +1);
        }
        }}className="material-icons">navigate_next</span>
    );
    //맨 끝 페이지로 이동
    arr.push(
    <span 
        key="last-page"
        onClick={() => {
            setReqPage(pageInfo.totalPage);
        }}
        className="material-icons">last_page</span>
    );
    return(
        <div className="paging-wrap page-item">{arr}</div>
    )
}

export default Pagination;