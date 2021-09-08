# Bit是如何工作的？（How bit Works?）
组件是现代Web体系结构的基础。 具有重点明确定义的API的封装和可重用组件使开发人员可以更快地构建更强大的软件应用程序。
> Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly.

主要的前端框架（React，Vue和Angular）都共享使用基于组件的架构来构成最新应用程序的概念。 甚至浏览器本身也通过支持Web组件标准将组件作为固有功能来支持。
> The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit利用组件使它们不仅可在应用程序内部重用，而且提供了一个生态系统，可在应用程序之间以及跨存储库共享组件。
> Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

Bit在存储库顶部添加了一个语义层，该语义层将文件映射到组件中。 这一额外的层为Bit提供了强大的功能，使组件可以在项目中重复使用。
> Bit leverages component to make them not only reusable inside an application but provides an ecosystem for sharing components between applications and across repositories.

## Bit组件（Bit Compopnent）
Bit组件是可重用的代码段，例如：（A Bit component is a reusable piece of code, such as）

- React，Vue或Angular组件（A react, Vue or Angular component）
- 共享的样式表（例如CSS，SCSS）或样式表（Shared stylesheet (e.g., CSS, SCSS) or stylesheets）
- 应用程序使用的实用程序功能。（Utility function used by the application.）

对于每个组件，Bit存储三个元素：（For each component Bit stores three elements:）

- 源代码（包括代码本身，测试和文档）（The source code (including code itself, testing and documentation)）
- 依赖图（Dependency graph）
- 工具与配置（Tools & Configuration）

