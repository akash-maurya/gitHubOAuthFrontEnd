import LogingSignUp from "../LoginSignup";
import styles from "./homepage.module.scss";

const Homepage = () => {
    return (
        <div className={styles.container}>
            <LogingSignUp />
        </div>
    );
};
export default Homepage;
