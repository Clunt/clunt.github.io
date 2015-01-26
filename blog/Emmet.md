Emmet
---
> Emmet 官网：*[Emmet](http://emmet.io/)*
  Sublime Text 插件：*[Emmet for Sublime Text](https://packagecontrol.io/packages/Emmet)*

## Elements

```HTML
div
---
<div></div>
```

## Nesting operators

### Child: >

```HTML
div>ul>li
---
<div>
  <ul>
    <li></li>
  </ul>
</div>
```

### Sibling: +

```HTML
div+p+bq
---
<div></div>
<p></p>
<blockquote></blockquote>
```

### Climb-up: ^

```HTML
div+div>p>span+em^^^bq
---
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

### Multiplication: *

```HTML
ul>li*2
---
<ul>
  <li></li>
  <li></li>
</ul>
```

### Grouping: ()

```HTML
(div>dl>(dt+dd)*3)+footer>p
---
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

## Attribute operators

### ID and CLASS

```HTML
div#header+div.page+div#footer.class1.class2.class3
---
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

### Custom attributes

```HTML
td[title="Hello world!" colspan=3]+a[href=http://clunt.github.io/ data-type="link" class=class]{Fork Clunt On Github}
---
<td title="Hello world!" colspan="3"></td>
<a href="http://clunt.github.io/" data-type="link" class>Fork Clunt On Github</a>
```

### Item numbering: $

```HTML
ul>li.item$*2
---
<ul>
  <li class="item1"></li>
  <li class="item2"></li>
</ul>
```

```HTML
ul>li.$$@p*3
---
<ul>
  <li class="01p"></li>
  <li class="02p"></li>
  <li class="03p"></li>
</ul>
```

```HTML
ul>li.$@0*3
---
<ul>
  <li class="0"></li>
  <li class="1"></li>
  <li class="2"></li>
</ul>
```

```HTML
ul>li.$@-0*3
---
<ul>
  <li class="2"></li>
  <li class="1"></li>
  <li class="0"></li>
</ul>
```

```HTML
ul>li.item$$$*2
---
<ul>
  <li class="item001"></li>
  <li class="item002"></li>
</ul>
```

## Text: {}

```HTML
p>{Click }+a{here}+{ to continue}
---
<p>Click <a href="">here</a> to continue</p>
```

## Implicit tag names

- **li** for **ul** and **ol**
- **tr** for **table**, **tbody**, **head** and **tfoot**
- **td** for **tr**
- **loption** for **select** and **optgroup**


```HTML

.wrap>.content
div.wrap>div.content
---
em>.info
em>span.info
---
ul>.item*3
ul>li.item*3
---
table>#row$*4>[colspan=2]
table>tr#row$*4>td[colspan=2]
```