import Header from "../components/Header";
import Create from "../components/Create";
import Lists from "../components/Lists";
import Update from "../components/Update";

import styles from "./Main.module.css";
import {useEffect, useState} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Main=()=>{

    const navigate=useNavigate();
    const {userId} = useParams();
    const [planId,setPlanId] = useState();
    console.log(userId);

    const [plans,setPlans]=useState([]);

    //날짜 정보 받아오기
    const [startDate, setStartDate] = useState(new Date());
    let year=startDate.getFullYear();
    let month=startDate.getMonth()+1;
    let day=startDate.getDate();

    //캘린더
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (e) => {
        setIsOpen(!isOpen);
        setStartDate(e);
    };
    const handleClick = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    /** 
     * 유저정보를 받아 state에 저장해두고 그 state를 변경해주며 업데이트하기
     * 저장하지 않고 바뀔 때마다 유저정보 받아오면 리로드 너무 많이 돼
    */


    //유저정보 받아오기
    const getUserInfo=()=>{
        axios.get(`api/plans/${userId}?month=${month}&day=${day}`)
        .then((res)=>{
            //console.log("성공");
            setPlans(res.data);
        })
        .catch((error)=>{
            console.log(error);
        })

        setMode("CREATE");
        navigate(`/Main/${userId}?month=${month}&day=${day}`);
    };

    

    //로그아웃
    const Logoutfuc=()=>{
        navigate(`/`);
    }


    const [id,setId]=useState(null);
    const [mode,setMode]=useState("CREATE");
    const [nextId,setNextId]=useState(2);

    useEffect(()=>{
        getUserInfo();
    },[startDate]);

    //일정 추가하기
    const pushPlan=(planContent)=>{
        axios.post( `/api/plans/${userId}`, 
        {
            "date": startDate,
            "content": planContent
        })
        .then(res => {
            // Handle success.
            //getUserInfo();
            setPlans(plans.concat(res.data)); 
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        });
    }

    //일정 수정하기
    const modifyPlan=(planContent)=>{
        axios.patch(`/api/plans/${userId}/${planId}`,{
            "content":planContent
        })
        .then(res=>{
            setMode("CREATE");
            //수정된 plan_id값 찾아서 content바꿔주기
            const index = plans.findIndex((plan) => plan.plan_id === planId);
            const newPlans = [...plans];
            newPlans[index] = res.data;
            setPlans(newPlans);

        })
        .catch(error=>{
            console.log(error);
        })
    }

    //일정 삭제하기
    const deletePlan=(plan_id)=>{
        axios.delete(`/api/plans/${userId}/${plan_id}`)
        .then(res=>{
            const newPlans = plans.filter((plan) => plan_id !== plan.plan_id);
            setPlans(newPlans);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    //일정 완료 (check)
    const isChecked=(plan_id,_isChecked)=>{
        axios.patch(`/api/plans/${userId}/${plan_id}/check`,{
            "is_checked":_isChecked
        })
        .then(res=>{
            console.log("check",res.data);
            const newPlans = [...plans];
            const index = plans.findIndex((plan) => plan.plan_id === res.data.plan_id);
            newPlans[index] = res.data;
            setPlans(newPlans);

            showEmoji(plan_id,_isChecked);
        })
        .catch(error=>{
            console.log(error.data);
        })
    }

    //이모지
    const showEmoji=(plan_id,_isChecked)=>{
        let emo="";
        if(_isChecked===true){
            emo="😀";
        }else if (_isChecked===false) emo="";
        axios.patch(`/api/plans/${userId}/${plan_id}/reviews`,{
            "emoji": emo
        })
        .then(res=>{
            console.log("emoji",res.data);
            const index = plans.findIndex((plan) => plan.plan_id === plan_id);
            const newPlans = [...plans];
            newPlans[index] = res.data;
            setPlans(newPlans);
        })
        .catch(error=>{
            console.log(error.data);
        })
    }



    

    let planInput=null;



    const changeMode=(_id)=>{
        setPlanId(_id);
        setMode("UPDATE");
    }


    const removeItem = (idx) => {
        const newPlans = plans.filter((plan) => idx !== plan.id);
        setPlans(newPlans);
    }


    if(mode==="CREATE"){
        planInput=<Create onClick={pushPlan
            /*planContent)=>{
                const newPlan={id: nextId, checked:false, content:planContent, delete:false};
                const newPlans=[...plans];
                newPlans.push(newPlan);
                setPlans(newPlans);
                setId(nextId);
                setNextId(nextId+1);
            }*/
        }></Create>
    }else if(mode==="UPDATE"){
        let content=null;
        for(let i=0;i<plans.length;i++){
        if(plans[i].plan_id===planId){
                content=plans[i].content;
            }
        }
        planInput=<Update place={content} id={planId} onClick={modifyPlan
            /*const newPlans=[...plans]
            const updatePlan={id: id, checked:false, content:planContent, delete:false};
            for(let i=0;i<newPlans.length;i++){
                if(newPlans[i].id===id){
                  newPlans[i]=updatePlan;
                  break;
                }
              }
            setPlans(newPlans);
            setMode("CREATE");*/
        }></Update>
    }

    


   

    
    return(
    <div>
        <Header Logout={Logoutfuc}></Header>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.boxscroll}>
                    <div className={styles.date}>
                        {year}년 {month}월 {day}일
                        <button className={styles.cal} onClick={handleClick}>
                            {"📅"}
                        </button>
                        {isOpen && (
                            <DatePicker selected={startDate} onChange={handleChange} inline/>
                        )}
                        {/* <DatePicker 
                
                            dateFormat="📅"
                            selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    </div>
                    
                    <div className={styles.lists}>
                    <Lists  plans={plans} isChecked={isChecked} onRemove={deletePlan} changeMode={changeMode}></Lists>
                    </div>
                </div>
                <div className={styles.box}>
                    {planInput}
                    
                </div>
            </div>
        </div>
    </div>
    )
};

export default Main;