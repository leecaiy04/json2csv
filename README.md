# JSON to CSV/Excel 转换器

纯前端的 JSON 转 CSV/Excel 工具，支持网页版和桌面应用。

[![GitHub release](https://img.shields.io/github/v/release/leecaiy04/json2csv)](https://github.com/leecaiy04/json2csv/releases)
[![License](https://img.shields.io/github/license/leecaiy04/json2csv)](LICENSE)

## 🌐 在线使用

**无需安装，直接在浏览器中使用：**

- **推荐版本**：https://leecaiy04.github.io/json2csv/simple.html
- 模块化版本：https://leecaiy04.github.io/json2csv/

## 📥 下载桌面应用

从 [Releases 页面](https://github.com/leecaiy04/json2csv/releases) 下载适合你系统的版本：

- **Windows**: `JSON-to-CSV-Converter_x.x.x_x64_en-US.msi`
- **macOS**: `JSON-to-CSV-Converter_x.x.x_x64.dmg`
- **Linux**: `json-to-csv-converter_x.x.x_amd64.deb` 或 `.AppImage`

桌面应用优势：
- 🚀 独立运行，无需浏览器
- 💾 更好的文件系统集成
- 🔒 完全离线使用

## ✨ 功能特点

- 📁 **多种输入方式**：拖拽文件、选择文件、从剪贴板粘贴、直接输入
- 🔍 **智能路径检测**：自动识别 JSON 中的对象数组
- 🌳 **支持嵌套结构**：自动展平嵌套对象（最多3层）
- 🛤️ **自定义路径**：支持 JSONPath 语法（如 `$.data.users`）
- 👀 **实时预览**：显示前10行数据
- 📊 **多种导出格式**：
  - CSV（带 UTF-8 BOM，Excel 完美支持中文）
  - Excel (XLSX)
  - 复制到剪贴板
- 🇨🇳 **中文支持**：完整的中文界面
- 🚀 **纯前端**：无需后端服务器

## 📖 使用方法

### 网页版

1. 访问 https://leecaiy04.github.io/json2csv/simple.html
2. 输入 JSON 数据（四种方式任选）：
   - 拖拽 JSON/TXT 文件到页面
   - 点击拖拽区域选择文件
   - 直接在文本框中粘贴
   - 点击"从剪贴板粘贴"按钮
3. 点击"🔄 转换"按钮
4. 选择要转换的数组路径（自动检测或自定义）
5. 查看预览
6. 点击导出按钮：
   - 📥 下载 CSV
   - 📊 下载 Excel (XLSX)
   - 📋 复制到剪贴板

### 桌面应用

1. 从 [Releases](https://github.com/leecaiy04/json2csv/releases) 下载对应平台的安装包
2. 安装并运行应用
3. 使用方法与网页版相同

## 🧪 测试示例

### 简单数组
```json
[
  {"name": "张三", "age": 25, "city": "北京"},
  {"name": "李四", "age": 30, "city": "上海"}
]
```

### 嵌套结构
```json
{
  "users": [
    {
      "name": "王五",
      "age": 28,
      "address": {
        "city": "广州",
        "district": "天河区"
      }
    }
  ]
}
```

仓库中包含 `test-data.json` 测试文件，可用于测试多路径选择功能。

## 🛠️ 技术栈

### 网页版
- 纯 HTML/CSS/JavaScript (ES6)
- [PapaParse](https://www.papaparse.com/) - CSV 生成
- [SheetJS (XLSX)](https://sheetjs.com/) - Excel 生成
- 无需构建工具，直接运行

### 桌面应用
- [Tauri](https://tauri.app/) - 跨平台桌面应用框架
- Rust + Web 技术
- 自动化 GitHub Actions 构建

## 🌍 浏览器兼容性

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📝 注意事项

- 大文件（>10MB）会有性能提示
- 嵌套对象会自动展平（最多3层）
- 数组字段会转为 JSON 字符串
- CSV 文件包含 UTF-8 BOM，确保 Excel 正确显示中文

## 🔧 本地开发

### 网页版
```bash
# 克隆仓库
git clone https://github.com/leecaiy04/json2csv.git
cd json2csv

# 直接用浏览器打开 simple.html
```

### 桌面应用开发
```bash
# 安装依赖
npm install

# 开发模式
npm run tauri:dev

# 构建应用
npm run tauri:build
```

## 📦 版本历史

- **v1.1.0** - 添加 Tauri 桌面应用支持
- **v1.0.0** - 首个版本发布，支持 JSON 转 CSV/Excel

查看完整的 [Release Notes](https://github.com/leecaiy04/json2csv/releases)

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 🔗 相关链接

- [在线使用](https://leecaiy04.github.io/json2csv/simple.html)
- [GitHub 仓库](https://github.com/leecaiy04/json2csv)
- [下载桌面应用](https://github.com/leecaiy04/json2csv/releases)
- [报告问题](https://github.com/leecaiy04/json2csv/issues)

