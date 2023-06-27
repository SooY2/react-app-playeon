import styles from "./index.module.css";

const Login=(props)=>{
    return <input className={styles.login} type="text" name={props.name} placeholder={props.placeholder}></input>
}

export default Login;