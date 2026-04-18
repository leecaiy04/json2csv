# JSON to CSV/Excel 转换器

纯前端的 JSON 转 CSV/Excel 工具，无需后端服务器。

## 功能特点

- ✅ 多种输入方式：拖拽文件、选择文件、从剪贴板粘贴、直接输入
- ✅ 智能路径检测：自动识别 JSON 中的对象数组
- ✅ 支持嵌套结构：自动展平嵌套对象
- ✅ 自定义路径：支持 JSONPath 语法
- ✅ 实时预览：显示前10行数据
- ✅ 多种导出格式：CSV、Excel (XLSX)、复制到剪贴板
- ✅ 中文支持：完整的中文界面，Excel 正确显示中文

## 使用方法

1. 用浏览器打开 `index.html`
2. 输入 JSON 数据（三种方式任选）：
   - 拖拽 JSON 文件到页面
   - 点击"选择文件"按钮
   - 点击"从剪贴板粘贴"
   - 直接在文本框中粘贴
3. 选择要转换的数组路径（自动检测或自定义）
4. 查看预览
5. 点击导出按钮：
   - 📥 下载 CSV
   - 📊 下载 Excel (XLSX)
   - 📋 复制到剪贴板

## 测试示例

使用 `test-data.json` 文件测试，包含两个数组：
- `$.users` - 用户列表
- `$.products` - 产品列表

或直接粘贴简单的 JSON：
```json
[
  {"name": "张三", "age": 25},
  {"name": "李四", "age": 30}
]
```

## 技术栈

- 纯 HTML/CSS/JavaScript（ES6 模块）
- PapaParse - CSV 生成
- SheetJS (XLSX) - Excel 生成
- 无需构建工具，直接运行

## 浏览器兼容性

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 注意事项

- 大文件（>10MB）会有性能提示
- 嵌套对象会自动展平（最多3层）
- 数组字段会转为 JSON 字符串
- CSV 文件包含 UTF-8 BOM，确保 Excel 正确显示中文
