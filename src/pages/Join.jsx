import styles from "./Join.module.css";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Login from "../components/Login";
import JoinBtn from "../components/JoinBtn";
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

/**회원가입 페이지 */
const Join=()=>{

    const [name,setName]=useState("");
    const [id,setId]=useState("");
    const [pw,setPw]=useState("");
    const {replace}=useNavigate();


    const join=(e)=>{
        //e.preventDefault();

        // const tmp= axios({
        //         method: "post",
        //         url:"/api/users/sign-up",
        //         body:({
        //             username: name,
        //             id: id,
        //             password: pw,
        //         })
        //       });
        
        

        //"proxy": "http://likelion-ssu-todolist.store/"

        axios.post( '/api/users/sign-up', 
        { 
            username: name,
            id: id,
            password: pw,
        })
        .then(res => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', res.data);
            //console.log('User token', res.data.jwt);
            console.log(res)
            //localStorage.setItem('token',res.data.jwt);
            //replace("/");
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });

        
    }

    

    
    
    return (<div className={styles.container}>
        <div className={styles.wrapper}>
        <Link to="/">{"< 로그인 페이지로 돌아가기"}</Link>
        <Logo></Logo>
        <form className={styles.wrapper} onSubmit={(e)=>{
            e.preventDefault();
            join();
        }}>
            <input className={styles.login} value={name} name="name" placeholder="이름을 입력하세요" onChange={(e)=>{
                setName(e.target.value);
            }}></input>
            <input className={styles.login} value={id} name="id" placeholder="아이디를 입력하세요" onChange={(e)=>{
                setId(e.target.value);
            }}></input>
            <input className={styles.login} value={pw} name="pw" placeholder="비밀번호를 입력하세요" onChange={(e)=>{
                setPw(e.target.value);
            }}></input>
            <input className={styles.joinBtn} type="submit" onClick={()=>{
                console.log("회원가입");
            }} value="회원가입 하기"></input>
        </form>
        </div>
    </div>)


}


export default Join;