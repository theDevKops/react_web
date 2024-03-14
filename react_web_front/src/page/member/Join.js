import { useState } from "react";
import "./member.css";
import { Input } from "../../component/FormFrm";
import { Button2 } from "../../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";


const Join = () => {
    const [memberId, setMemberId] = useState("");
    const [memberPw, setMemberPw] = useState("");
    const [memberName, setMemberName] = useState("");
    const [memberPhone, setMemberPhone] = useState("");

    const [memberPwRe, setMemberPwRe] = useState("");
    const [checkIdMsg, setCheckIdMsg] = useState("");
    const [checkPwMsg, setcheckPwMsg] = useState("");
    const navigate = useNavigate();
    
    //아이디 입력하고 나갔을 때 이벤트(유효성검사 and 중복체크)
    const idChk = () => {
      const idReg = /^[a-zA-z0-9]{4,12}$/;
      if(idReg.test(memberId)){
        //정규표현식 만족했을때 -> 중복체크        
        axios
        .get("http://192.168.10.17:8888/member/id/"+memberId)        
        .then((res) =>{
          if(res.data.message === "dupulication"){
            setCheckIdMsg("이미 사용중인 아이디입니다.");
          }else{
            setCheckIdMsg("");
          }          
        })
        .catch(()=>{})
      }else{
        //정규표현식 만족하지 못했을때
        setCheckIdMsg("아이디는 영어 대/소문자/숫자로 4~12글자 입니다.")
      }
    };
    //비밀번호 확인을 입력하면, 비밀번호와 일치하는지 체크하는 함수
    const pwCheck = () => {
      if (memberPw !== memberPwRe){
        setcheckPwMsg("비밀번호가 일치하지않습니다.")
      }else{
        setcheckPwMsg("")
      }   
    }
    //회원가입 버튼 클릭 시 동작할 이벤
    const join = () => {
      if(memberId !== "" && memberPw !== "" && memberName !== "" && memberPhone !== "" && checkIdMsg === "" && checkPwMsg === "" ){
        const obj = {memberId,memberPw,memberName,memberPhone};
        axios
        .post("http://192.168.10.17:8888/member/join", obj)
        .then((res)=>{
            if(res.data.message === "success"){
              navigate("/login")
            }else{
              Swal.fire("처리중 에러 발생")
            }
        })
        .catch((res) =>{
          console.log(res);
        })
      }else{
        Swal.fire("입력값을 확인하세요");
      }
    }
    return(
      <div className="join-wrap">
          <div className="page-title">회원가입</div>
            <JoinInputWrap label="아이디" content="memberId" type="text" data={memberId} setData={setMemberId} checkMsg={checkIdMsg} blurEvent={idChk} />
            <JoinInputWrap label="비밀번호" content="memberPw" type="password" data={memberPw} setData={setMemberPw} />
            <JoinInputWrap label="비밀번호확인" content="memberPwRe" type="password" data={memberPwRe} setData={setMemberPwRe} checkMsg={checkPwMsg} blurEvent={pwCheck} />
            <JoinInputWrap label="이름" content="memberName" type="text" data={memberName} setData={setMemberName} />
            <JoinInputWrap label="전화번호" content="memberPhone" type="text" data={memberPhone} setData={setMemberPhone} />   
        <div className="join-btn-box">
          <Button2 text="JOIN" clickEvent={join}></Button2>      
        </div>
      </div>
    )
  };

  const JoinInputWrap = (props) =>{
    const label = props.label;
    const content = props.content;
    const type = props.type;
    const data = props.data;
    const setData = props.setData;
    const checkMsg = props.checkMsg;
    const blurEvent = props.blurEvent;
    return (      
        <div className="join-input-wrap">
          <div>
            <div className="label">
              <label htmlFor={content}>{label}</label>
            </div>
            <div className="input">
              <Input data={data} setData={setData} type={type} content={content} blurEvent={blurEvent}/>
            </div>
          </div>
          {checkMsg ? <div className="check-msg">{checkMsg}</div> : ""}
        </div>      
    );
  };

  export default Join;
