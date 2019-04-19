### 什么是 Shadow DOM？
Shadow DOM它允许在文档（document）渲染时插入一棵DOM元素子树，但是这棵子树不在主DOM树中。因此开发者可利用Shadow DOM 封装自己的 HTML 标签、CSS 样式和 JavaScript 代码。

### 什么是shodow root？
以video为例

![video](./img/video.png)

shadow-root叫做影子根。#shadow-root寄生在video上，所以video被称为影子宿主。可以看到上图有两个#shadow-root，因为#shadow-root可以嵌套，形成节点树，称为影子树（shadow trees）。影子树对其中的内容进行了封装，有选择性的进行渲染。这就意味着我们可以插入文本、重新安排内容、添加样式等等。

### 有两种自定义元素
- Autonomous custom elements 是独立的元素，它不继承其他内建的HTML元素。可以直接写成HTML标签的形式。例如 `<popup-info>`，或者是`document.createElement("popup-info")`；
- Customized built-in elements 继承自基本的HTML元素。创建时必须指定所需扩展的元素， 使用时，需要先写出基本的元素标签，并通过 is 属性指定custom element的名称。例如`<p is="word-count">`, 或者 `document.createElement("p", { is: "word-count" })`；

### 1、 怎样创建自定义元素？
```javascript
class MyElement extends HTMLElement {
        // 构造函数只能用来初始化状态和设置 Shadow DOM
        constructor () {
        	super();
        }
        connectedCallback () {
			console.log('元素被挂载到了body上, 类似于vue的mounted钩子函数');
        }
}
```

### 2、怎样注册一个自定义元素？
```javascript
window.customElements.define('my-element', MyElement);
```

接收三个参数：
        一个 DOMString，用于表示所创建的元素的名称。注意，custom element 的名称中必须要有短横线。
        一个类对象，用于定义元素的行为。
        一个包含 extends属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素。

### 3、生命周期

- connectedCallback：当 custom element首次被插入文档DOM时，被调用。

- disconnectedCallback：当 custom element从文档DOM中删除时，被调用。

- adoptedCallback：当 custom element被移动到新的文档时，被调用。

- attributeChangedCallback: 当 custom element增加、删除、修改自身属性时，被调用。
