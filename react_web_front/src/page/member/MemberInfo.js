import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MemberInfo = (props) => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const isLogin = props.isLogin;
    const navigate = useNavigate();
    if (!isLogin ){
        Swal.fire("로그인 후 이용하세요.").then(()=>{
            navigate("/")
        });
    }
    const [member,setMember] = useState({});
    useEffect(() => {
        axios
        .get(backServer+"/member")
        .then((res)=>{
            console.log(res.data);
        })
        .catch((res)=>{
            console.log(res);
        });
    },[]);
    return(
        <div>
            <h1>내정보</h1>
        </div>
    );
};

export default MemberInfo;