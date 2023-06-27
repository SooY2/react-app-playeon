import styles from "./index.module.css";
import { useState } from "react";

const Create=(props)=>{

    const [content,setContent]=useState("");
    
    return (<article >
        <h3 className={styles.title}>일정 추가하기</h3>
        <div className={styles.container}>
        <form className={styles.contentbox} onSubmit={event=>{
            event.preventDefault();
            const _content=event.target.content.value;
            props.onClick(_content);
            setContent("");
        }}>
            <textarea className={styles.textarea} name="content" value={content} placeholder="일정을 입력하세요!" onChange={(e)=>{
                setContent(e.target.value);
            }}></textarea>
            <input className={styles.btn} type="submit" value="추가"></input>
        </form>
    </div>
    </article>)
};

export default Create;