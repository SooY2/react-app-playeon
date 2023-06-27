import styles from "./index.module.css";
import { useState,useEffect } from "react";

const Update=(props)=>{

    const [content,setContent]=useState(props.place);

    useEffect(()=>{//id 바뀔 때마다 처음 content바꿔주기
        setContent(props.place);
    },[props.id]);

    //왜 두개씩 나오징...
    //console.log(content);
    
    return (<article >
        <h3 className={styles.title}>일정 수정하기</h3>
        <div className={styles.container}>
        <form className={styles.contentbox} onSubmit={event=>{
            event.preventDefault();
            const _content=event.target.content.value;
            props.onClick(_content);
        }}>
            <textarea className={styles.textarea} type="text-area" name="content" value={content} onChange={(e)=>{
                e.preventDefault();
                setContent(e.target.value);
            }}></textarea>
            
            <input className={styles.btn} type="submit" value="수정"></input>
        </form>
    </div>
    </article>)
};

export default Update;