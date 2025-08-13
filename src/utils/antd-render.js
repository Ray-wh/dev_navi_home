"use client";

import { createRoot } from "react-dom/client";
import { unstableSetRender } from "antd";

// 配置Ant Design与React 18的兼容性
export function setupAntdRender() {
  unstableSetRender((node, container) => {
    container._reactRoot ||= createRoot(container);
    const root = container._reactRoot;
    root.render(node);
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
}
