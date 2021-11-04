module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "component",
      {
        libraryName: "d-components",
        style: "style/index.css"
      }
    ]
  ]
}
