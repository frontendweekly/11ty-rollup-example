const rollup = require('rollup');
const loadConfigFile = require('rollup/dist/loadConfigFile');
const {resolve} = require('path');

const rollupConfigFile = resolve(__dirname, '../../rollup.config.js');

module.exports = class {
  async render(data) {
    // Stolen from:
    // https://rollupjs.org/guide/en/#programmatically-loading-a-config-file
    loadConfigFile(rollupConfigFile, {format: 'iife'}).then(
      async ({options, warnings}) => {
        const option = options[0];
        // "warnings" wraps the default `onwarn` handler passed by the CLI.
        // This prints all warnings up to this point:
        console.log(`We currently have ${warnings.count} warnings`);

        // This prints all deferred warnings
        warnings.flush();

        // options is an "inputOptions" object with an additional "output"
        // property that contains an array of "outputOptions".
        // The following will generate all outputs and write them to disk the same
        // way the CLI does it:
        const bundle = await rollup.rollup(option);
        await Promise.all(option.output.map(bundle.write));

        // You can also pass this directly to "rollup.watch"
        rollup.watch(option);
      }
    );
  }
};