![](https://storage.googleapis.com/static.bit.dev/docs/images/component.svg)


### 源代码（Source code）
组件通过指定源文件开始其Bit之旅。
> A component starts its Bit journey by specifying the source files.

通常，组件的内容不仅是源代码本身，还可以包括相关的其他文件，例如样式文件，资产（图像，字体），测试代码，文档。
> Typically, the component’s content is not just the source code itself and can include additional files that are related, such as the styling files, assets (images, fonts), test code, documentation.

位将文件集映射到组件，并使用特定文件作为组件的入口点。 位将入口点文件标记为`主文件`（`main`）。
> Bit maps the set of files to a component, with a particular file as the entry point for the component. Bit marks the entry point file as main.

### 依赖图（Dependency graph）
将源添加到Bit组件时，Bit会分析它包含的所有依赖项（即，代码中的import和require语句）。 然后，Bit创建一个组件所有依赖项的模型。
> When adding sources to a Bit component, Bit analyzes all the dependencies it includes (i.e., import and require statements in the code). Bit then creates a model of all the dependencies of the component.

依赖项包括以下内容：（The dependencies include the following:）

- NPM软件包安装为node_modules（NPM packages installed as node_modules）
- 位组件已安装node_modules（Bit components installed node_modules）
- 导入到工作区的位组件（Bit components imported into the workspace）
- 从本地文件本地创建的位组件（Bit components created locally from local files）
- 依赖图使组件成为独立的，并允许在项目中移动组件而不会丢失任何引用。（The dependency graph makes a component self-contained and allows moving the component around projects without losing any references.）

### 工具与配置（Tools and Configuration）
Bit将每个组件与一组工具和配置链接在一起。 这些工具是专用组件，可以获取组件源代码及其依赖关系图并生成一些所需结果。
> Bit links each component with a set of tools and configurations. The tools are dedicated components that can take the component source code and its dependency graph and generate some desired result.

与组件链接的最常见工具是：
> The most common tools linked to components are:

-**Compiler**：编译或编译原始文件并生成内置的工件。 工件可由应用程序或其他组件消耗。 编译器特定于框架，并且通常还特定于框架的风格，因为它们包含运行它们所需的配置。
> -Compiler: compiles or transpiles the original files and generate built artifacts. The artifacts are consumable by applications or other components. Compilers are specific for frameworks and usually also for flavors of the framework, as they contain the configuration required to run them.

-**Tester**：一种扩展，用于运行与组件关联的测试并返回状态。
> -Tester: An extension that runs the tests associated with the component and returns status.

## 组件生命周期（Component lifecycle）
这是组件生命周期的鸟瞰图：
> Here is a bird-eye view of a component life cycle:


### 生产组件（Producing components）
-**Track**：通过指定组成组件的文件，在工作空间内启动组件。在此工作空间中，这是创作的组件。
> -Track: A component is initiated inside a workspace by specifying the files that comprise the component. In this workspace, this is an authored component.

-**Version**：标记版本会密封文件和该版本下的元数据的内容。如果组件具有编译器，则Bit会构建组件并密封所构建的工件（将其视为类似于git commit和npm同时发布）。
> -Version: Tagging a version seals the contents of the files and the metadata under this version. If the component has a compiler, Bit builds the component and seals the built artifacts as well (think of it as similar to a git commit and npm publish at the same time).

-**Export**：导出g组件将为该组件创建一个唯一ID。唯一的ID是远程作用域名称和本地组件名称，包括任何名称空间。 export命令将文件和元数据的副本发送到远程服务器。
> -Export: Exporting g the component creates a unique ID for the component. The unique id is the remote scope name and the local component name, including any namespaces. The export command sends a copy of the files and metadata to the remote server.

#### 消耗组件（Consuming components）
一旦驻留在远程作用域上，该组件便可供其他工作空间使用。使用组件的方式是通过安装或导入。
> Once residing on a remote scope, the component is available for consumption by other workspaces. The ways to consume the component are by installing it or by importing it.

-**Install**：位安装将软件包作为常规NPM软件包添加到node_modules文件夹中。安装组件时（位安装/ npm安装/毛线添加），该组件将添加到package.json中，指向已安装的版本：`"@bit/user.collection.tabs": "0.0.2"`。不会更改已安装组件的代码。
> -Install: Bit install adds the package as a regular NPM package to the node_modules folder. When installing a component (bit install / npm install / yarn add), the component is added to the package.json, pointing to the installed version: "@bit/user.collection.tabs": "0.0.2". Changes to the code of an installed component are not saved.

-**Import**：位导入将组件添加到工作区组件文件夹并跟踪其修改。在导入时，您可以看到package.json指向本地文件：`"@bit/user.collection.tabs": "file:./components/tabs"`。跟踪代码修改，并可以将其导出为新版本。 -弹出：如果导出了新版本，则可以恢复为已安装的组件。在这种情况下，package.json将更新回`"@bit/user.collection.tabs": "0.0.3"`
> -Import: Bit import adds the component to the workspace components folder and tracks its modifications. On an import, you can see that the package.json points to a local file: "@bit/user.collection.tabs": "file:./components/tabs". Code modifications are tracked and can be exported as a new version. -Eject: If a new version is exported, it is possible to revert to an installed component. In this case, the package.json is updated back to "@bit/user.collection.tabs": "0.0.3"

## 组件隔离（Component Isolation）
组件使您可以将代码分成独立的，可重用的部分，并单独考虑每个部分。 Bit分别管理每个组件，以确保其独立性和可重用性。
> Components let you split your code into independent, reusable pieces, and think about each piece in isolation. Bit manages each component separately to ensure its independence and reusability.

在分离的环境中包装每个组件可降低在不同项目和应用程序之间移动时组件行为异常的风险。
> Wrapping each component in a detached environment reduces the risk of component misbehaving when moved between different projects and applications.

对于每个组件，Bit都会构建一个与项目其余部分断开连接的上下文。在此上下文中，Bit创建了构建，测试和呈现组件所需的完整环境。
> For each component, Bit builds a context disconnected from the rest of the project. Inside this context, Bit creates a full environment required for building, testing and rendering the component.

![](https://storage.googleapis.com/static.bit.dev/docs/gifs/tree-capsule.gif)
组件上下文与NPM包的单独回购类似，其工作方式类似：（A component context is similar works in a way a separate repo for an NPM package looks like:）

- 仅组件的来源（这些是组件中跟踪的文件）（_The source of only of the component (these are the files tracked in the component)_）
- 组件所需的NPM软件包（_The NPM packages required by the component_）
- 该组件使用的其他Bit组件（_Additional Bit components utilized by this component_）
- 指向组件文件的Package.json（_Package.json pointing to the component files_）
- 处理组件所需的环境配置。例如`tsconfig.json`文件（用于基于Typescript的组件）或`.babelrc`（用于基于babel的组件）。（_Environment configurations required for processing the component. Such as tsconfig.json file for Typescript based component or .babelrc for babel based components._）

有关组件的所有信息都封装为组件数据的一部分。导入到新项目中的组件与所需的所有配置数据捆绑在一起。
> All the information about the component is encapsuled as part of the component data. A component imported into a new project comes bundled with all the configuration data needed.


## 组件特性（Component characteristics）
### 组件编号（Component id）
每个组件都有唯一的ID。我们在安装组件，导入组件或在项目中使用它时使用组件ID。
> Each component has a unique id. We use the Component id when installing the component, importing it, or utilizing it in the project.

组件的完整ID由集合名称，名称空间和简短ID组成：
> A full ID of a component comprises from the collection name, namespaces, and the short Id:

`owner.collection/namespace/namespace/short-id`；使用名称空间允许以与组织文件夹内文件相同的方式组织组件。
> owner.collection/namespace/namespace/short-id; Using namespaces allows organizing components in the same way we organize files inside folders.

但是，在使用程序包管理器（Yarn，NPM）安装组件时，无法使用以上名称。然后，名称翻译为：
> However, the above name is not usable when installing the components with package managers (Yarn, NPM). Then, the name translates to:

`@registry-name.owner.collection.namespace.namespace.short-id`。对于存储在bit.dev上的组件，注册表名称始终为@bit。
> @registry-name.owner.collection.namespace.namespace.short-id. For components stored on bit.dev, the registry name is always @bit.

要在代码中使用该组件，应按以下步骤导入：
> To use the component in the code, you should import as follow:

```javascript
import { something } from '@bit/owner.collection.namespace.namespace.short-id';
```

### 主文件（Main file）
每个组件都有一个主文件，该文件是该组件的入口点。主文件是源文件之一。位从主文件开始，并检查组件具有的所有依赖项。所有导入都应引用NPM软件包，例如，“ lodash”或组件或其他组件中包含的文件。
> Each component has a main file, which is an entry point to the component. The main file is one of the source files. Bit starts from the main file and checks all the dependencies the component has. All imports should reference NPM packages, e.g., 'lodash' or files included in the component or other components.

### 版本号（Versions）
使用语义版本控制对位组件进行版本控制。通过使用新版本标记组件来创建新版本的组件。然后，Bit对所有组件的文件和依赖项进行快照。使用bit export命令可以将新版本的组件共享给远程空间。
> Bit components are versioned using Semantic Versioning. Creating a new version of a component is done by tagging it with a new version. Bit then snapshots all the component's files and dependencies. New versions of components are shareable to remote scopes using the bit export command.

## 组件管理（Components Management）
Bit是用于组件的基于CLI的工具。位以两种格式存储组件：
> Bit is a CLI based tool for working with components. Bit stores components in two formats:

- 在空间内，Bit将Bit组件的语义表示存储为具有其所有历史记录和关系的对象。（_Inside a scope, Bit stores the semantic representation of Bit components as objects with all their history and relationships._）
- 在工作空间内，Bit存储该组件的单个版本的文件表示形式。（_Inside the workspace, Bit stores the file representation of a single version of the component._）

![](https://storage.googleapis.com/static.bit.dev/docs/images/scope-workspace.svg)

### 工作空间（Workspace）
当运行init命令时，Bit在工作项目中创建一个工作区。从那时起，您可以创建组件并将组件从本地空间检出到工作区中，并在项目中使用它们。
> Bit creates a workspace inside a working project when running the init command. From that point on, you can create components and checkout components from the local scope into the workspace and use them in the project.

工作区具有：（The workspace has:）

- 工作区配置-包含有关项目的信息，该项目包含Bit组件，例如用于安装它的程序包管理器，组件使用的编译器和测试器以及组件代码位置。工作空间配置存储在package.json的bit部分下，或存储在工作空间根目录下的单独的bit.json文件中。(Workspace configuration - contains information about the project that contains the Bit components such as the package manager used for installing it, the compilers and testers used by the components, and the components code location. The workspace configuration is stored under the bit section in the package.json or as a separate bit.json file at the workspace root.)
- 组件索引-定义组成每个组件的文件。位将索引存储在工作区根目录下的.bitmap文件中。（Components index - defines the files that comprise each component. Bit stores the index in the .bitmap file at the workspace root.）

在工作空间内，有两种类型的组件：（Inside a workspace, there are two types of components:）

- 创作的组件（[Authored components](https://docs.bit.dev/docs/workspace#authored-components)）
- 进口零件（[Imported components](https://docs.bit.dev/docs/workspace#imported-components)）

## 空间（Scope）
空间可以存在于工作空间内，也可以不存在工作空间。使用导入和导出命令在空间之间共享组件。
> A scope may exist inside a workspace or without a workspace. Components are shared between scopes using import and export commands.

组件作为有效存储的机制存储为内容可寻址存储。
> The components are stored as content addressable storage as a storage efficient mechanism.

空间位于`.bit`文件夹下。在也是git项目的工作空间中，它默认为`.git/bit`文件夹。
> The scope resides under the .bit folder. Inside a workspace that it is also a git project, it defaults to .git/bit folder.

使用bit`tag`和`checkout`命令可以在本地空间和工作区之间传输组件的单个版本。
> Use the bit tag and checkout commands to transfer a single version of a component between the local scope and the workspace.

注意：Bit工作区和空间受到Git中用于管理git工作区和git存储库的机制的极大启发，因此，如果您熟悉它们，则更容易理解Bit。
> Note: Bit workspace and scope are highly inspired by the mechanisms used in Git for managing a git workspace and a git repository, so if you are familiar with those, it is easier to understand Bit.

### 远程空间（Remote Scope）
远程作用域是驻留在服务器上的作用域，也称为裸作用域，因为它是在工作空间外部定义的。
> The remote scope is a scope that resides on a server, also called a bare scope, since it is defined outside a workspace.

远程作用域用于共享组件，因此，实际上，它是将组件导出和导入的地方。
> A remote scope is used for sharing components, so it is, in fact, a place where components are exported to and imported from.

用户可以设置保存远程作用域的位服务器，以便在位工作区之间共享组件。另外，用户可以使用bit.dev来存储组件的远程作用域。
> A user can set up a Bit Server that holds remote scopes for sharing components between Bit workspaces. Alternatively, users can use bit.dev for storing remote scopes of components.

下图突出显示了在本地工作空间，地图索引（`.bitmap`文件），本地空间（`.git/.bit`）和远程空间之间移动组件的主要命令：
> The diagram below highlights the main commands that move components between the local workspace, the map index (.bitmap file), the local scope (.git/.bit) and the remote scope:

![](https://storage.googleapis.com/static.bit.dev/docs/images/commands_overview.svg)
