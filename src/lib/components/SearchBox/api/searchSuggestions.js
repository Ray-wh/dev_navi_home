// 搜索引擎建议API服务

/**
 * 获取搜索引擎建议
 * @param {string} query - 搜索查询词
 * @param {string} engine - 搜索引擎名称 (google, bing, yahoo, duckduckgo)
 * @returns {Promise<Array<string>>} - 搜索建议列表
 */
export async function getSearchSuggestions(query, engine = 'google') {
  if (!query.trim()) {
    return [];
  }

  try {
    // 定义各搜索引擎的API端点
    const engineAPIs = {
      google: `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(query)}`,
      bing: `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(query)}`,
      yahoo: `https://search.yahoo.com/sugg/os/ysug?command=${encodeURIComponent(query)}&output=json`,
      duckduckgo: `https://duckduckgo.com/ac/?q=${encodeURIComponent(query)}&type=list`,
    };

    // 获取对应的API URL
    const apiUrl = engineAPIs[engine.toLowerCase()] || engineAPIs.google;
    console.log(`请求搜索建议API: ${apiUrl}`);

    // 添加超时处理
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
        cache: 'no-store',
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, url: ${apiUrl}`);
      }

      // 解析响应数据
      const data = await response.json();
      console.log(`搜索引擎响应:`, data);

      // 处理不同搜索引擎的响应格式
      let suggestions = [];
      if (engine.toLowerCase() === 'google') {
        // Google格式: [查询词, [建议1, 建议2, ...]]
        suggestions = data[1] || [];
      } else if (engine.toLowerCase() === 'bing') {
        // Bing格式: [查询词, [建议1, 建议2, ...]]
        suggestions = data[1] || [];
      } else if (engine.toLowerCase() === 'yahoo') {
        // Yahoo格式: { r: [{ k: '建议1' }, { k: '建议2' }, ...] }
        suggestions = data.r?.map(item => item.k) || [];
      } else if (engine.toLowerCase() === 'duckduckgo') {
        // DuckDuckGo格式: [{ phrase: '建议1' }, { phrase: '建议2' }, ...]
        suggestions = data.map(item => item.phrase) || [];
      }

      return suggestions;
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error(`请求超时: ${apiUrl}`);
      }
      throw new Error(`fetch失败: ${fetchError.message}, url: ${apiUrl}`);
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error('获取搜索建议失败:', error);
    throw error;
  }
}