import { useEffect, useRef } from 'react';

/**
 * 防抖hook
 * @param {Function} callback - 要防抖的函数
 * @param {Array} dependencies - 依赖项数组
 * @param {number} delay - 防抖延迟时间(毫秒)
 * @returns {void}
 */
function useDebounce(callback, dependencies, delay = 300) {
  // 保存定时器ID
  const timeoutRef = useRef(null);

  useEffect(() => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 设置新的定时器
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    // 清除函数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [...dependencies, delay]); // 依赖项变化时重新设置防抖
}

export default useDebounce;