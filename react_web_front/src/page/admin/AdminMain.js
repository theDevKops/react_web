import { useState } from "react";
import "./admin.css"
import SideMenu from "../../component/SideMenu";
import { Route, Routes} from "react-router-dom";
import AdminBoard from "./AdminBoard";
import AdminMember from "./AdminMember";

const AdminMain = () => {
    const [menus, setMenus] = useState([
        {url : "member", text: "회원관리", active:false},
        {url : "board", text: "게시글 관리", active:false}, 
    ]);
    return(
        <div className="mypage-wrap">
            <div className="mypage-title">
                <span>관리자 페이지</span>
            </div>
            <div className="mypage-content">
                <SideMenu menus={menus} setMenus={setMenus} />
                <div className="mypage-current-content">
                    <Routes>
                        <Route path="/member" element={<AdminMember />} />
                        <Route path="/board" element={<AdminBoard />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminMain;