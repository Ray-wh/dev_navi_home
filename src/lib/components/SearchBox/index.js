"use client";

import React, { useState, useCallback } from "react";
import { Input } from "antd";
import PrefixIcon from "./components/PrefixIcon";
import SuffixIcon from "./components/SuffixIcon";
import SearchEnginePanel from "./components/SearchEnginePanel";
import FuzzySearchSuggestions from "./components/FuzzySearchSuggestions";
import { ACTIVE_PANEL } from './contants/panelTypes';
import styles from "./index.module.scss";


const SearchBox = () => {
  const [activePanel, setActivePanel] = useState(ACTIVE_PANEL.NONE);
  const [searchValue, setSearchValue] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("Google"); // 默认选择Google

  // 处理搜索值变化
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchValue(value);
    // 有搜索内容时显示搜索建议面板
    setActivePanel(value.length > 0 ? ACTIVE_PANEL.SEARCH : ACTIVE_PANEL.NONE);
  }, []);

  // 切换展开面板显示状态
  const toggleEnginePanel = useCallback(() => {
    if (activePanel === ACTIVE_PANEL.ENGINE_PANEL) {
      setActivePanel(ACTIVE_PANEL.NONE);
    } else {
      // 无论当前是SEARCH还是NONE状态，都切换到ENGINE_PANEL
      setActivePanel(ACTIVE_PANEL.ENGINE_PANEL);
    }
  }, [activePanel]);

  // 处理输入框聚焦
  const handleInputFocus = useCallback(() => {
    if (searchValue.length > 0) {
      setActivePanel(ACTIVE_PANEL.SEARCH);
    }
  }, [searchValue]);

  // 处理输入框失去焦点
    const handleInputBlur = useCallback(() => {
      // 失去焦点且无搜索内容时，不显示任何面板
      if (searchValue.length === 0) {
        setActivePanel(ACTIVE_PANEL.NONE);
      }
    }, [searchValue]);

    // 处理搜索引擎选择
    const handleEngineSelect = useCallback((engine) => {
      setSelectedEngine(engine);
      setActivePanel(ACTIVE_PANEL.NONE); // 选择后关闭面板
    }, []);

  return (
    <div className={styles.searchContainer}>
      <Input
        placeholder="请输入搜索内容"
        variant="outlined"
        autoComplete="off"
        value={searchValue}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className={styles.searchInput}
        prefix={
            <PrefixIcon
              isExpanded={activePanel === ACTIVE_PANEL.ENGINE_PANEL}
              onClick={toggleEnginePanel}
            />
          }
        suffix={<SuffixIcon setSearchValue={setSearchValue} />}
      />

      {/* Search Engine Panel */}
        {activePanel === ACTIVE_PANEL.ENGINE_PANEL && (
          <SearchEnginePanel 
            key={selectedEngine} // 添加key确保组件重新渲染
            onSelect={handleEngineSelect} 
            selectedEngine={selectedEngine} 
          />
        )}

      {/* 模糊搜索建议 */}
        {activePanel === ACTIVE_PANEL.SEARCH && (
          <FuzzySearchSuggestions 
            inputValue={searchValue} 
            engine={selectedEngine.toLowerCase()} 
            isVisible={activePanel === ACTIVE_PANEL.SEARCH} 
            onSelect={(suggestion) => setSearchValue(suggestion)} 
          />
        )}
    </div>
  );
};


export default SearchBox;
