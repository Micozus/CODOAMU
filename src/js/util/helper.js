const utilCreateElem = (elem, html, attributes) => {
    const el = document.createElement(elem);
    el.innerHTML = html;
    if (attributes !== undefined) {
        el.setAttribute("class", attributes);
    }

    return el;
};

module.exports = utilCreateElem;
