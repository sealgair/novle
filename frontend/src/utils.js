function compare(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}

function randomInt(r, f) {
    f = f || 0;
    return Math.floor(Math.random() * r) + f
}

function randomChoice(arr) {
    return arr[randomInt(arr.length)];
}

function cssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name);
}

function isTouchOnly() {
    return window.matchMedia("(any-hover: none)").matches;
}

function isLightMode() {
    return window.matchMedia("(prefers-color-scheme: light)").matches;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function removeDiacritics(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getData(key, def) {
    let value = localStorage.getItem(key);
    try {
        value = JSON.parse(value);
    } catch {
    }
    if (value === null) {
        value = def;
    }
    return value;
}

function inClass(element, className) {
    if (element.classList.contains(className)) {
        return true;
    }
    if (element.parentElement) {
        return inClass(element.parentElement, className);
    }
    return false;
}

function getLines(ctx, text, off) {
    const maxWidth = ctx.canvas.width - off;
    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function drawArrow(ctx, s) {
    const h = (s / 2);
    ctx.beginPath();
    ctx.moveTo(0, -h);
    ctx.lineTo(-h, 0);
    ctx.lineTo(-h/2, 0);
    ctx.lineTo(-h/2, h);
    ctx.lineTo(h/2, h);
    ctx.lineTo(h/2, 0);
    ctx.lineTo(h, 0);
    ctx.closePath();
    ctx.fill();
}

function drawCheck(ctx, s) {
    ctx.lineWidth = 4;
    const h = (s / 2);
    ctx.beginPath();
    ctx.moveTo(-h, 0);
    ctx.lineTo(-2, h-2);
    ctx.lineTo(h, -h);
    ctx.stroke();
}

export {
    getLines,
    drawArrow,
    drawCheck,
    compare,
    randomInt,
    randomChoice,
    cssVar,
    isTouchOnly,
    isLightMode,
    escapeRegExp,
    removeDiacritics,
    setData,
    getData,
    inClass
}