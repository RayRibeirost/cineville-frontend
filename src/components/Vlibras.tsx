"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    VLibras: {
      Widget: new (url: string) => void;
    };
  }
}

export default function VLibras() {
  useEffect(() => {
    const container = document.createElement("div");
    container.setAttribute("vw", "");
    container.className = "enabled";

    const button = document.createElement("div");
    button.setAttribute("vw-access-button", "");
    button.className = "active";

    const wrapper = document.createElement("div");
    wrapper.setAttribute("vw-plugin-wrapper", "");

    const topWrapper = document.createElement("div");
    topWrapper.className = "vw-plugin-top-wrapper";

    wrapper.appendChild(topWrapper);
    container.appendChild(button);
    container.appendChild(wrapper);

    document.body.appendChild(container);

    return () => {
      container.remove();
    };
  }, []);

  return (
    <Script
      src="https://vlibras.gov.br/app/vlibras-plugin.js"
      strategy="afterInteractive"
      onLoad={() => {
        new window.VLibras.Widget("https://vlibras.gov.br/app");
      }}
    />
  );
}
