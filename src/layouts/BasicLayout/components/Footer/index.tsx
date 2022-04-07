import styles from './index.module.css';

export default function Footer() {
  return (
    <p className={styles.footer}>
      <span className={styles.logo}>Alibaba Fusion</span>
      <br />
      <span className={styles.copyright}>© 2019-现在 Alibaba Fusion & ICE <a href="https://beian.miit.gov.cn">粤ICP备2022038483号</a></span>
    </p>
  );
}
