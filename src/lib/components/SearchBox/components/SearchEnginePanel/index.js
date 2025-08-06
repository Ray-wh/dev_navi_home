import React from 'react';
import { SEARCH_ENGINES } from '../../contants/engineType';
import styles from './index.module.scss';

/**
 * 搜索引擎选择面板组件
 */
function SearchEnginePanel({ onSelect, selectedEngine }) {
  return (
    <div className={styles.expandedPanel}>
      <div className={styles.panelTitle}>Select Search Engine</div>
      <div className={styles.searchEngineOptions}>
        {SEARCH_ENGINES.map((engine) => (
          <div 
            key={engine.id}
            className={`${styles.engineOption} ${selectedEngine === engine.name ? styles.selected : ''}`}
            onClick={() => onSelect(engine.name)}
          >
            {engine.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchEnginePanel;