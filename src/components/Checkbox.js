import styles from './Checkbox.module.css';

export default function Checkbox({ id, width = '100%', label = '', value = false, setValue = (value) => {} }) {
    return <div className={styles.main} style={{
        width
    }}>
        <div className={styles.label}>{label}</div>
        <div className={styles.checkbox + (value ? ' ' + styles.on : '')} onClick={() => {
            setValue(!value ? 'on' : 'off')
        }}>
            <div className={styles.round} />
        </div>
    </div>;
}