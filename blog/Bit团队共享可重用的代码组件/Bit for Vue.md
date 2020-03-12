# Bit for Vue
![](https://docs.bit.dev/img/vue.svg)

## 总览（Overview）
Bit使您可以在不同项目和应用程序之间共享和同步组件。
> Bit lets you share and sync components between different projects and applications.

在本教程中，我们将在两个项目之间共享一个Vue组件。
> In this tutorial, we'll share a Vue component between two projects.

### 先验知识（Prior Knowledge0
本教程假定您熟悉：（This tutorial assumes that you are familiar with:）

- 终端和命令行。（Terminal and command line.）
- 使用node和npm（或yarn）。（Using node and npm (or yarn).）
- Vue开发和vue-cli，包括在您喜欢的代码编辑器中编辑Vue文件。（Vue development and vue-cli, including editing Vue ）files in your favorite code editor.
- Git

### 你需要什么？（What Do You Need?）

您需要验证是否具有：（You need to verify that you have:）

- Node 10.9+.

要运行本教程，请克隆并设置Vue教程项目：https://github.com/teambit/bit-vue-tutorial
> To run this tutorial, clone and setup the Vue tutorial project: https://github.com/teambit/bit-vue-tutorial

```shell
git clone https://github.com/teambit/bit-vue-tutorial
cd bit-vue-tutorial
npm install
```

### 你会学什么？（What Will You Learn?）

在本教程中，您将学习如何：（In this tutorial you will learn how to:）

- 设置Bit（Setup Bit）
- 共享现有项目中的Vue组件（Share a Vue component from an existing project）
- 在位云上预览导出的组件（Preview the exported component on the Bit cloud）
- 将组件安装在另一个项目中（Install the component in another project）
- 在新项目上修改Vue组件（Modify the Vue component on the new project）
- 获取组件更新（Get component updates）

## 设置Bit（Setup Bit）
首先，我们需要设置Bit。
> First things first, we need to setup Bit.

### 创建一个免费的bit.dev帐户（Create a Free bit.dev Account）
转到bit.dev并创建您的免费帐户。输入用户名和密码或使用您的GitHub帐户进行身份验证。欢迎来到比特！确保记住您的用户名；在本教程中您将需要它。每次看到<username>时，都用您自己的用户名替换。
> Head over to bit.dev and create your free account. Enter a username and password or use your GitHub account to authenticate. Welcome to Bit! Make sure that you remember your username; you'll need it during this tutorial. Every time you see <username>, replace it with your own username.

### 创建一个组件集合（Create a Component Collection）
登录到bit.dev后，您可以创建一个集合。集合是一组远程托管的组件，可以在您的应用程序之间共享和使用。
> When you are logged into bit.dev you can create a collection. A collection is a remotely-hosted set of components that are ready to be shared and used across your applications.

1. 单击标题中的“新建”按钮，然后选择“集合”。（Click the New button in the header and choose Collection.）
1. 将新集合命名为vue-tutorial（或选择其他名称，只要您记得它即可）。（Name the new collection vue-tutorial (or choose a different name, as long as you remember it).）
1. 确定集合是私有的还是公共的。（Decide if the collection is private or public.）
1. 公共-公共集合中的组件对所有人可见。（Public - Components in public collections are visible to everyone.）
1. 私人-私人收藏中的组件仅对受邀者可用。（Private - Components in private collections are available to invitees only.）

### 安装Bit CLI（Install Bit CLI）
使用npm在计算机上安装Bit CLI：
> Install Bit CLI on your computer using npm:

```shell
npm install bit-bin -g
```

访问[Install Bit](https://docs.bit.dev/docs/installing-bit.html)了解其他安装方法。
> Visit Install Bit for other installation methods.

如果已安装Bit，请通过运行以下命令来验证安装：
> If you have Bit installed, verify the installation by running the command:

```shell
bit --version
```

### 登录到您的Bit账户（Login to Your Bit Account）
将Bit验证到您的bit.dev帐户。从命令行运行：
> Authenticate Bit to your bit.dev account. From the command line run:

```shell
bit login
```

这将打开您的浏览器，您可以在其中登录您的帐户。如果您已经登录，将显示一条成功消息。现在您可以开始使用Bit了。
> This will open your browser where you can log into your account. If you are already logged in, a success message will be displayed. You are now ready to start using Bit.

作为登录过程的一部分，Bit设置您的本地配置。您可以通过键入以下内容查看配置：
> As part of the login process, Bit sets up your local configuration. You can see your configuration by typing:

```shell
bit config
```

另外，Bit将Bit使用的npm注册表添加到您的`npmrc`配置中。 （根据您的操作系统，默认情况下位于`$HOME/.npmrc`中）。
> In addition, Bit adds the npm registry used by Bit to your npmrc configuration. (by default located in $HOME/.npmrc according to your OS).

### 初始化位工作区（Initialize Bit Workspace）
切换到Vue教程项目目录并运行Bit初始化命令：
> Switch to the Vue tutorial project directory and run the Bit initialization command:

```shell
$ bit init
successfully initialized a bit workspace.
```

请注意发生了另外两个更改：（Notice two other changes have happened:）

- 在您的根目录中已创建一个名为`.bitmap`的新文件。该文件跟踪位组件，并且仅包含注释和您的位版本所在的行。（A new file named .bitmap has been created in your root directory. This file tracks Bit components and only includes a comment and a line with your bit version.）
- 将一个新的`bit`添加到`package.json`文件中，并为您的项目提供以下默认值：（A new section, bit, has been added to your package.json file with the following defaults for your project:0

```json
"bit": {
  "env": {},
  "componentsDefaultDirectory": "components/{name}",
  "packageManager": "npm"
}
```

> 在实际的项目中，这些更改应提交给您的版本控制工具系统。
>> In an actual project, these changes should be committed to your version control tool system.

## 共享Vue组件（Share a Vue Component）
现在，我们将跟踪Vue教程项目中的产品列表组件。该组件将使用id`product-list`进行跟踪。
> Now, we will track the product-list component from the Vue tutorial project. The component will be tracked with the id product-list.

### 跟踪新组件（Track a New Component）
要跟踪产品列表组件，我们将需要向Bit告知组件以及与之相关的文件。在Vue中，组件通常是单个文件，因此我们可以直接添加此文件。我们还告诉Bit跟踪id`product-list`下的文件
> To track the product list component, we will need to tell Bit about the component and the files that are related to it. In Vue, a component is typically a single file so we can directly add this file. We also tell Bit to track the file under the id product-list

```shell
$ bit add src/components/productList.vue --id product-list
tracking component product-list:
tracking component product-list:
added src/components/productList.vue
```

创建新组件时，需要确保Bit正确跟踪组件所需的所有文件。 Bit可以为您分析组件并验证是否包含所有文件。您可以通过检查组件的状态来做到这一点：
> When creating new components, you need to make sure that Bit properly tracks all of the files required for the component. Bit can analyze the component for you and verify that all files are included. You can do that by checking the status of the component:

我们的组件正在使用`src/assets/products.js`-Bit会识别它并提醒我们：
> Our component is using src/assets/products.js - Bit will identify it and alert us:

```shell
$ bit status
> product-list ...  issues found
       untracked file dependencies (use "bit add <file>" to track untracked files as components):
          src/components/ProductList.vue -> src/assets/products.js
```

您将需要将丢失的文件添加到组件中。在我们的例子中，此文件仅由该组件使用，因此我们将其添加到该组件中。如果该文件在组件之间共享，则应将其作为新组件进行跟踪。
> You will need to add the missing file to the component. In our case, this file is only used by this component so we will add it to the component. If this file was shared between components, we should track it as a new component.

```shell
$bit add src/assets/products.js --id product-list
tracking component product-list:
added src/assets/products.js
added src/components/productList.vue
```

再次检查状态：
> Check the status again:

```shell
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > product-list ... ok
```

### 安装Vue编译器（Install Vue Compiler）
到目前为止，我们已经为Bit提供了组件的源文件。但是为了使用其他项目中的文件，需要构建组件。
> So far, we have provided Bit with the source file of the component. But in order to consume the files in other projects, the component needs to be built.

> Bit正在存储组件的源代码，但是代码仍应保留在您的版本控制系统（VCS）中，例如Git存储库。
>> Bit is storing the source code of the component, but the code should still remain in your version control system (VCS) such as your Git repository.

Bit有大量的编译器集合，这些编译器是开源的，并且由Bit团队维护。此外，社区还创建了可通过搜索[Bit集合](https://bit.dev/)使用的编译器。
> Bit has a large collection of compilers that are open source and maintained by the Bit team. In addition, the community has created compilers that you can use by searching Bit collections.

要构建vue组件，您将需要[Vue编译器](https://bit.dev/bit/envs/bundlers/vue)。安装编译器并在Vue教程存储库中运行以下命令：
> To build the vue component, you'll need the Vue compiler. Install the compiler and run this command inside the Vue tutorial repository:

```shell
$bit import bit.envs/bundlers/vue --compiler
the following component environments were installed
- bit.envs/bundlers/vue@2.6.10
```


> 运行教程时，版本可能会略有不同
>. The version may vary slightly when you run the tutorial

现在，将Vue编译器设置为该存储库中Bit工作区的默认编译器。您可以通过在“位”部分中找到以下条目来检查`package.json`并验证是否已安装编译器：
> The Vue compiler is now set as the default compiler for the Bit workspace inside this repository. You can check the package.json and verify that the compiler is installed by locating the following entry in the Bit section:

```json
"env": {
  "compiler": "bit.envs/bundlers/vue@2.6.10"
},
```

### 构建Vue组件（Build the Vue Component）
现在已经安装了编译器，然后构建组件。构建组件有两个目的：（Now that the compiler is installed, build the component. Building the component serves two purposes:）

- 使该组件可直接由其他项目使用。（Make the component directly consumable by other projects.）
- 确保该组件包含所有内容，并且包含与他人共享该组件所需的所有部分。（Make sure that the component is all-inclusive and contains all the parts that are required in order to share it with others.）

现在，该组件位于项目内部，并且可能会消耗项目中的某些依赖项。位构建是在`隔离的环境`中进行的，以确保该过程还将在云或任何其他项目中成功进行。要构建组件，请在Vue项目中运行以下命令：
> Right now the component lives inside your project and may consume some dependencies from your project. Bit build is taking place in an isolated environment to make sure the process will also succeed on the cloud or in any other project. To build your component, run this command inside your Vue project:

```shell
bit build
```

这将导致组件名称（product-list），然后是文件名列表。这些是组件的内置文件。
> This results in the component name (product-list) followed by a list of file names. Those are the built files of the component.

### 导出组件（Export Component）
正确构建组件之后，现在就可以与世界分享它了。
> With the component properly built, it is now time to share it with the world.

组件根据semver标准进行版本控制。要用版本标记组件，请运行以下命令：
> Components are versioned according to semver standards. To tag your component with a version, run the following command:

```shell
$ bit tag --all 0.0.1
# 1 component(s) tagged
# (use "bit export [collection]" to push these components to a remote")
# (use "bit untag" to unstage versions)

# new components
# (first version for components)
#      > product-list@0.0.1
```

此命令标记Bit中当前暂存的所有组件。在我们的案例中，它只是product-list组件。
> This command tags all the components that are currently staged in Bit. In our case, it's only the product-list component.

您可以检查组件状态（`bit status`），并找到以下内容：
> You can check the component status (bit status) and you'll find the following:

```shell
$ bit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > product-list. versions: 0.0.1 ... ok
```

这里要注意的重要一点是该组件被视为已暂存。这意味着它现在可以导出了。
> The important thing to notice here is that the component is considered staged. That means that it is now ready to be exported.

要将组件导出到您的bit.dev集合，我们将使用export命令和集合的全名，结构为`<username>.<collection>`：
> To export the component to your bit.dev collection, we will use the export command and the full name of the collection, structured as <username>.<collection>:

```shell
$ bit export <username>.vue-tutorial
exported 1 components to scope <username>.vue-tutorial
```

现在，该组件在bit.dev的集合中可见。您可以在`https://bit.dev/<username>/vue-tutorial`中访问它。您还可以在以下位置访问为此演示创建的组件：https://bit.dev/bit/vue-tutorial
> The component is now visible in your collection on bit.dev. You can access it in https://bit.dev/<username>/vue-tutorial. You can also visit the component created for this demo at: https://bit.dev/bit/vue-tutorial

这时，检查位的状态将不再显示该组件，因为该组件现在托管在远程集合中：
> At this point, checking bit's status will no longer display the component as the component is now hosted on the remote collection:

```shell
$ bit status
nothing to tag or export
```

如果要查看所有组件，可以运行：
> If you want to see all the components you have you can run:

```shell
$ bit list
```

您将获得所有组件及其版本的列表。
> You will get a list of all components and their versions.

现在，组件代码在本地项目中（应该提交给源代码管理），但其他项目也可以使用。
> Right now, the component code is in your local project (and should be committed to your source control), but it is also available for other projects.

## 预览Vue组件（Preview the Vue Component）
Vue组件也可在bit.dev云上使用。转到https://bit.dev并登录到您的帐户（如果尚未登录）：
> The Vue component is also available on the bit.dev cloud. Go to https://bit.dev and log into your account (if you are not logged in yet):

1. 选择左侧面板上的集合导航器，然后选择集合。（Select the collections navigator on the left panel and select collections.）
1. 单击您的收藏集-您将看到您的产品列表组件。（Click on your collection--you׳ll see your product-list component.）
1. 单击产品列表组件以查看其游乐场。（Click on the product-list component to see its playground.）

您也可以通过以下URL访问该页面：`https://bit.dev/<username>/vue-tutorial/product-list`
> You can also access the page at the following url: https://bit.dev/<username>/vue-tutorial/product-list

组件游乐场为您提供了一个已经具有组件的基本Vue应用程序。要在正确的应用程序中查看组件，请将项目类型切换为`Vue`。
> The component playground provides you with a basic Vue app that already has your components. To view your component in the correct app, switch the project type to Vue.

几秒钟后，您将看到在操场上渲染的组件。您可以在[此处](https://bit.dev/bit/vue-tutorial/product-list)查看示例。
> In few seconds you will see the component rendered in the playground. You can view an example here.

在组件页面上，您还可以看到可用于使用yarn或npm安装此组件的不同命令。您可以复制yarn命令；我们将很快使用它。
> On the component's page, you can also see the different commands available for installing this component using yarn or npm. You can copy the yarn command; we are going to use it very soon.

## 在另一个项目中安装组件（Install Component in Another Project）
### 创建一个新的Vue应用程序（Create a New Vue Application）
现在，您将创建另一个Vue应用程序并使用product-list组件。最快的方法是使用Vue CLI（版本3）来生成新的应用程序。切换到新目录。
> You are now going to create another Vue application and use the product-list component. The fastest way to do that is use the Vue CLI (version 3) to generate a new Application. Switch to a new directory.

```shell
npx @vue/cli create my-new-vue
```

如果已经全局安装了vue-cli，则可以运行：
> If you already have vue-cli installed globally you can run:

```shell
> vue create my-new-vue
```

确保您正在使用babel和es6。
> Make sure you are using babel and es6.

在您的终端中，切换到`my-new-app`目录。
> In your terminal, switch to the my-new-app directory.

### 在您的项目中安装组件（Install the Component in Your Project）

使用您喜欢的软件包安装程序（npm或yarn）来安装组件。
> Use your favorite package installer (npm or yarn) to install the component.

该组件存储在Bit注册表中，因此该组件的完整路径为：`@bit/<username>.<collection name>.<component name>`
> The component is stored in the Bit registry, so the full path to the component will be: @bit/<username>.<collection name>.<component name>

使用npm运行安装命令：
> Run the install command using npm:

```shell
npm install @bit/<username>.vue-tutorial.product-list --save
```

现在，该组件已添加到您的`package.json`中：
> The component is now added to your package.json:

```shell
"@bit/<username>.vue-tutorial.product-list": "0.0.1"
```

### 在您的应用程序中使用（Use In Your Application）

现在，您可以像其他导入一样在代码中使用该组件。您的应用程序组件应如下所示：
> Now you can use the component in your code, just like any other import. Your app component should look like this:

```html
<template>
  <div id="app">
    <ProductList />
  </div>
</template>

<script>
import ProductList from '@bit/<username>.vue-tutorial.product-list';

export default {
  name: 'app',
  components: {
    ProductList
  }
}
</script>
```

最后但并非最不重要的一点是，使用Vue CLI运行您的应用程序：
> Last but not least, run your application using Vue CLI:

```shell
> npm run serve
```

**瞧！**现在，您可以在新创建的应用程序中看到组件列表。
> Voila! You can now see the component list inside the newly created application.

## 修改组件（Modify the Component）
接下来，我们将对组件进行更改，然后将其导出回集合。我们将在产品列表中添加一个查看按钮。为简单起见，它将仅显示一条警告，指出已查看该产品。
> Next, we are going to make a change to the component and export it back to the collection. We will add a View button to the product list. For simplicity, it will only show an alert saying the product has been viewed.

### 导入组件（Import the Component）
到目前为止，产品列表组件仅以其构建形式安装在我们的项目中。现在，我们想将代码导入到我们的项目中以进行更改。
> Up until now, the product-list component was only installed (in its built form) in our project. Now, we want to import the code into our project to make the changes.

为了导入组件，将my-new-app工作空间初始化为Bit工作空间：
> In order to import the component, initiate the my-new-app workspace as a Bit workspace:

```shell
bit init
```

在确认工作空间已初始化的确认消息之后，运行以下命令：
> After the confirmation message that the workspace was initialized, run the following command:

```shell
$ bit import <username>.vue-tutorial/product-list
bit import <username>.vue-tutorial/product-list
successfully imported one component
- added <username>.vue-tutorial/product-list new versions: 0.0.1, currently used version 0.0.1
```

> 缺少核心依赖项的通知是可以的。您应该已经在项目中拥有这些软件包。
>> Notifications on missing core dependencies are ok. You should already have those packages in your project.

该命令在组件页面上也可用。（The command is also available on the component page.）

这是发生了什么：（Here is what happened:）

- 将创建一个新的顶级组件文件夹，其中包含组件的代码，其编译后的代码和node_modules（在这种情况下，node_modules为空，因为所有的node_modules都是对等依赖项，并且取自根项目。（A new top-level components folder is created that includes the code of the component, with its compiled code and node_modules (in this case the node_modules are empty, as all of your node_modules are peer dependencies and are taken from the root project.）
- `.bitmap`文件已修改为包括对组件的引用（The .bitmap file was modified to include the reference to the component）
- package.json文件被修改为指向文件而不是远程包。您的`package.json`现在显示：（The package.json file is modified to point to the files rather than the remote package. Your package.json now displays:）

```shell
"@bit/<username>.vue-tutorial.product-list": "file:./components/product-list"
```

启动您的应用程序以确保它仍然可以运行。正如您将看到的，不需要任何更改：Bit可以处理所有事情。
> Start your application to make sure it still works. As you'll see, no changes are required: Bit takes care of everything.

### 更新代码（Update the Code）
让我们修改产品列表组件。更改`components/product-list/ProductList.vue`以包含以下方法：
> Let's modify the product-list component. Change the components/product-list/ProductList.vue to include the following method:

```js
view() {
  window.alert('The product has been viewed!');
}
```

更改模板以包括新按钮：
> Change the template to include the new button:

```html
<template>
    <div>
        <h2>Products</h2>
        <template v-for="(product, index ) of products">
            <div v-bind:key={index}>
                <h3>
                    <a>
                        {{ product.name }}
                    </a>
                </h3>
                <p v-if="product.description">
                    Description: {{ product.description }}
                </p>
                <button @click="share">
                    Share
                </button>
                <button @click="view">
                    View
                </button>
            </div>
        </template>
    </div>
</template>
```

运行Vue应用程序：
> Run the Vue application:

```shell
npm run serve
```

该应用程序尚未更改。这是因为Bit组件是由bit编译器编译的。在单独的终端中，运行`bit build`命令来编译更改。您应该看到已安装编译器：
> The app is not yet changed. That's because the Bit components are compiled by the bit compiler. In a separate terminal, run the bit build command to compile the changes. You should see that the compiler is installed:

```shell
successfully installed the bit.envs/bundlers/Vue@2.5.2 compiler
```

随后将成功编译主文件。
> That will be followed by a successful compilation of the main file.

为了编译该应用程序，我们需要增强位Webpack配置以正确使用符号链接。
> In order to compile the application, we need to enhance the bit webpack configuration to properly work with symlinks.

使用以下配置添加新文件`vue.config.js`：
> Add a new file vue.config.js with the following configuration:

```javascript
module.exports = {
    configureWebpack: {
        resolve: {
            symlinks: false // support npm link
        },
    }
}
```

再次运行`my-new-app`，现在您将看到带有查看按钮的已更改组件。
> Run the my-new-app again and you'll now see the changed component with the view button.

> 在实际项目中，建议将这些更改提交到GitHub存储库。
>> In a real project, it is recommended to commit those changes to your GitHub repository.

### 导出更改（Export the Changes）
接下来，将对组件所做的更改导出回bit.dev。
> Next, export the changes done to the component back to bit.dev.

```shell
bit status
```

product-list组件已修改：
> The product-list component was modified:

```shell
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > product-list ... ok
```

标记组件并将其导出为新版本。默认情况下，这是一个semver补丁版本：
> Tag and export the component as a new version. By default this is a semver patch version:

```shell
$ bit tag product-list
# 1 component(s) tagged
# (use "bit export [collection]" to push these components to a remote")
# (use "bit untag" to unstage versions)

# changed components
# (components that got a version bump)
#      > <username>.vue-tutorial/product-list@0.0.2
```

将其导出回集合：
> Export it back to the collection:

```shell
$ bit export <username>.vue-tutorial
exported 1 components to scope <username>.vue-tutorial
```

转到bit.dev上的组件页面。在这里您可以看到该组件具有新版本。更改也可以在组件操场上看到。
> Head to the component page on bit.dev. Here you can see that the component has a new version. The changes are also visible on the component playground.

## 获取组件更新（Get Component Updates）
在最后一个阶段，您将所做的更改导入到原始项目中。切换回`vue-tutorial`。
> In this last stage, you'll import the changes to the original project. Switch back to vue-tutorial.

### 导入更改（Import Changes）
运行位导入以查看是否有任何组件更改（类似于执行git pull检查git更改）。
> Run bit import to see if any components were changed (similar to doing git pull to check git changes).

我们将看到产品列表组件已更改，并且存在新版本：
> We will see that the product-list component was changed and a new version exists:

```shell
$ bit import
successfully imported one component
- updated <username>.vue-tutorial/product-list new versions: 0.0.2
```

该组件已下载，但尚未更改。检查工作空间状态，您将获得以下信息：
> The component is downloaded but is not yet changed. Check the workspace status, you will get the following:


```shell
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit diff [component_id] [new_version]" to compare changes)
(use "bit log [component_id]" to list all available versions)

    > <username>.vue-tutorial/product-list current: 0.0.1 latest: 0.0.2
```

### 查看（Checkout）
将对组件所做的更改合并到您的项目中。该命令的结构是`bit checkout <version> <component>`。因此，您运行：
> Merge the changes done to the component to your project. The structure of the command is bit checkout <version> <component>. So you run:

```shell
$ bit checkout 0.0.2 product-list
successfully switched <username>.vue-tutorial/product-list to version 0.0.2
updated src/assets/products.js
updated src/components/productList.vue
```

Bit执行git合并。现在，来自更新组件的代码将合并到您的代码中。
> Bit performs a git merge. The code from the updated component is now merged into your code.

再次运行该应用程序，以查看它与更新的组件是否正常运行：
> Run the application again to see it is working properly with the updated component:

```shell
npm run serve
```

而已。在两个项目之间进行了更改。您的应用程序正在使用更新的组件运行。
> That's it. A change was moved between the two projects. Your application is running with an updated component.

编码愉快！
> Happy coding!
