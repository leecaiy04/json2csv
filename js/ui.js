export function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';

    if (type === 'error') {
        toast.classList.add('error');
    } else if (type === 'success') {
        toast.classList.add('success');
    }

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

export function showPathOptions(paths) {
    const pathSection = document.getElementById('pathSection');
    const pathOptions = document.getElementById('pathOptions');

    if (paths.length === 0) {
        pathOptions.innerHTML = '<p style="color: #666;">未检测到对象数组，请使用自定义路径</p>';
        pathSection.style.display = 'block';
        return;
    }

    let html = '';
    paths.forEach((pathInfo, index) => {
        const id = `path-${index}`;
        html += `
            <div class="path-option">
                <input type="radio" name="jsonPath" id="${id}" value="${pathInfo.path}" ${index === 0 ? 'checked' : ''}>
                <label for="${id}">
                    <strong>${pathInfo.path}</strong>
                    <span class="path-info">(${pathInfo.count} 项)</span>
                </label>
            </div>
        `;
    });

    pathOptions.innerHTML = html;
    pathSection.style.display = 'block';
}

export function showPreview(html) {
    const previewSection = document.getElementById('previewSection');
    const previewContainer = document.getElementById('previewContainer');

    previewContainer.innerHTML = html;
    previewSection.style.display = 'block';
}

export function showActions() {
    const downloadCsvBtn = document.getElementById('downloadCsvBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const copyBtn = document.getElementById('copyBtn');

    downloadCsvBtn.disabled = false;
    downloadExcelBtn.disabled = false;
    copyBtn.disabled = false;
}

export function hidePathOptions() {
    document.getElementById('pathSection').style.display = 'none';
}

export function hidePreview() {
    document.getElementById('previewSection').style.display = 'none';
}

export function hideActions() {
    const downloadCsvBtn = document.getElementById('downloadCsvBtn');
    const downloadExcelBtn = document.getElementById('downloadExcelBtn');
    const copyBtn = document.getElementById('copyBtn');

    downloadCsvBtn.disabled = true;
    downloadExcelBtn.disabled = true;
    copyBtn.disabled = true;
}

export function getSelectedPath() {
    const selected = document.querySelector('input[name="jsonPath"]:checked');
    return selected ? selected.value : null;
}

export function clearInput() {
    document.getElementById('jsonInput').value = '';
    document.getElementById('customPath').value = '';
    hidePathOptions();
    hidePreview();
    hideActions();
}
