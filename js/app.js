import { parseJSON, detectArrayPaths, getValueByPath } from './jsonParser.js';
import { convertToCSV, downloadCSV, downloadExcel, generatePreview } from './csvConverter.js';
import { setupFileInput, setupDropZone, readFromClipboard, copyToClipboard } from './fileHandler.js';
import { showToast, showPathOptions, showPreview, showActions, getSelectedPath, clearInput } from './ui.js';

let currentData = null;
let currentPaths = [];

function init() {
    const fileInput = document.getElementById('fileInput');
    const fileBtn = document.getElementById('fileBtn');
    const clipboardBtn = document.getElementById('clipboardBtn');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const dropZone = document.getElementById('dropZone');
    const jsonInput = document.getElementById('jsonInput');
    const applyPathBtn = document.getElementById('applyPathBtn');
    const downloadCsvBtn = document.getElementById('downloadCsvBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const copyBtn = document.getElementById('copyBtn');

    fileBtn.addEventListener('click', () => fileInput.click());

    setupFileInput(fileInput, handleJSONInput);
    setupDropZone(dropZone, handleJSONInput);

    clipboardBtn.addEventListener('click', async () => {
        try {
            await readFromClipboard((text) => {
                jsonInput.value = text;
                showToast('已从剪贴板粘贴', 'success');
            });
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    convertBtn.addEventListener('click', () => {
        const value = jsonInput.value.trim();
        if (value) {
            handleJSONInput(value);
        } else {
            showToast('请先输入 JSON 数据', 'error');
        }
    });

    clearBtn.addEventListener('click', () => {
        clearInput();
        currentData = null;
        currentPaths = [];
        showToast('已清除', 'success');
    });

    applyPathBtn.addEventListener('click', () => {
        const customPath = document.getElementById('customPath').value.trim();
        if (customPath && currentData) {
            processPath(customPath);
        }
    });

    document.getElementById('pathOptions').addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
            processPath(e.target.value);
        }
    });

    downloadCsvBtn.addEventListener('click', () => {
        try {
            const selectedPath = getSelectedPath() || document.getElementById('customPath').value.trim();
            const data = getValueByPath(currentData, selectedPath);
            const csv = convertToCSV(data);
            const filename = `export_${new Date().getTime()}.csv`;
            downloadCSV(csv, filename);
            showToast('CSV 已下载', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    downloadExcelBtn.addEventListener('click', () => {
        try {
            const selectedPath = getSelectedPath() || document.getElementById('customPath').value.trim();
            const data = getValueByPath(currentData, selectedPath);
            const filename = `export_${new Date().getTime()}.xlsx`;
            downloadExcel(data, filename);
            showToast('Excel 已下载', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    });

    copyBtn.addEventListener('click', async () => {
        try {
            const selectedPath = getSelectedPath() || document.getElementById('customPath').value.trim();
            const data = getValueByPath(currentData, selectedPath);
            const csv = convertToCSV(data);
            await copyToClipboard(csv);
            showToast('已复制到剪贴板', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    });
}

function handleJSONInput(jsonString) {
    const result = parseJSON(jsonString);

    if (!result.success) {
        showToast(result.error, 'error');
        return;
    }

    currentData = result.data;
    document.getElementById('jsonInput').value = JSON.stringify(currentData, null, 2);

    currentPaths = detectArrayPaths(currentData);
    showPathOptions(currentPaths);

    if (currentPaths.length > 0) {
        processPath(currentPaths[0].path);
    }

    showToast('JSON 解析成功', 'success');
}

function processPath(path) {
    try {
        const data = getValueByPath(currentData, path);

        if (!Array.isArray(data)) {
            showToast('所选路径不是数组', 'error');
            return;
        }

        if (data.length === 0) {
            showToast('所选数组为空', 'error');
            return;
        }

        const previewHtml = generatePreview(data);
        showPreview(previewHtml);
        showActions();
    } catch (error) {
        showToast('路径处理失败: ' + error.message, 'error');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
