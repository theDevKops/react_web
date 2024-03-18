import { useEffect, useState } from "react";
import { Button1, Button2, Button3, Input } from "../../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import "./member.css"

const MemberInfo = (props) => {
    const member = props.member;    
    const [phone,setPhone] = useState("");
    const backServer = process.env.REACT_APP_BACK_SERVER;
    useEffect(() =>{
        setPhone(member.memberPhone);
    }, [member]);
    const updateMemberPhone = () => {
        const m = {memberId:member.memberId, memberPhone: phone};
        axios
        .patch(backServer + "/member/phone", m)
        .then((res) =>{            
            Swal.fire({
                icon : "success",
                title : "수정완료" 
            });    
        })
        .catch((res)=>{
            console.log(res);
        });
    };
    const deleteMember = () => {
        Swal.fire({
            icon : "warning",
            title : "회원탈퇴",
            text : "탈퇴하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "탈퇴",
            cancelButtonText:"취소"
        })
        .then((res) =>{
            if(res.isConfirmed){
                axios
                .delete(backServer + "/member")
                .then((res)=>{
                    if(res.data.message === "success"){
                        Swal.fire("안녕하가십시오").then(() =>{
                        //logout();
                        })
                    }
                    console.log(res);
                })
                .catch((res)=>{
                    console.log(res);
                });
            }
        });
    };
    return(
        <div className="mypage-info-wrap">
            <div className="mypage-current-title">회원정보화면</div>
            <table className="member-info-tbl">
                <tbody>
                    <tr>
                        <td>회원아이디</td>
                        <td>{member.memberId}</td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td>{member.memberName}</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td id="member-phone">
                            <div>
                                <Input data={phone} setData={setPhone} type="text" content="phone" />
                                <Button3 text="수정" clickEvent={updateMemberPhone}></Button3>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="delete-btn-box">
                <Button2 text="회원탈퇴" clickEvent={deleteMember} />
            </div>
        </div>
    ); 
};

export default MemberInfo;