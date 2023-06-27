import List from "../List";
import styles from "./index.module.css";

/**일정 목록들을 나타내주는 컴포넌트
 * props : 목록 배열
 */
const Lists=(props)=>{
    //map함수 이용해서 출력하기
    //console.log(props.plans);
    return(
        <nav className={styles.container}>
             <ul>
                 {props.plans.map(plan=>(
                    <List key={plan.plan_id} id={plan.plan_id} content={plan.content} emoji={plan.emoji} checked={plan.is_checked}
                        onRemove={(e)=>{
                            e.preventDefault(); 
                            props.onRemove(Number(e.target.id));
                        }}
                        onUpdate={(e)=>{
                            e.preventDefault();
                            props.changeMode(Number(e.target.id));
                        }}
                        onChecked={(e)=>{
                            //e.preventDefault();
                            props.isChecked(Number(e.target.id),e.target.checked);
                        }}
                        ></List>
                 ))}
             </ul>
         </nav>
    )

    /* for문 이용해서 목록 출력하기
    const list=[];
    for(let i=0;i<props.plans.length;i++){
        let p=props.plans[i];
        list.push(<List key={p.id} content={p.content}></List>)
    }
    return (
        <nav className={styles.container}>
            <ul>
                {list}
            </ul>
        </nav>
    )*/
    

};

export default Lists;