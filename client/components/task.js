import styles from '../styles/Task.module.css';

export default function Task(props) {
    return (
        <div className={styles.container} id={props.id}>
            <input className={styles.input} type="checkbox" />
            <p className={styles.task}>{props.task}</p>
            <p className={styles.time}>{props.time}</p>
        </div>

    );
}