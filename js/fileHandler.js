export function setupFileInput(fileInputElement, callback) {
    fileInputElement.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file, callback);
        }
    });
}

export function setupDropZone(dropZoneElement, callback) {
    dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add('drag-over');
    });

    dropZoneElement.addEventListener('dragleave', () => {
        dropZoneElement.classList.remove('drag-over');
    });

    dropZoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZoneElement.classList.remove('drag-over');

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file, callback);
        }
    });
}

export async function readFromClipboard(callback) {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            callback(text);
        } else {
            throw new Error('剪贴板为空');
        }
    } catch (error) {
        throw new Error('无法读取剪贴板，请确保已授予权限');
    }
}

export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        throw new Error('无法复制到剪贴板');
    }
}

function handleFile(file, callback) {
    if (!file.name.endsWith('.json')) {
        throw new Error('请选择 JSON 文件');
    }

    if (file.size > 10 * 1024 * 1024) {
        if (!confirm('文件大于 10MB，可能需要较长时间处理。是否继续？')) {
            return;
        }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        callback(e.target.result);
    };
    reader.onerror = () => {
        throw new Error('文件读取失败');
    };
    reader.readAsText(file);
}
