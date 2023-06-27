import styles from "./Header.module.css"

const Header=(props)=>{
    return (
        <header>
            <img className={styles.logo} src={require("../assets/Logo.png")} alt="logo"></img>
            <button className={styles.logoutBtn} onClick={props.Logout}>Logout</button>
        </header>
    )
}

export default Header;