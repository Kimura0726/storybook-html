import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  async viteFinal(config) {
    // HTMLファイルをアセットとして扱う設定を追加
    config.assetsInclude = [/\.html$/];

    // または配列がすでに存在する場合は追加する
    // if (Array.isArray(config.assetsInclude)) {
    //   config.assetsInclude.push(/\.html$/);
    // } else {
    //   config.assetsInclude = [config.assetsInclude, /\.html$/].filter(Boolean);
    // }

    return config;
  },
};
export default config;
