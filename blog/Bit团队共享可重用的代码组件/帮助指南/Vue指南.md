# Vue指南
Vue support is in public beta. Known issues:
Playground does not support specific webpack configuration such as Vuetify.

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds vue specific best practices on top of Bit's general Best Practices.

Vue playground was tested on vue 2 and vue-cli 3. Bit should be compliant with prior versions.

Note: Try the Bit for Vue tutorial.

Vue Compiler
Each Bit component is linked with a compiler. The Bit compiler is transpiling or bundling the source code to build files that can run in another project.
The officially supported vue Compiler can be found here.
To install it in your project run:

$bit import bit.envs/bundlers/vue --compiler
the following component environments were installed
- bit.envs/bundlers/vue@2.6.10
The compiler is based on the Vue webpack configuration. Check out the exact configuration here.

Using Vue SFC in target projects
Note that this compiler is in fact a bundler, as it uses Vue webpack to separate the vue SFC (Single File Component ) format into separate JS and CSS files and then bundles them. If you want to include the component into your Vue project that will compile and bundle it, or if you are using SSR (such as Nuxt.js), you should import the SFC itself as follow:

import MyComp from '@bit/username.collection.component/sfc' //Note the SFC at the end.
Learn more about this in Vue documentation

Use symlinks false in target project
When importing components, Bit is using symlinks to point to the component location (similar to npm link). In order to compile the application, you need to enhance the bit webpack configuration to properly work with symlinks.

If you do not have a webpack configuration in your project, add a new file vue.config.js with the following configuration:

module.exports = {
    configureWebpack: {
        resolve: {
            symlinks: false // support npm link
        },
    }
}
If you already have a configuration, you just need to add the relevant key in the proper place. This tells Vue webpack to retain the symlinks.

Vue Tester
Each Bit component may be linked with a tester that will run the unit tests of the compiler. vue testers are still WIP.

Sharing Components with VueX
Read here for suggestion on how to share components that use state managers.

Handling Assets and Styles
Refer to the general guidelines on how to handle assets amd styles.
