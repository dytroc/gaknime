import styles from 'styles/Settings.module.css';
import Checkbox from 'components/Checkbox';
import { useEffect, useState } from 'react';
import { useGanimeContext } from 'contexts/GanimeContext';

export default function Settings() {
    const [safetyVideoDisabled, setSafetyVideoDisabled] = useState('off');

    const [dark, setDark] = useState('off')
    const { setDarkMode } = useGanimeContext();

    useEffect(() => {
        fill(setSafetyVideoDisabled, 'safety');
        fill(setDark, 'dark');
    }, []);

    return <div className={styles.main}>
        <div className={styles.title}>설정</div>
        <div className={styles.category}>디스플레이</div>
        <Checkbox label={'다크 모드'} value={dark === 'on'} setValue={(value) => {
            change(setDark, 'dark', value);
            setDarkMode(value);
        }} />
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