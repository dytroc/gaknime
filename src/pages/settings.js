import styles from 'styles/Settings.module.css';
import Checkbox from 'components/Checkbox';
import { useEffect, useState } from 'react';

export default function Settings() {
    const [safetyVideoDisabled, setSafetyVideoDisabled] = useState('on');

    useEffect(() => {
        fill(setSafetyVideoDisabled, 'safety');
    }, []);

    return <div className={styles.main}>
        <div className={styles.title}>설정</div>
        <div className={styles.category}>알림</div>
        <Checkbox label={'주의사항 영상 끄기'} value={safetyVideoDisabled === 'on'} setValue={(value) => {
            change(setSafetyVideoDisabled, 'safety', value)
        }} />
    </div>;

    function fill(set, name) {
        set(localStorage.getItem(name) || '')
    }

    function change(set, name, value) {
        set(value)
        localStorage.setItem(name, value);
    }
}