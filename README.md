# Liuwei Xu — academic homepage

A self-contained redesign for **https://liuwei1997.github.io/**. The original nine-publication list is retained; the research presentation is reorganized around supershear rupture, fault complexity, and source imaging.

## 本地查看

直接打开 `index.html` 即可查看主要内容。为获得完整的浏览器行为，可在此目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:4173/ 。无需安装 npm、Ruby、Jekyll 或其他依赖。

## 更新到原 GitHub Pages

1. 先备份原仓库，或新建一个分支检查新版。
2. 将此目录内的文件复制到 `liuwei1997.github.io` 仓库根目录，保持 `index.html`、`assets/`、`images/`、`.nojekyll` 在根目录，**不要只上传外层目录**。
3. 在 GitHub 仓库 Settings → Pages 使用 Deploy from a branch，选择对应发布分支的 `/ (root)`。
4. 合并到发布分支后，检查原域名、CV 链接、手机菜单和科研图。

`.nojekyll` 让 GitHub Pages 直接提供静态文件。原 Jekyll 文件可以留作备份，但新版不依赖它们。若仓库另有自定义构建/部署工作流，应先确认该工作流发布的是这套静态文件。此次交付没有推送或发布远程仓库。

## 如何维护

- **研究文字、论文、新闻、简历链接**：编辑 `index.html`。所有核心内容都在 HTML 中，搜索引擎和不运行 JavaScript 的浏览器也能读取。
- **颜色、排版和手机适配**：`assets/style.css`。
- **论文年份过滤、图片放大、动画开关**：`assets/main.js`。
- **地球地图及研究地点**：`assets/home-globe.js`，无需第三方运行库。
- **网页压缩图片**：`assets/*.webp`；点击放大使用 `images/` 中的原图。
- **CV**：`images/CV-LiuweiXu-2026.7.docx.pdf`。
- **社交分享预览**：`assets/social-preview.png`。

新增论文时，在 `.publication-list` 中复制一条 `<article class="publication">`，更新 `data-pub-year`、题名、作者、期刊和 DOI；若新增年份，也更新年份筛选按钮和默认总数。

## 功能

- 亚洲视角研究地球：真实海陆轮廓、5 个近似研究地点、鼠标和键盘交互。
- Mandalay 专题：原始科研图 / 超剪切概念示意切换。
- Noto、PKIKP 与全球超剪切研究图：可放大查看原图。
- Hualien、Maduo、Türkiye 案例可展开，Maduo 动图手动播放。
- 原九篇论文按年份筛选，可展开和复制引用。
- 手机导航、原主页常用锚点兼容、可跳转主要内容、减少动态设置支持。
- 字体和图像本地托管，无分析追踪、Cookie、第三方脚本或运行时网络依赖。外部论文和个人资料仅在点击相应链接时访问。

## 内容与来源

- 论文、履历、荣誉、报告、教学与旧新闻：来自用户提供的原主页源码。
- 任职时间按年份展示（2026–Present），避免原资料中月份差异。
- 未添加新的论文；未加入未公开研究、私人申请材料或其他无关个人文件。
- Mandalay 研究图：Xu et al. (2025), Science, DOI [10.1126/science.ady6100](https://doi.org/10.1126/science.ady6100)。作者公开档案 [Zenodo 17113746](https://doi.org/10.5281/zenodo.17113746)，`Figures.zip/Figure1.png`，许可 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)。原图未修改；网页使用缩小压缩版本，点击后打开原图。
- 其他科研图、头像和 CV：原主页已使用的公开素材。各图归原作者及相应权利人所有。
- 首页地图：Natural Earth 1:110m land，公有领域；来源记录在 `assets/home-globe.js`。地点是概略地理定位，不表示震源定位精度。
- 超剪切概念图：原创 SVG 示意，用于说明物理概念，不是 Mandalay 的数据图或数值模拟结果。
- Inter 字体：SIL Open Font License，见 `assets/Inter-LICENSE.txt`。
