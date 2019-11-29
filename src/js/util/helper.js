const utilCreateElem = (elem, html) => {
    const el = document.createElement(elem);
    el.innerHTML = html;
    return el;
};

module.exports = utilCreateElem;
