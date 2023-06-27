import styles from "./index.module.css";
import {useState} from "react";

const List=(props)=>{
    const _id=props.id;
    console.log(props.emoji);
    return(
        <li key={_id} className={styles.list}>
            <span>
            <input className={styles.check} id={_id} type="checkbox"  checked={props.checked} onChange={props.onChecked} />
            {props.content}
            </span>
            <span className={styles.btns}>
            {props.emoji}
            <input className={styles.btn} id={_id} type="button" value="수정" onClick={props.onUpdate}/>
            <input className={styles.btn} id={_id} type="button" value="삭제" onClick={props.onRemove}/>
            </span>
        </li>
    )

};

export default List;