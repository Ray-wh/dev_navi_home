import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

/**
 * 前缀图标组件
 */
function PrefixIcon({ isExpanded, onClick }) {
  return (
    <div className={styles.prefixIconContainer} onClick={onClick}>
      <Image src="/file.svg" alt="文件" width={20} height={20} />
      <Image
        src="/vercel.svg"
        alt="Vercel"
        width={10} height={10}
        className={`${styles.vercelLogo} ${isExpanded ? styles.rotated : ''}`}
      />
    </div>
  );
}

export default PrefixIcon;