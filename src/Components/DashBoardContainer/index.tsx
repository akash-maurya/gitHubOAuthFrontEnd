import styles from "./dashboard.module.scss";
import Card from "./card";
const DashboardContainer = () => {
    return (
        <div>
            <div className={styles.header}>
                <span>Dashboard</span>
            </div>

            <div className={styles.body}>
                <Card />
            </div>
        </div>
    );
};
export default DashboardContainer;
