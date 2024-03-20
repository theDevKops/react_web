import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SideMenu from "../../component/SideMenu";
import "./member.css"
import MemberInfo from "./MemberInfo";
import MemberPW from "./MemberPw";

const MemberMain = (props) => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const isLogin = props.isLogin;
    const navigate = useNavigate();
    if (!isLogin ){        
            navigate("/")       
    }
    const [member,setMember] = useState({});
    useEffect(() => {
        axios
        .get(backServer+"/member")
        .then((res)=>{
            console.log(res.data);
            setMember(res.data.data);
        })
        .catch((res)=>{
            console.log(res);
        });
    },[]);
    const [menus, setMenus] = useState([
        {url : "info", text : "내 정보", active : true},
        {url : "pw", text : "비밀번호 변경", active : false},
        {url : "board", text : "작성 글 보기", active : false},
    ]);
    return(
        <div className="mypage-wrap">
            <div className="mypage-title">
                <span>MYPAGE</span>
                {member && member.memberType === 1 ? 
                (
                <Link to="/admin/main">
                <span className="material-icons admin">manage_accounts</span>
                </Link>
                ):(
                ""
                )}
                
            </div>
            <div className="mypage-content">
                <SideMenu menus={menus} setMenus={setMenus}/>
                <div className="mypage-current-content">
                    <Routes>
                        <Route path="/info" element={<MemberInfo member={member}  />} />
                        <Route path="/pw" element={<MemberPW />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default MemberMain;