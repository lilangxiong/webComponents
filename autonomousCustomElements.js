// 创建自定义元素
class CustomButton extends HTMLElement {
    // 设置需要监听的属性名
    static get observedAttributes() {
        return ['class', 'text'];
    }

    // 创建元素时调用
    constructor () {

        // 构造函数只能用来初始化状态和设置 Shadow DOM
        super();

        // 创建一个 shadow root
        let shadow = this.attachShadow({mode: 'open'});

        // 创建 btn
        let btn = document.createElement('button');

        // 获取text属性上的内容，并添加到一个 button 标签内
        let text;
        if(this.hasAttribute('text')) {
            text = this.getAttribute('text');
        } else {
            text = '提交';
        }
        btn.textContent = text;

        // 设置class
        let className;
        if(this.hasAttribute('class')) {
            className = this.getAttribute('class');
        } else {
            className = 'btn btn--active';
        }
        btn.setAttribute('class', className);

        // 创建 CSS，并应用到 shadow dom上
        var style = document.createElement('style');
        style.textContent = `
          .btn {
            width: 100px;
            height: 32px;
            border-radius: 20px;
            border: none;
            outline: none;
            background: #FF8A10;
            color: #fff;
            font-size: 14px;
          }
          .btn--active{
            opacity: 1;
            cursor: pointer;
          }
          .btn--disable{
            opacity: 0.5;
            cursor: waiting;
          }
        `;

        shadow.appendChild(style);
        shadow.appendChild(btn);
    }

    connectedCallback () {
        // 设置组件应尽可能地延迟到 connectedCallback，因为只有这里你才能确保元素的所有属性和子元素都可用。
        console.log('元素被挂载到了body上, 类似于vue的mounted钩子函数');
    }

    attributeChangedCallback (name, oldValue, newValue) {
        console.log(`属性变化了， 属性名是：${name}，旧值是：${oldValue}，新值是：${newValue}`);
        // 初始化以及值没有改变时return
        if (!oldValue || oldValue === newValue) return;
        switch (name) {
            case 'class':
                this.updateClass(oldValue, newValue);
                break;
            case 'text':
                this.updateText(oldValue, newValue);
        }
    }

    updateClass (oldValue, newValue) {
        const shadow = this.shadowRoot;
        shadow.querySelector('.btn').setAttribute('class', newValue);
    }

    updateText (oldValue, newValue) {
        const shadow = this.shadowRoot;
        shadow.querySelector('.btn').textContent = newValue;
    }
}

// 注册自定义元素
window.customElements.define('custom-button', CustomButton);

// 定义点击事件
document.querySelector('#customBtn').onclick = (e) => {
    let target = e.target;
    target.className = 'btn btn--disable';
};
