# Bit工作区（Bit Workspace）
Bit工作围绕工作空间。 工作区包含有关所有组件信息的信息，并提供创作，导出，导入和安装组件的功能。 通常将每个VCS存储库都设为一个工作区。
> Working in Bit revolves around workspaces. A workspace contains information about all the components information and provide the functionality to author, export, import, and install components. It is customary to make each VCS repository a single workspace.

![](https://storage.googleapis.com/static.bit.dev/docs/images/workspace.svg)

## 初始化工作区（Initializing Workspace）
通过运行`bit init`命令初始化Bit工作区。初始化工作空间的文件夹被设置为工作空间的根目录。
> Initialize Bit workspace by running bit init command. The folder in which the workspace was initialized, is set as the workspace root.

初始化Bit工作区将以下资源添加到项目中：（Initializing Bit workspace adds the following resources to a project:）

- 工作区配置（位配置）（workspace configuration (bit config)）
- 组件图（.bitmap）（components map (.bitmap)）
- 零件存放（components storage）

### 工作区配置（Workspace Configuration）
Bit配置位于项目的`package.json`（如果存在）或`bit.json`文件中。位配置包含有关项目的常规信息。这是一个例子：
> The Bit config resides inside the project's package.json (if one exists) or in a bit.json file. The Bit config contains general information about the project. Here is an example:

```json
"bit": {
    "env": {
        "compiler": "bit.envs/compilers/react@6.0.0"
    },
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm",
    "overrides": {
        "utils/sort-array": {
            "env": {
                "compiler": "bit.envs/compilers/babel@6.0.0"
            }
        },
        "ui/*": {
            "peerDependencies": {
                "react": "16.8.6",
                "react-dom": "16.8.6"
            }
        }
    }
}
```

Bit工作空间的配置选项的完整列表[在此处](https://docs.bit.dev/docs/conf-bit-json)详细说明。您可以在下面找到有关特定选项的用法。
> The full list of configuration options of Bit workspace is detailed here. Below you can find about the usage of specific options.

### 组件图（Components Map）
组件映射位于项目根目录下的`.bitmap`文件中。
> The component map resides inside the .bitmap file inside the project's root.

Bit使用此文件在组件和组成它们的文件之间保持链接。每次更改组件时，Bit都会修改位图文件。添加文件，标记组件，导入或导出时会发生更改。
> Bit uses this file keep a link between components and the files that comprise them. Bit modifies the bitmap file every time the components are changed. Changes happen when adding files, tagging components, importing, or exporting.

为了使VCS信息库与Bit组件保持同步，每当组件更改时，`.bitmap`文件都应提交到VCS系统。重要的是要注意，只有在标记和导出组件之后，代码才能在组件上保持不变。任何正在进行的工作都存储在本地或可以提交给VCS。
> To keep the VCS repository in sync with Bit components, the .bitmap file should be committed to the VCS system whenever components are changed. It is important to note that code is persistent on component only after tagging and exporting the component. Any work in progress is stored locally or can be committed to the VCS.

### 组件存储（空间）（Components Storage (scope)）
工作区的组件存储包含有关Bit组件的信息，例如源文件，版本和依赖项。默认情况下，组件存储是`.git/bit`目录下git存储库的扩展，但可以存储在其他位置，例如`.bit`文件夹下。
> The workspace's component storage contains information about Bit components, such as source files, versions, and dependencies. By default, the components store is an extension to the git repository under .git/bit directory, but can be stored elsewhere, such as under a .bit folder.

组件存储中的信息不应提交给VCS，因为Bit可以通过导入驻留在远程集合中的组件或从组件的文件中导入来重建信息。
> The information in the component storage should not be submitted to the VCS as Bit can rebuild it by importing components that reside on remote collections, or from the component's files.

要强制Bit不要将本地存储嵌套在`.git`中，请使用`--standalone`标志：
> To force Bit not to nest the local storage in .git, use the --standalone flag:

```shell
bit init --standalone
```

如果错误导致数据损坏，则可以通过运行以下命令来重置组件的存储：
> If an error caused data corruption, you could reset the component's storage by running:

```shell
bit init --reset
```

在工作空间内，有两种类型的组件：
> Inside a workspace, there are two types of components:

- 创作的组件（Authored components）
- 进口零件（Imported components）

尽管创作的组件和导入的组件之间有很多相似之处，但仍有一些重要的差异值得注意。
> Although there are lots of similarities between authored and imported components, there are some key differences worth noticing.

## 创作的组件（Authored Components）
在当前工作空间内启动的组件被视为“创作”组件。
> Components that initiated inside the current workspace are considered "authored" components.

组件的文件保留在其原始路径中，而Bit指向其位置。因此，在移动作为组件组成部分的文件时，应使用[`bit move`](https://docs.bit.dev/docs/apis/cli-all#move)命令指定新位置，以便Bit可以更新引用。
> The component's files retained in their original path, and Bit points to their locations. Therefore, when moving files that are parts of components, you should use the bit move command to specify the new location so that Bit can update the references.

当Bit为创作的组件计算依赖关系图时，它将使用`package.json`中定义的npm包。位从文件的文件夹中遍历，并找到最接近的package.json到工作空间的根。要更改软件包的版本，添加软件包或删除软件包，可以指定适用于组件的[覆写规则](https://docs.bit.dev/docs/overrides)。
> When Bit calculates the dependency graph for an authored component, it uses the npm packages as defined in package.json. Bit traverses from the file's folder and locates the nearest package.json up to the workspace root. To change the versions of the packages, add packages, or remove packages, you can specify an override rule that apply to the component.

### 模块解析（Modules Resolution）
Bit还使用`resolveModules`工作区配置来解析模块位置。此配置有两个选项：
> Bit also uses the resolveModules workspace configuration to resolve modules locations. This configuration has two options:

```json
"resolveModules": {
  "modulesDirectories": ["src"],
  "aliases": {
    "@": "someDir"
  }
}
````

`modulesDirectories`选项增强了Bit搜索模块的位置。此配置等效于[Webpack `resolve.modules`](https://webpack.js.org/configuration/resolve/#resolvemodules)，并且类似于[Typescript `rootDirs`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#virtual-directories-with-rootdirs)。因此，如果您在项目中定义了任何配置，则还应该在Bit中定义此配置。
> The modulesDirectories option enhances the locations where Bit searches for modules. This configuration is equivalent to Webpack resolve.modules and is similar to Typescript rootDirs. So if you have any of those defined in the project, this configuration should also be defined in Bit.

`aliases`通过将某些别名映射到完整路径来简化导入路径。这等效于[Webpack `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias)和[Typescript `paths`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)。
> The aliases simplify paths for imports by mapping certain alias to a full path. This is equivalent to Webpack resolve.alias and to Typescript paths.

### 工具类（Tools）
创作的组件使用在[workspace's env](https://docs.bit.dev/docs/conf-bit-json#env)参数中定义的编译器和测试器。要更改此编译器，您可以指定一个[覆写规则](https://docs.bit.dev/docs/overrides)来更改默认值。
> Authored components use the compiler and tester defined in the workspace's env parameter. To change this compiler, you can specify an override rule that changes the defaults.

### 建立档案（Build files）
在构建创作的组件时，构建文件位于相对于工作空间根目录在工作空间内配置的[dist文件夹](https://docs.bit.dev/docs/conf-bit-json#dist)中。默认情况下，所有组件的目录均为`<workspace root>/dist`。在此文件夹中，生成的路径相对于项目中的组件路径。
> When building an authored component, the build files reside inside the dist folder configured inside the workspace relatively to the workspace root directory. By default this will be <workspace root>/dist for all components. Inside this folder, the generated path is relative to the component path in the project.

## 进口零件（Imported Components）
导入的组件是使用从远程作用域中的`bit import`添加到工作空间中的组件。请注意，使用软件包管理器（NPM，Yarn）安装组件时，这些组件被视为常规的`node_modules`软件包，而不是作为导入的组件。
> Imported components are components that are added to the workspace using bit import from a remote scope. Note, that when installing the component using a package manager (NPM, Yarn), the components are considered regular node_modules packages and not as imported components.

导入的组件的结构与创作的组件不同。对于每个导入的组件，Bit都会生成一个类似包的结构。生成的结构类似于单仓库中的包结构，其中Bit自动执行定义。
> Imported component's structure is different from the authored component. For each imported component, Bit generates a package-like structure. The built structure is similar to a package structure in a mono-repo, with Bit automating the definition.

### 组件目录（Component Directory）
导入组件后，Bit会将其放在工作区配置[componentsdefaultdirectory](https://docs.bit.dev/docs/conf-bit-json#componentsdefaultdirectory)定义的文件夹内。默认为`components/<folder name>`。
> When a component is imported, Bit places it inside the folder defined in workspace configuration componentsdefaultdirectory. It is defaulted to components/<folder name>.

您可以在import语句中覆盖特定组件的位置：
> You can override the location for a specific component during the import statement:

```shell
bit import username.foo/bar --path /path/to/folder
```

### Package.json
对于每个导入的组件，Bit都会在组件的根目录中生成一个`package.json`文件。 package.json是基于组件信息生成的。
> For each imported component, Bit generates a package.json file, in the component's root directory. The package.json is generated based on the component information.

Bit生成`package.json`以包含组件中定义的`name`和`version`。 `main`属性指向组件的生成的主文件。
> Bit generates the package.json to include the name and version defined in the component. The main property points to the generated main file of the component.

您可以将任何其他属性添加到`package.json`文件。
> You can add any other properties to the package.json file.

生成文件时，Bit还会添加在工作区的`overrides`中定义的所有信息，这些信息将应用于该组件。
> When generating the file, Bit also adds any information defined in the workspace's overrides information that applies to the component.

您可以通过在导入命令期间指定Bit来指示Bit跳过为文件编写`package.json`的操作：
> You may instruct Bit to skip writing the package.json for a file by specifying it during the import command:

```shell
bit import username.foo/bar --ignore-package-json
```

您还可以通过指定`--conf`选项来指定Bit将配置写入`bit.json`文件。添加路径以确定`bit.json`文件的位置。
> You can also specify that the Bit writes the configuration to a bit.json file by specifying a --conf option. Add a path to determine the location of the bit.json file.

```shell
bit import username.foo/bar --path /path/to/conf
```

这是导入的组件package.json的示例：
> Here is an example of an imported component package.json:

```json
{
    "name": "@bit/bit.utils.array.diff",
    "version": "1.0.0",
    "homepage": "https://bit.dev/bit/utils/array/diff",
    "main": "dist/src/array/diff.js",
    "dependencies": {},
    "devDependencies": {
        "chai": "^4.1.2"
    },
    "peerDependencies": {},
    "componentRootFolder": "components/array/diff",
    "license": "SEE LICENSE IN LICENSE",
    "bit": {
        "env": {
            "compiler": "bit.envs/compilers/flow@0.0.10",
            "tester": "bit.envs/testers/mocha@0.0.5"
        },
        "overrides": {}
    }
}
```

### 依存关系（Dependencies）
Bit组件具有两种类型的[依赖关系](https://docs.bit.dev/docs/dependencies)：常规NPM软件包和Bit组件。
> A Bit component has two types of dependencies: regular NPM packages and Bit components.

导入组件时，Bit为每个具有依赖项的组件生成一个`node_modules`文件夹。
> When importing a component Bit generates for each component that has dependencies a node_modules folder.

Bit使用在工作空间配置中定义的[首选软件包管理器](https://docs.bit.dev/docs/conf-bit-json#packagemanager)来安装软件包。您可以通过在参数配置中指定其他参数来将其他[参数传递](https://docs.bit.dev/docs/conf-bit-json#packagemanagerargs)给软件包管理器，该参数会将两次双破折号传递给执行软件包管理器的命令，例如：
> Bit uses the preferred package manager defined in workspace configuration to install the packages. You can pass additional arguments to the package manager by specifying them in the arguments configuration passing twice double dashes to the command that executes the package manager such as:

```shell
bit import foo -- --no-package-lock
```

您可以使用以下命令完全跳过安装组件：
> You can skip installing the components altogether by using:

```shell
bit import username.foo/bar --skip-npm-install
```

另外，当跳过`package.json`的生成时，Bit不会安装组件。
> Also, Bit does not install components when skipping the generation of package.json.

要永久跳过安装软件包，请将[`saveDependenciesAsComponents`](https://docs.bit.dev/docs/conf-bit-json#savedependenciesascomponents)工作区配置设置为true。
> To permanently skip installing packages, set to true the saveDependenciesAsComponents workspace configuration.

如果未使用程序包管理器安装Bit组件的依赖项，则Bit会将它们导入工作空间。位将依赖项放置在配置中[`dependenciesDirectory`](https://docs.bit.dev/docs/conf-bit-json#dependenciesdirectory)选项中指定的目录中。默认目录为`components/.dependencies`。
> If the Bit components' dependencies are not installed using package manager, Bit imports them into the workspace. Bit places the dependencies in the directory specified in the dependenciesDirectory option in the configuration. The default directory is components/.dependencies.

### 源代码（Source code）
Bit以模仿原始项目的文件夹结构所需的最小结构为组件源代码生成文件夹结构。如果所有组件都位于单个文件夹中的原始项目中，则组件中的源代码位于单个文件夹中。如果原始项目的组件文件位于同级文件夹中，则Bit会在组件根文件夹下创建两个文件夹。
> Bit generates a folder structure for the component source code in the minimal structure required to imitate the original project's folder structure. If all components reside in the original project in a single folder, the source code in the component resides in a single folder. If the original project has the component files located in sibling folders, Bit creates both folders under the component root folder.

### 建立目录（Build Directory）
默认情况下，Bit在导入组件时会导入已构建的工件，并将其放置在组件的`dist`文件夹下。
> By default, Bit imports the built artifacts when importing components and places them under the dist folder of the component.

要跳过导入构建文件并在本地构建它们，请运行：
> To skip importing the build files and build them locally run:

```shell
bit import username.foo/bar --ignore-dist
```

## 工作区状态（Workspace statuses）
`bit status`[命令](https://docs.bit.dev/docs/apis/cli-all#status)显示项目工作区中被跟踪组件的状态。
> The bit status command displays the state of the tracked components in your project's workspace.

知道工作区组件的状态始终很重要-例如，哪些组件已登台，已修改或缺少依赖项。重要的是要注意，我们所讨论的是**具有待更改的组件的状态**，即即将导出的组件，可以在首次导出之前对其进行跟踪，或者在导出之后进行修改。
> Knowing the state of the workspace's components is always important - which components are staged, modified or have missing dependencies, for example. It's important to note that we're talking about the state of components with pending changes - meaning, components that are pending export - they could be tracked and before their first export, or modified after export.

一个组件可能以不止一种状态存在。从其代码状态（例如，已修改）派生的状态和从其依赖项（例如，待标记）待派生的状态。
> A component may exist in more than one state. A state that is derived from its code status (such as modified) and a state derived from its dependencies (e.g. pending to be tagged).

此处列出了所有可能的组件状态。
> Listed here are all possible component states.

### 没有标签或导出内容（Nothing to tag or export）
这意味着没有组件具有待定更改-工作空间中没有跟踪文件，或者被跟踪或导出的组件没有待定更改。
> This means there are no components with pending changes - either there are no files tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```shell
$ bit status
nothing to tag or export
```


### 新组件（New components）
已跟踪但尚未标记的组件。
> Components that have been tracked, but not yet tagged.

Bit尝试验证是否可以隔离新组件，并将打印发现的所有隔离问题（如果有）。
> Bit tries to to validate if a new component can be isolated, and will print all isolation issues it finds (if any).

[阅读有关不同隔离问题以及如何解决它们的更多信息。](https://docs.bit.dev/docs/add-and-isolate-components#isolation-errors)
> Read more about the different isolation issues and how to resolve them.

```shell
$ bit status
new components
  (use "bit tag --all [version]" to lock a version with all your changes)

          > bits/a ... ok
```

### 分阶段的组件（Staged components）
准备将所有已标记的组件[导出](https://docs.bit.dev/docs/apis/cli-all#export)并共享到远程Collection。
> All tagged components that are ready to be exported and shared to a remote Collection.

分阶段的组件通过位完全隔离。
> Staged component are fully isolated by Bit.

```shell
$ bit status
staged components
  (use "bit export <remote_collection> to push these components to a remote Collection")

  > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
  > string/is-string. versions: 0.0.1 ... ok
  > string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```


### 修改后的组件（Modified components）
已经暂存，导出或获取，然后经过修改的组件-意味着至少有一个带标签的版本，并且在其之上未加标签的更改。修改后的组件应被标记并设置为新版本。
> Components that have already been staged, exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it. Modified components are meant to be tagged and set as a new version.

Bit试图验证修改后的组件是否可以隔离，并将打印发现的所有隔离问题（如果有）。
> Bit tries to to validate if a modified component can be isolated, and will print all isolation issues it finds (if any).

[阅读有关不同隔离问题以及如何解决它们的更多信息。](https://docs.bit.dev/docs/add-and-isolate-components#isolation-errors)
> Read more about the different isolation issues and how to resolve them.

```shell
$ bit status
modified components
  (use "bit tag --all [version]" to lock a version with all your changes)
  (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### 待更新（Pending updates）

可通过位导入获取具有较新版本的组件，并且可以使用。使用[`bit checkout`](https://docs.bit.dev/docs/apis/cli-all#checkout)开始使用较新的版本。
> Components with newer versions fetched by bit import and available to use. Use bit checkout to start using the newer version.

```shell
$ bit status
pending updates
  (use "bit checkout [version] [component_id]" to merge changes)
  (use "bit diff [component_id] [new_version]" to compare changes)
  (use "bit log [component_id]" to list all available versions)

        > string/pad-left current: 0.0.1 latest: 0.0.2
```

### 删除的组件（Deleted components）
组件的文件实际上已从文件系统中删除，但该组件仍按位列出。应该使用`bit remove`来删除该组件。
> A component's files were physically deleted from the filesystem, but the component is still listed by Bit. The component should be removed using bit remove.

```shell
$ bit status
deleted components
  these components were deleted from your project.
  use "bit remove [component_id]" to remove these component from your workspace

         > bits/b ... ok
```

### 待处理的组件将被自动标记（Component pending to be tagged automatically）
至少有一个依存关系处于修改状态的组件（非新状态）。
> Component (not in state new) whose at least one of its dependencies is in modified state.

```shell
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
  > string/index ... ok
```

## 错误与故障排除（Errors & Troubleshooting）

### Bit Doctor
`bit doctor`是位工作区的自我诊断和修复工具。运行：
> bit doctor is a self diagnosis and healing tool for Bit workspaces. Run:

```shell
bit doctor
```

输出是Bit当前执行的所有诊断的列表。如果任何检查失败，Bit会建议对此进行修复。
> The output is a list of all diagnosis that Bit currently implements. If any of the checks has failed, Bit suggests a fix for it.

在某些情况下，维护人员将需要其他工作区信息以调试问题。 Doctor能够以可共享的格式保存来自工作区的最重要的数据和日志。
> At some cases the maintainers will need additional workspace information in order to debug an issue. Doctor is capable of saving the most important data and logs from the workspace in a shareable format.

在向[项目存储库](https://github.com/teambit/bit)发布问题时使用此文件。
> Use this file when opening an issue to the project repository.

注意，在提交输出之前，您可以打开它以确认没有提交敏感信息。您可以从文件中清除此类信息。
> Note, before submitting the output you can open it an validate that no sensitive information is submitted. You can clear such information from the file.

```shell
bit doctor --save doctor-results
```

### 日志（Logs）
一些错误和其他信息记录在Bit的日志文件中，但未在控制台输出中显示。如果遇到问题，则值得检查日志文件。
> Some errors and additional information are document in Bit's log files but not displayed in the console output. If you're having problems, it's worth checking the log files.

Bit的日志文件存储在：（Bit's log files are stored in:）

- For Mac/Linux - `~/Library/Caches/Bit/logs`.
- For Windows - `%LOCALAPPDATA%/Bit/logs`. 如果未定义`％LOCALAPPDATA％`，将使用用户配置文件目录代替`％LOCALAPPDATA％`。此处提供了其他后备[选项](https://github.com/sindresorhus/os-homedir/blob/master/index.js)。

共有三种不同的日志类型：
> There are three different log types:

- Debug log - `debug.log`
- Exceptions log - `exceptions.log`
- Extensions log - `extensions.log`

每个日志文件的大小最大为10MB，每种类型最多可以有10个日志文件。它们的编号如下：`debug.log`，`debug1.log`，`debug2.log`等。这些日志文件实际上是[winston日志](https://github.com/winstonjs/winston)，并且可以[tailable](https://github.com/winstonjs/winston/blob/master/docs/transports.md)。
> Each log file's size can be maximum 10MB, and there can be maximum 10 log files of each type. They will be numbered as follows: debug.log, debug1.log, debug2.log, etc. The log files are actually winston logs, and are tailable.

### 缓存（Cache）
如果发生错误，值得尝试清除Bit的缓存以防损坏。您可以使用[clear cache](https://docs.bit.dev/docs/apis/cli-all#clear-cache)命令清除它：
> If errors occur, it is worth trying to clear Bit's cache in case it got corrupted. You can clear it using the clear cache command:

```shell
bit clear-cache
```
