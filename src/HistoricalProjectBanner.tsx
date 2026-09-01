import styles from './HistoricalProjectBanner.module.css';

export default function HistoricalProjectBanner() {
    return (
        <aside className={styles.banner} aria-label="Project context">
            <strong>Student project from 2022.</strong>{' '}
            Kept online as an old portfolio piece. This is not an example of my
            current work.
        </aside>
    );
}
