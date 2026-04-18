export function flattenObject(obj, prefix = '', maxDepth = 3, currentDepth = 0) {
    const flattened = {};

    if (currentDepth >= maxDepth) {
        flattened[prefix] = JSON.stringify(obj);
        return flattened;
    }

    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const newKey = prefix ? `${prefix}_${key}` : key;

        if (value === null || value === undefined) {
            flattened[newKey] = '';
        } else if (Array.isArray(value)) {
            flattened[newKey] = JSON.stringify(value);
        } else if (typeof value === 'object' && value !== null) {
            Object.assign(flattened, flattenObject(value, newKey, maxDepth, currentDepth + 1));
        } else {
            flattened[newKey] = value;
        }
    }

    return flattened;
}

export function convertToCSV(data) {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('数据必须是非空数组');
    }

    const flattenedData = data.map(item => flattenObject(item));

    const csv = Papa.unparse(flattenedData, {
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ',',
        header: true,
        newline: '\r\n'
    });

    return csv;
}

export function downloadCSV(csvContent, filename = 'data.csv') {
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function downloadExcel(data, filename = 'data.xlsx') {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('数据必须是非空数组');
    }

    const flattenedData = data.map(item => flattenObject(item));

    const worksheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, filename);
}

export function generatePreview(data, maxRows = 10) {
    if (!Array.isArray(data) || data.length === 0) {
        return '<p>没有数据可预览</p>';
    }

    const previewData = data.slice(0, maxRows);
    const flattenedData = previewData.map(item => flattenObject(item));

    if (flattenedData.length === 0) {
        return '<p>没有数据可预览</p>';
    }

    const headers = Object.keys(flattenedData[0]);

    let html = '<table class="preview-table"><thead><tr>';
    headers.forEach(header => {
        html += `<th>${escapeHtml(header)}</th>`;
    });
    html += '</tr></thead><tbody>';

    flattenedData.forEach(row => {
        html += '<tr>';
        headers.forEach(header => {
            const value = row[header] !== undefined ? row[header] : '';
            html += `<td>${escapeHtml(String(value))}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';

    if (data.length > maxRows) {
        html += `<p style="margin-top: 10px; color: #666; font-size: 0.9em;">显示前 ${maxRows} 行，共 ${data.length} 行</p>`;
    }

    return html;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
