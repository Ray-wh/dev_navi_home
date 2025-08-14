"use client";

import React from "react";
import { setupAntdRender } from "@/utils/antd-render";
import { geistSans, geistMono } from "@/utils/setup-fonts";
import { useMetadata } from "@/utils/use-metadata";
import { RootStoreProvider } from "@/store";
import "@/styles/globals.scss";

// 初始化Ant Design渲染
setupAntdRender();

export default function RootLayout({ children }) {
  // 使用元数据
  useMetadata();
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <RootStoreProvider>{children}</RootStoreProvider>
      </body>
    </html>
  );
}
