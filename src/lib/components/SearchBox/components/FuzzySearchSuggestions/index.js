import React, { useState, useEffect, useRef } from "react";
import { getSearchSuggestions } from "../../api/searchSuggestions";
import useDebounce from "../../../../hooks/useDebounce";
import styles from "./index.module.scss";

/**
 * 搜索建议下拉列表组件
 */
function FuzzySearchSuggestions({ inputValue, engine, isVisible, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const suggestionsRef = useRef(null);

  // 使用防抖hook
  useDebounce(
    () => {
      if (inputValue && isVisible) {
        fetchSuggestions();
      }
    },
    [inputValue, isVisible, engine],
    300
  );

  // 获取搜索建议
  const fetchSuggestions = async () => {
    setLoading(true);
    try {
      const data = await getSearchSuggestions(inputValue, engine);
      setSuggestions(data || []);
    } catch (error) {
      console.error("获取搜索建议失败:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // 处理键盘导航
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === suggestions.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev === 0 ? suggestions.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        onSelect(suggestions[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, suggestions, activeIndex, onSelect]);

  // 滚动到活动项
  useEffect(() => {
    if (activeIndex >= 0 && suggestionsRef.current) {
      const activeElement = suggestionsRef.current.children[activeIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  // 处理点击外部关闭
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        // 这里不直接关闭，而是通知父组件处理
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  if (!isVisible || (suggestions.length === 0 && !loading)) {
    return null;
  }

  return (
    <div className={styles.suggestionsContainer} ref={suggestionsRef}>
      {loading ? (
        <div className={styles.loadingItem}>加载中...</div>
      ) : suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className={`${styles.suggestionItem} ${
              index === activeIndex ? styles.active : ""
            }`}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            {suggestion}
          </div>
        ))
      ) : (
        <div className={styles.noResultsItem}>无搜索建议</div>
      )}
    </div>
  );
}

export default FuzzySearchSuggestions;
