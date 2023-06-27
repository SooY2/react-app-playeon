import styles from "./Logo.module.css";

const Logo=()=>{
    return (
        <div className={styles.container}>
            <img src={require("../assets/Logo.png")} alt="로고"></img>
            <p>계획을 가지고 놀아보세요!</p>
        </div>
    )
};

export default Logo;