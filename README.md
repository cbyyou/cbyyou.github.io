# 个人主页

无需安装依赖的静态个人主页，适合 GitHub Pages。包含响应式布局、浅色/深色切换、中英文切换、页内导航；全部资源在本地，不依赖第三方 CDN。

## 本地查看

直接双击 `index.html` 即可查看。也可以在本目录执行 `python -m http.server 8000`，访问 `http://localhost:8000`。

## 修改内容

- `index.html`：姓名、中英文名、个人介绍、研究兴趣、项目及联系方式。
- `styles.css`：配色、字号、间距和手机布局。
- `script.js`：英文翻译、语言及主题切换、年份和当前导航状态。

默认显示中文；点击右上角“中文 / EN”切换整页语言，浏览器会记住选择。中文内容在 `index.html` 中编辑，对应英文在 `script.js` 的 `translations` 中编辑。
- `favicon.svg`、`assets/brand-mark.svg`：浏览器图标与左上角电路标识。
- `assets/portrait.jpg`：白底个人照片。

当前姓名及研究兴趣是草稿，请发布前核对；学术背景已补充四川大学 2023 级本科及北京航空航天大学计算机学院、计算机科学与工程、2027 级博士研究生信息，已移除 GPA、排名和英语成绩；论文未代填；邮箱和 GitHub 已补充。项目区已补充 2026 年集创赛 RISC-V CPU 项目，根据已有讲稿、简历及设计仿真报告整理。团队验证结果已从页面移除。左侧已使用白底个人照片，保留原图比例；需要换照片时替换 `assets/portrait.jpg`。

联系邮箱为 cby15222354810@163.com，GitHub 为 https://github.com/cbyyou 。两种语言下均显示同一组链接。

## 发布到 GitHub Pages

1. 创建公开仓库，名称为 `你的GitHub用户名.github.io`。已有同名仓库时，先检查其中内容，避免覆盖。
2. 将本文件夹里的文件上传到仓库根目录，不要多套一层 `personal-homepage` 目录。
3. 打开仓库 Settings → Pages。
4. Source 选择 Deploy from a branch，Branch 选择 main，目录选择 / (root)，保存。
5. 等待部署成功，访问 `https://你的GitHub用户名.github.io`。

`.nojekyll` 为可选文件；此站不依赖 Jekyll 或 GitHub Actions 自定义构建配置。不需要 npm、Ruby 或服务器。

所有页面内资源均使用相对路径，因此也可以放在项目站点的子路径中。后续更新并提交文件即可重新发布。

## 校徽资源

两校校徽作为教育经历的识别标识使用，保留原色与比例。资源来源：

- 北京航空航天大学官网：https://www.buaa.edu.cn/xygk/jrbh/bhxh.htm
- 四川大学官网：https://www.scu.edu.cn/xxgk/cdbs.htm
