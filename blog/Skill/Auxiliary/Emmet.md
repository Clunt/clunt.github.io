# Emmet
<!-- 2015-02-26 -->

## HTML缩写
常用缩写共分为基本标签、嵌套规则、属性规则三类（*个人将text缩写归为‘属性规则’类目下*），此外还包含某些情形下的默认缩写规则。
通过`RULE` + `tab`展开缩写

### Elements
基本标签，HTML中的基本标签可以直接自动补全

```HTML
<!-- div -->
<div></div>
```

### Nesting operators
嵌套规则，包含五种常用规则，分别为子级（>）、同级（+）、提升层级（^）、重复输出（\*）、组输出（()）

**Child: >**
```HTML
<!-- div>ul>li -->
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

**Sibling: +**
```HTML
<!-- div+p+bq -->
<div></div>
<p></p>
<blockquote></blockquote>
```

**Climb-up: ^**
```HTML
<!-- div+div>p>span+em^^^bq -->
<div></div>
<div>
  <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

**Multiplication: \***
```HTML
<!-- ul>li*2 -->
<ul>
  <li></li>
  <li></li>
</ul>
```

**Grouping: ()**
```HTML
<!-- (div>dl>(dt+dd)*3)+footer>p -->
<div>
  <dl>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
    <dt></dt>
    <dd></dd>
  </dl>
</div>
<footer>
  <p></p>
</footer>
```

### Attribute operators
> 属性规则，包含四种常用规则，分别为基本属性（# & .）、自定义属性（[]）、属性自增($)、文字属性（{}）

**ID and CLASS：#** & **.**
```HTML
<!-- div#header+div.page+div#footer.class1.class2.class3 -->
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

**Custom attributes：[]**
```HTML
<!-- td[title="Hello world!" colspan=3]+a[href=http://clunt.github.io/ data-type="link" class=class]{Fork Clunt On Github} -->
<td title="Hello world!" colspan="3"></td>
<a href="http://clunt.github.io/" data-type="link" class>Fork Clunt On Github</a>
```

**Item numbering: $**
```HTML
<!-- ul>li.item$*2 -->
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
</ul>

<!-- ul>li.$$@p*3 -->
<ul>
  <li class="01p"></li>
  <li class="02p"></li>
  <li class="03p"></li>
</ul>

<!-- ul>li.$@0*3 -->
<ul>
  <li class="0"></li>
  <li class="1"></li>
  <li class="2"></li>
</ul>

<!-- ul>li.$@-0*3 -->
<ul>
  <li class="2"></li>
  <li class="1"></li>
  <li class="0"></li>
</ul>

<!-- ul>li.item$$$*2 -->
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
</ul>
```

**Text: \{\}**
```HTML
<!-- a{click}+b{here} -->
<a href="">click</a><b>here</b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>

<!-- p>{Click }+a{here}+{ to continue} -->
<p>Click <a href="">here</a> to continue</p>
```

### Implicit tag names
> 默认规则，当指明父标签时，符合默认规则的子标签可不必写出具体标签名

- **li** for **ul**, **ol**
- **tr** for **table**, **tbody**, **head**, **tfoot**
- **td** for **tr**
- **option** for **select**, **optgroup**

```
.wrap>.content
div.wrap>div.content

em>.info
em>span.info

ul>.item*3
ul>li.item\*3

table>#row$*4>[colspan=2]
table>tr#row$\*4>td[colspan=2]
```

## CSS缩写
> CSS缩写在使用过程中比较好掌握，但是在某些场景下会有一些细节需要注意。

- 数值组合
  `w10` => *width: 10px;*
  `m0a` => *margin: 0 auto;*
  `m10-0-5` => *margin: 10px 0 5px;*

## 拓展
> 未完待续……

## 参考资料
1. [Emmet官网](http://emmet.io/)