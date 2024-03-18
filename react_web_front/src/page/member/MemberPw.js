import { useState } from "react";
import { Button2, Input} from "../../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";

const MemberPW= () => {
    const [isAuth, setIsAuth] = useState(false);//현재비밀번호를 입력해서 인증여부
    const [currPw, setCurrPw] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberPwRe, setMemberPWRe] = useState("");
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const checkPw = () => {
        const member = {memberPw : currPw};
        axios.post(backServer + "/member/pw",member)
        .then((res)=>{
            if(res.data.message === "valid"){
                setIsAuth(true);
                setCurrPw("");
            }else{
                Swal.fire({
                    icon : "question",
                    title : "다시한번확인하세요",
                });
            }
        })
        .catch((res)=>{
            console.log(res);
        });        
    };
    const changePw = () => {
        if(memberPw !== "" && memberPwRe !== "" && memberPw === memberPwRe){
            const m = { memberPw };
            axios
            .patch(backServer + "/member/pw", m)
            .then((res) =>{
                if(res.data.message === "success"){
                    Swal.fire({icon: "success", title:"변경완료"})
                    .then(() =>{
                        setIsAuth(false);
                        setMemberPw("");
                        setMemberPWRe("");
                    }
                );
                }
            })
            .catch((res) =>{
                console.log(res);
            })
        }
    };
    return(
        <div className="mypage-current-wrap">
            <div className="mypage-current-title">비밀번호 수정</div>
            <div className="pw-change-wrap">
                {isAuth ? (
                <>
                    <div className="pw-input-wrap">
                        <div>
                            <label htmlFor="memberPw">새 비밀번호</label>
                            <Input type="password" content="memberPw" data={memberPw} setData={setMemberPw} />
                        </div>
                        <div>
                            <label htmlFor="memberPw">비밀번호 확인</label>
                            <Input type="password" content="memberPwRe" data={memberPwRe} setData={setMemberPWRe} />
                            <Button2 text="변경" clickEvent={changePw}/>
                        </div>                       
                    </div>
                </>
                ) : (
                    <>
                    <div className="pw-input-wrap">
                        <div>
                            <label htmlFor="currPw">현재비밀번호</label>
                            <Input type="password" data={currPw} setData={setCurrPw} content="currPw"/>
                            <Button2 text="입력" clickEvent={checkPw} />
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MemberPW;