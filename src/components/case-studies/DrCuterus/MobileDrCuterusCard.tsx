import { motion } from 'framer-motion';
import phoneBezelImg from '../../../assets/images/dr-cuterus/phone-bezel.png';
import sexpertScreenImg from '../../../assets/images/dr-cuterus/sexpert-screen.jpg';
import laptopBezelImg from '../../../assets/images/dr-cuterus/laptop-bezel.png';
import homepageScreenshotImg from '../../../assets/images/dr-cuterus/homepage-screenshot.jpg';
import plushToysImg from '../../../assets/images/dr-cuterus/plush-toys.png';
import styles from './MobileDrCuterusCard.module.css';

/* Mobile counterpart to DrCuterusCard, per Figma 539:1010. Same copy/assets/plush bob
   animation as desktop, resized and repositioned for the mobile card. */
export default function MobileDrCuterusCard() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        <span className={styles.titleItalic}>Website for </span>
        <span className={styles.titleBold}>Dr Cuterus</span>
      </p>

      <div className={styles.tag}>Website design + partial build · Client project</div>

      <p className={styles.body}>
        A creator with almost <span className={styles.bodyBold}>two million followers</span> had
        no site of her own to send patients, brands, or her own DMs to. One site needed to do{' '}
        <span className={styles.bodyBold}>three jobs at once</span>: patient trust, corporate
        credibility, and a place to redirect the questions she couldn&rsquo;t keep answering
        individually, all while still looking professional, approachable, and{' '}
        <span className={styles.bodyBold}>unmistakably her</span>.
      </p>

      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <img src={homepageScreenshotImg} alt="Dr Cuterus homepage" />
        </div>
        <div className={styles.laptopBezel}>
          <img src={laptopBezelImg} alt="" />
        </div>
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneScreen}>
          <img src={sexpertScreenImg} alt="Your Next Door Sexpert feature" />
        </div>
        <div className={styles.phoneBezel}>
          <img src={phoneBezelImg} alt="" />
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
