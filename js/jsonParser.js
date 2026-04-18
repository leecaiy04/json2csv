export function parseJSON(jsonString) {
    try {
        return {
            success: true,
            data: JSON.parse(jsonString)
        };
    } catch (error) {
        return {
            success: false,
            error: `JSON 解析错误: ${error.message}`
        };
    }
}

export function detectArrayPaths(obj, currentPath = '$', maxDepth = 10, currentDepth = 0) {
    const paths = [];

    if (currentDepth > maxDepth) {
        return paths;
    }

    if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object' && obj[0] !== null) {
        paths.push({
            path: currentPath,
            count: obj.length,
            sample: obj[0]
        });
    }

    if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newPath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;
                const nestedPaths = detectArrayPaths(obj[key], newPath, maxDepth, currentDepth + 1);
                paths.push(...nestedPaths);
            }
        }
    }

    return paths;
}

export function getValueByPath(obj, path) {
    if (path === '$') {
        return obj;
    }

    const parts = path.replace(/^\$\./, '').split('.');
    let current = obj;

    for (const part of parts) {
        if (current === null || current === undefined) {
            return null;
        }
        current = current[part];
    }

    return current;
}
