module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ['@babel/preset-react']
  ],
  plugins: [
    !process.env.isProduction && ['react-refresh/babel']
  ].filter(Boolean)
}