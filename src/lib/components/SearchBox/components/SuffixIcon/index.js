import React from 'react';
import Image from 'next/image';
import styles from './index.module.scss';

/**
 * 后缀图标组件
 */
function SuffixIcon({ setSearchValue }) {
  return (
    <div
      className={styles.suffixIconContainer}
      onClick={() => setSearchValue("")}
    >
      <Image src="/vercel.svg" alt="Vercel" width={10} height={10} />
    </div>
  );
}

export default SuffixIcon;