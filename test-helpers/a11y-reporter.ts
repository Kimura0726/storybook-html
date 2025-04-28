import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import * as fs from "fs";
import * as path from "path";

// レポート保存用ディレクトリ
const REPORT_DIR = path.join(process.cwd(), "a11y-reports");

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

// 型定義の拡張
type A11yTestFunction = (
  storyId: string,
  tags?: string[]
) => Promise<{
  results: any;
  reportPath: string;
}>;

// テスト拡張機能を作成
export const test = base.extend<{
  runA11yTest: A11yTestFunction;
}>({
  runA11yTest: async ({ page }, use) => {
    const runTest: A11yTestFunction = async (storyId, tags) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`);

      // テスト結果取得
      let axeBuilder = new AxeBuilder({ page });
      if (tags && tags.length > 0) {
        axeBuilder = axeBuilder.withTags(tags);
      }
      const results = await axeBuilder.analyze();

      // レポートファイル名を生成（テスト名と日時）
      const fileName = `${storyId.replace(/[\/\\?%*:|"<>]/g, "-")}-${Date.now()}.html`;
      const reportPath = path.join(REPORT_DIR, fileName);

      // レポート生成
      const reportHTML = createHtmlReport({
        results,
        options: {
          projectKey: storyId,
          doNotCreateReportFile: true,
        },
      });

      // レポートをファイルに保存
      fs.writeFileSync(reportPath, reportHTML);

      return { results, reportPath };
    };

    await use(runTest);
  },
});

export { expect } from "@playwright/test";
