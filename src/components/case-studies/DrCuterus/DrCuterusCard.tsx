import { motion } from 'framer-motion';
import CardTag from '../../card/CardTag';
import phoneBezelImg from '../../../assets/images/dr-cuterus/phone-bezel.png';
import sexpertScreenImg from '../../../assets/images/dr-cuterus/sexpert-screen.jpg';
import laptopBezelImg from '../../../assets/images/dr-cuterus/laptop-bezel.png';
import homepageScreenshotImg from '../../../assets/images/dr-cuterus/homepage-screenshot.jpg';
import plushToysImg from '../../../assets/images/dr-cuterus/plush-toys.png';
import styles from './DrCuterusCard.module.css';

export default function DrCuterusCard() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Website for</span>
        <span className={styles.titleBold}>Dr Cuterus</span>
      </p>

      <div className={styles.tagWrapper}>
        <CardTag>Website design + partial build · Client project</CardTag>
      </div>

      <p className={styles.body}>
        A creator with almost <span className={styles.bodyBold}>two million followers</span> had
        no site of her own to send patients, brands, or her own DMs to. One site needed to do
        three jobs at once: patient trust, corporate credibility, and a place to redirect the
        questions she couldn&rsquo;t keep answering individually. I led the{' '}
        <span className={styles.bodyBold}>design</span> and helped{' '}
        <span className={styles.bodyBold}>build it in code</span>, working inside a strict
        no-gendered-colors constraint to build a purple-and-yellow system that&rsquo;s hers going
        forward.
      </p>

      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <img src={sexpertScreenImg} alt="Your Next Door Sexpert feature" />
        </div>
        <div className={styles.phoneBezel}>
          <img src={phoneBezelImg} alt="" />
        </div>
      </div>

      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <img src={homepageScreenshotImg} alt="Dr Cuterus homepage" />
        </div>
        <div className={styles.laptopBezel}>
          <img src={laptopBezelImg} alt="" />
        </div>
      </div>

      <motion.div
        className={styles.plush}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={styles.plushInner}>
          <img src={plushToysImg} alt="Plush organ toys" />
        </div>
      </motion.div>
    </div>
  );
}
