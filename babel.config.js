module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: 'ui/tamagui.config.ts',
          logTimings: true,
          disableExtraction: process.env.NODE_ENV === 'development',
        },
      ],
      [
        'module-resolver',
        {
          alias: {
            crypto: 'react-native-quick-crypto',
            stream: 'readable-stream',
            buffer: '@craftzdog/react-native-buffer',
          },
        },
      ],

      // NOTE: this is only necessary if you are using reanimated for animations
      'react-native-reanimated/plugin',
    ],
  }
}
