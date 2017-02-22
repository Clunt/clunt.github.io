# 多行文本溢出显示省略号的JS实现
## 目的
最初在项目里遇到处理多行文本省略号的情况时，直接粗暴的采用了`-webkit-line-clamp`属性，在低版本浏览器中直接截断的做法。但随着项目的优化，浏览器的兼容问题就成了首要任务。这时，参考了许多纯CSS的方案都没有找到合适的（文末附有相关解决方案），不得以的情况下只好采取JS来进行字符串截断。
本篇文章主要介绍JS通过`折半查找`及折半查找的变种`差值查找`来实现最终目的的思路。

## 实现
需求：列表中每一项宽度不定、行数确定，超出以省略号显示。
思路：字符串阶段，内外元素高度的判断
关键：DOM操作次数


```html
<style>
  .out{width: 200px;height: 100px;line-height: 20px;overflow: hidden;font-size: 16px;}
</style>

<div class="out">
  <div class="in">MULTILINE TEXT</div>
</div>

<script>
  // require jquery
  function genText(count, average) {
    average = average || 0
    var strs = ['一', '1', 'a', 'A', '-'];
    var i = average === 0 ? count : Math.floor(count / 2);
    var str = '';
    while (i > 0) {
      str += strs[Math.floor(Math.random() * 5)].repeat(Math.floor(Math.random() * 10) + 1);
      i--;
    }
    var addition = '. .'.repeat(Math.floor(count / 2));
    if (average > 0) {
      str += addition;
    } else if (average < 0) {
      str = addition + str;
    }
    $('.in').text(str);
  }
  var $out = $('.out');
  var $in = $('.in');
  var textCount = 10000;
  genText(textCount);
  // genText(textCount, -1); // 前密后疏
  // genText(textCount, 1); // 前疏后密
</script>
```

### 逐字替换
最直接的方法就是一个字符一个字符的去替换，这也是我们从网上最容易搜到的解决方案。但这种方法只能说是实现了需求，当处理稍多一些的文本时，页面必然会失去响应。

```js
function ellipses($out, $in) {
  var str = $in.text();
  var outHeight = $out.height();
  while ( $in.height() > outHeight ) {
    str = str.slice(0, str.length - 1);
    $in.text(str + '...');
  }
}
ellipses($('.out'), $('.in'));
```

### 类二分查找
从基础实现中我们可以发现，基本思路是没有问题的，只不过对于DOM的操作次数过多，而且关键点就是截取位置的确定。只要我们采取适当的方法来尽快获取截取位置就可以了。其中，截取位置的确定时通过判断，当每加一个字符时子元素高度是否会超出父元素高度。
这种情况下，通过二分查找（不是准确的二分查找，但有一定的相似程度）确定截断位置再适合不过了。并且不会因为显示行数与文本的长度变化而大幅增加计算次数。

```js
function ellipses($out, $in) {
  if ( !( $in.height() > $out.height() ) ) return;
  var str = $in.text();
  var ellipsesText = '...';
  var outHeight = $out.height();
  var index = calc(str, 0, str.length);
  $in.text( str.slice(0, index) + ellipsesText );
  function calc(str, min, max) {
    if ( !( min + 1 < max ) ) return min;
    var middle = min + Math.floor( ( max - min ) / 2 );
    $in.text( str.slice(0, middle) + ellipsesText );
    if ( $in.height() > outHeight ) {
      return calc(str, min, middle);
    } else {
      return calc(str, middle, max);
    }
  }
}

// 本版本减少对字符串的操作
function ellipses($out, $in) {
  if ( !( $in.height() > $out.height() ) ) return;
  var outHeight = $out.height();
  calc('', $in.text());
  function calc(total, str) {
    var max = str.length;
    var middle = Math.floor( max / 2 );
    var half = str.slice(0, middle);
    $in.text( total + half + '...' );
    if ( $in.height() > outHeight ) {
      calc(total, half);
    } else if (middle + 1 < max) {
      calc(total + half, str.slice(middle, max));
    }
  }
}
ellipses($('.out'), $('.in'));
```

### 优化
> 此处不获取文本行高进行计算

二分查找的划分比例是固定为1/2的，在某些情况下会有多余的折半次数（文本共1w字只需展示前100字即可，二分查找无法快速定位到100左右的区间）。因此，为了进一步的有所优化，我们可以参照差值查找的方法，通过子父元素高度比优化分段参数。

```js
  function ellipses($out, $in) {
    if ( !( $in.height() > $out.height() ) ) return;
    var str = $in.text();
    var ellipsesText = '...';
    var inHeight = $in.height();
    var outHeight = $out.height();
    var per = str.length / inHeight;
    var index = calc(str, 0, str.length, 0, inHeight);
    $in.text( str.slice(0, index) + ellipsesText );
    function calc(str, min, max, minHeight, maxHeight) {
      if (times++ > 20) return;
      if ( !( min + 1 < max ) ) return min;
      var ratio = (outHeight - minHeight) / (maxHeight - minHeight) || 0.5;
      var middle = min + Math.floor( ratio * ( max - min ) );
      middle += Math.floor(Math.abs((min / minHeight || 0) - max / maxHeight) * (outHeight - minHeight));
      if (middle - min < 65 || max - middle < 65) {
        middle = min + Math.floor( 0.5 * ( max - min ) );
      }
      $in.text( str.slice(0, middle) + ellipsesText );
      var inHeight = $in.height();
      if ( inHeight > outHeight ) {
        return calc(str, min, middle, minHeight, inHeight);
      } else {
        return calc(str, middle, max, inHeight, maxHeight);
      }
    }
  }
  ellipses($('.out'), $('.in'));
```

### 补充
在实际项目运用中，我们还需要通过特性检测来区别对待，进一步的完善功能。
当然，如非特别情况不建议采取这种方法，尤其是在高级浏览器市场份额不断提升的今天。而且我们也可以采取一些变通的方法来达到我们的目的，比如说结尾加一个带渐变（纯色）背景省略号的图片对多余文字进行遮挡，也可以像微博一样只取前N个字符等等。在实际操作中方案无好坏，只要适合当前项目需求及所处阶段就好。

### 总结
从基础的逐字替换、二分查找到差值查找的过程中，每个方法一定还有自己的优化空间，但总体来说三个方案的优化程度还是在不断提升的。虽说JS显示省略号的需求在实际需求中并不会经常使用，但是尤其对于刚入门的前端开发来说还是应该认真的对待。并且所用到的算法知识都是最基础的，


## 其他方案
1. [CSS Ellipsis: How to Manage Multi-Line Ellipsis in Pure CSS](http://dev.mobify.com/blog/multiline-ellipsis-in-pure-css/)，本篇文章的解决方法真的令人惊叹
1. [关于文字内容溢出用点点点(…)省略号表示](http://www.zhangxinxu.com/wordpress/2009/09/%E5%85%B3%E4%BA%8E%E6%96%87%E5%AD%97%E5%86%85%E5%AE%B9%E6%BA%A2%E5%87%BA%E7%94%A8%E7%82%B9%E7%82%B9%E7%82%B9-%E7%9C%81%E7%95%A5%E5%8F%B7%E8%A1%A8%E7%A4%BA/)