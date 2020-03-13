# touchmove中断并未触发end/cancel事件原因
写完上一篇`同级元素box-shadow相互覆盖解决方案`后发现距离下班15分钟，觉得再来一篇文章收个尾，体会一下高产似母猪的感觉。

## 起因
项目中对元素进行拖拽跨屏时，会偶尔出现拖拽到一半事件中断，被拖拽元素孤零零的呆在页面中央，直到再次触屏才会触发`end`事件的Bug。

## 解决方案
经过千辛万苦的排查（真的花了好多时间！），发现是由于在用`Vue`做Recyle List时，触发`touchstart`事件的节点被销毁所导致。
因此，在触发`touchstart`事件时，克隆`event.target`进行替换，并将原节点移入`body`，直到事件结束（`end`/`cancel`）在进行重置操作就可以咯。

```js
var node = null;
var nodeClone = null;
$(el).on('touchstart', (event) => {
  node = event.target;
  nodeClone = node.clone();
  node.after(nodeClone);
  document.body.appendChild(node);
}).on('touchend touchcancel', () => {
  nodeClone.after(node);
  nodeClone.remove();
});
```

## 总结
为什么敢说十五分钟搞定？短小精悍而已！不过遇到这个问题时，真的是全网大搜索过。并没有找到任何解决方案。可以算是首发了么？