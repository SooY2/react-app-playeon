import Logo from "../components/Logo";
import Login from "../components/Login";
import styles from "./Landing.module.css";
import {Link} from "react-router-dom";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Landing=()=>{

    const [id,setId]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();

    const LoginFunc=(event)=>{
        if(!id){
            return alert("ID를 입력하세요.");
        }else if(!password){
            return alert("password를 입력하세요.");
        }
        else{
            axios.post( '/api/users/log-in',
                {
                    username:id,
                    password:password
                })
            .then((res)=>{
                console.log(res.data.userId);
                const userId=res.data.userId;
                navigate(`/main/${userId}`);
                
            }).catch((error)=>{
                //alert(error.response.data.detail);
            });

            

        }
    }

    return (<div className={styles.container}>
        <div className={styles.wrapper}>
            <Logo></Logo>
            <form className={styles.box} onSubmit={(e)=>{
                e.preventDefault();
                LoginFunc();
                console.log(e.target.id.value);
                console.log(e.target.pw.value);
            }}>
                <input className={styles.login} type="text" value={id} name="id" placeholder="아이디를 입력하세요" onChange={(event)=>{
                    event.preventDefault();
                    setId(event.target.value)
                }}></input>
                <input className={styles.login} type="text" value={password} name="pw" placeholder="비밀번호를 입력하세요" onChange={(event)=>{
                    event.preventDefault();
                    setPassword(event.target.value)
                }}></input>
                <input className={styles.loginBtn} type="submit" value="로그인"></input>
            </form>
            
            <Link to="/Join">{"회원가입 하러가기 >"} </Link>
        </div>
    </div>)
}

export default Landing;