# Vue指南
> Vue支持在公共Beta中。已知的问题：
> Playground不支持特定的Webpack配置，例如Vuetify。
>> Vue support is in public beta. Known issues:
>> Playground does not support specific webpack configuration such as Vuetify.

Bit是一个通用平台，可以使用封装特定功能的任何类型的Javascript（及其风味）代码。本部分在[Bit的常规最佳实践](https://docs.bit.dev/docs/best-practices.html)之上添加了vue特定的最佳实践。
> Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of Bit's general Best Practices.

Vue Playground已在Vue 2和Vue-CLI 3上进行了测试。该位应与以前的版本兼容。
> Vue playground was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

注意：尝试[Bit for Vue教程](https://docs.bit.dev/docs/tutorials/bit-vue-tutorial)。
> Note: Try the Bit for Vue tutorial.

## Vue编译器（Vue Compiler）
每个位组件都与一个编译器链接。 Bit编译器正在编译或捆绑源代码，以构建可以在另一个项目中运行的文件。
> Each Bit component is linked with a compiler. The Bit compiler is transpiling or bundling the source code to build files that can run in another project.

官方支持的vue编译器可以在[这里](https://bit.dev/bit/envs/bundlers/vue)找到。
> The officially supported vue Compiler can be found here.

要将其安装在项目中，请运行：
> To install it in your project run:

```shell
$bit import bit.envs/bundlers/vue --compiler
the following component environments were installed
- bit.envs/bundlers/vue@2.6.10
```

编译器基于Vue Webpack配置。在[此处](https://bit.dev/bit/envs/bundlers/vue/~code#webpack.config.js)检查确切的配置。
> The compiler is based on the Vue webpack configuration. Check out the exact configuration here.

## 在目标项目中使用Vue SFC（Using Vue SFC in target projects）
请注意，该编译器实际上是捆绑程序，因为它使用Vue Webpack将vue SFC（单个文件组件）格式分离为单独的JS和CSS文件，然后将它们捆绑在一起。如果要将组件包含到将对其进行编译和捆绑的Vue项目中，或者如果您正在使用SSR（例如Nuxt.js），则应按以下方式导入SFC本身：
> Note that this compiler is in fact a bundler, as it uses Vue webpack to separate the vue SFC (Single File Component ) format into separate JS and CSS files and then bundles them. If you want to include the component into your Vue project that will compile and bundle it, or if you are using SSR (such as Nuxt.js), you should import the SFC itself as follow:

```javascript
import MyComp from '@bit/username.collection.component/sfc' //Note the SFC at the end.
```

在[Vue文档](https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html)中了解有关此内容的更多信息
> Learn more about this in Vue documentation

## 在目标项目中使用false的符号链接（Use symlinks false in target project）
导入组件时，Bit使用符号链接指向组件位置（类似于npm链接）。为了编译该应用程序，您需要增强位Webpack配置以正确使用符号链接。
> When importing components, Bit is using symlinks to point to the component location (similar to npm link). In order to compile the application, you need to enhance the bit webpack configuration to properly work with symlinks.

如果您的项目中没有webpack配置，请添加具有以下配置的新文件`vue.config.js`：
> If you do not have a webpack configuration in your project, add a new file vue.config.js with the following configuration:

```javascript
module.exports = {
    configureWebpack: {
        resolve: {
            symlinks: false // support npm link
        },
    }
}
```

如果已经有了配置，则只需在适当的位置添加相关密钥。这告诉Vue Webpack保留符号链接。
> If you already have a configuration, you just need to add the relevant key in the proper place. This tells Vue webpack to retain the symlinks.

## Vue测试器（Vue Tester）
每个位组件都可以与测试仪链接，该测试仪将运行编译器的单元测试。 Vue测试人员仍在进行中。
> Each Bit component may be linked with a tester that will run the unit tests of the compiler. vue testers are still WIP.

## 与VueX共享组件（Sharing Components with VueX）
阅读[此处](https://docs.bit.dev/docs/best-practices#state-managers)以获取有关如何共享使用状态管理器的组件的建议。
> Read here for suggestion on how to share components that use state managers.

## 处理素材和样式（Handling Assets and Styles）
请参阅有关如何[处理素材](https://docs.bit.dev/docs/best-practices#handling-assets)和[样式](https://docs.bit.dev/docs/best-practices#handling-styles)的一般准则。
> Refer to the general guidelines on how to handle assets amd styles.
