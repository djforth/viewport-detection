const getPlugins = ({ env }) => {
  const plugins = [
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-object-rest-spread',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
    [
      '@babel/plugin-transform-regenerator',
      {
        async: false,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
  ];

  const testPlugins = [
    'babel-plugin-dynamic-import-node',
    '@babel/transform-async-to-generator',
    [
      'istanbul',
      {
        exclude: [
          '** /*.test.js',
          '**/*.test.jsx',
          '** /*.helper.js',
          '**/*.helpers.js',
          '**/__helpers__ /**/*.js',
          '**/__mocks__ /**/*.js',
          '**/enzyme_setup.js',
          '**/setupTests.js',
          '**/shim.js',
        ],
      },
    ],
  ];
  const devPlugins = [];
  const prodPlugins = ['lodash'];

  if (env('test')) return plugins.concat(testPlugins);
  if (env('development')) return plugins.concat(devPlugins);

  return plugins.concat(prodPlugins);
};

const getPresets = ({ env }) => {
  const devTestEnv = [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['>0.25%', 'IE >= 11', 'not op_mini all'],
        },
      },
    ],
  ];

  const presets = [];

  const testPresets = devTestEnv;
  const devPresets = devTestEnv;
  const prodPresets = [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: ['>0.25%', 'IE >= 11', 'not op_mini all'],
        },
        forceAllTransforms: true,
      },
    ],
  ];

  if (env('test')) return presets.concat(testPresets);
  if (env('development')) return presets.concat(devPresets);

  return presets.concat(prodPresets);
};

module.exports = function(api) {
  // var validEnv = ['development', 'test', 'production'];

  return {
    presets: getPresets(api),
    plugins: getPlugins(api),
    comments: true,
  };
};
