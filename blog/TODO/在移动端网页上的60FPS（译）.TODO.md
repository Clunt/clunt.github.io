# 在移动端网页上的60FPS
> 这篇文章本身发于2015年末，距今已有近三年之久。虽曾早早拜读，但并未过多深思。最近在思考MV*后的前端性能优化方向偶有灵感，特翻出此篇文章再次认真阅读，为之后探索做些准备。
> 原文 [60FPS on the mobile web](http://engineering.flipboard.com/2015/02/mobile-web)

Flipboard在智能手机和平板电脑初期就推行以移动为先的体验，为了在多样化的触摸屏上获得更优雅的用户体验，我们对网页的内容布局原则进行了重新思考。

<!-- 现在我们回到了原点并且提供网页版的Flipboard。 -->
Now we’re coming full circle and bringing Flipboard to the web.我们在Flipboard做的大部分工作的与使用的设备无关：从你最关心的话题、来源和人群中采集新闻。因此将我们的服务延伸到网页上总是合乎逻辑的。

<!-- 我们知道想要根据移动端的经验改变想法尝试提升网页端的内容布局和交互。 -->
当我们开始接手这个项目时，we knew we wanted to adapt our thinking from our mobile experience to try and elevate content layout and interaction on the web.我们希望在某种程度上浏览器的流畅程度和性能可以达到和原生应用一样。

早些时候，经过大量的原型测试，我们决定网页应该采用滚动的浏览体验。我们的移动应用被大家所熟知的是类似翻书般的体验，在触摸屏上的体验非常直观，但是由于各种原因，在网页上滚动体验更为自然。

为了优化滚动性能，我们知道要保证渲染频率低于16ms并且限制回流和重绘。这点在动画中尤为重要。为了避免在动画期间重绘，这里有两个属性可以安全的用于动画：`CSS transform`和`opacity`。但这确实限制了你的选择。

如果你想实现元素的宽度动画怎么办？

![60fps-on-the-web-1.gif](./assets/60fps-on-the-web-1.gif)

一个逐帧的滚动动画呢？

![60fps-on-the-web-2.gif](./assets/60fps-on-the-web-2.gif)

（注意上图中顶部的图标从白色过渡到了黑色。这里有两个边界根据下方内容裁剪的相互重叠的元素。)

页面上的这类动画一直遭受诟病，尤其是移动端，只是因为一个简单的原因：

**DOM实在是太慢了。**

它不仅慢，而且很慢。如果你在动画期间触摸了DOM，那么你就会超过16ms的帧值。

