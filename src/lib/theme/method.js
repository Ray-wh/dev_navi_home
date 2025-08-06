"use client";

import React from "react";
import { ConfigProvider } from "antd";

export const WithTheme = ({ theme, children }) => (
  <ConfigProvider theme={theme}>{children}</ConfigProvider>
);
