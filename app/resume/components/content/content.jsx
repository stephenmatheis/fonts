import { Experience } from '@/components/experience';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';
import styles from './content.module.scss';

export function Content({}) {
    return (
        <div className={styles.resume}>
            <section className={styles.left}>
                <Skills />
                <Projects />
                <Contact />
            </section>
            <section className={styles.right}>
                <Experience />
            </section>
        </div>
    );
}
