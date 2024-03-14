import { useState } from "react";
import "./member.css";
import { Input, Button1, Button2 } from "../../component/FormFrm";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
        const backServer = process.env.REACT_APP_BACK_SERVER;
    const navigate = useNavigate();
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");

    const login = () => {
        console.log(1)
        if(memberId !== "" && memberPw !== ""){
        const obj = {memberId,memberPw};
        axios
        .post(backServer + "/member/login", obj)
        .then((res) =>{
            if(res.data.message === "success"){
                navigate("/");        
            } else{
                Swal.fire("아이디 또는 비밀번호를 확인하세요");
            }            
        })
        .catch((res) =>{
            console.log(res);
        }); 
        }
    };
    const join = () => {
        navigate("/join");
    }
    return (
        <div className="login-wrap">
            <h2 className="login-title">LOGIN</h2>
            <LoginInputWrap label="아이디" content="memberId" type="text" data={memberId} setData={setMemberId} />
            <LoginInputWrap label="비밀번호" content="memberPw" type="password" data={memberPw} setData={setMemberPw} />
            <div className="login-search-box">
                <Link to="#">아이디찾기</Link>
                <span class="material-icons">horizontal_rule</span>
                <Link to="#">비밀번호찾기</Link>
            </div>
            <div className="login-btn">
                <Button1 text="로그인" clickEvent={login}></Button1>
            </div>
            
            <div className="login-btn">
                <Button2 text="회원가입" clickEvent={join}></Button2>
            </div>           
        </div>
    )        
};

const LoginInputWrap = (props) => {
    const label = props.label;
    const content = props.content;
    const type = props.type;
    const data = props.data;
    const setData = props.setData;
    return(
        <div className="login-input-wrap">
            <div>
                <div className="label">
                    <label htmlFor={content}>{label}</label>
                </div>
                <div className="input">
                    <Input data={data} setData={setData} type={type} content={content} />
                </div>
            </div>
        </div>
    )
};

export default Login;