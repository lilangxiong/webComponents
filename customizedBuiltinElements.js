class ExpandingList extends HTMLUListElement {
    constructor() {
        super();

        window.onload = function() {
            // 拿到页面上所有的ul、li
            const uls = Array.from(document.querySelectorAll('ul'));
            const lis = Array.from(document.querySelectorAll('li'));

            // 除了第一个ul，其他全部隐藏
            uls.slice(1).forEach(ul => {
                ul.style.display = 'none';
            });

            // li的文本改用span来包裹
            lis.forEach(li => {
                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');
                newSpan.textContent = childText.textContent;
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            });

            // 拿到页面上的所有span元素
            const spans = Array.from(document.querySelectorAll('span'));

            // 设置span的鼠标指针、class、点击事件
            spans.forEach(span => {
                if (span.nextElementSibling) {
                    span.style.cursor = 'pointer';
                    span.parentNode.setAttribute('class', 'closed');
                    span.onclick = showul;
                }
            });

            // span的点击事件，用来切换显示隐藏
            function showul(e) {
                const nextul = e.target.nextElementSibling;

                if (nextul.style.display == 'block') {
                    nextul.style.display = 'none';
                    nextul.parentNode.setAttribute('class', 'closed');
                } else {
                    nextul.style.display = 'block';
                    nextul.parentNode.setAttribute('class', 'open');
                }
            }
        };
    }

    connectedCallback () {
        // 设置组件应尽可能地延迟到 connectedCallback，因为只有这里你才能确保元素的所有属性和子元素都可用。
        console.log('元素被挂载到了body上, 类似于vue的mounted钩子函数');
    }
}
window.customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
