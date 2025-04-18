const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions:{
      postcss:{
        postcssOptions: {
          plugins: [
            require('autoprefixer')(),
            require('postcss-pxtorem')({
              rootValue: 20, // 根据设计稿宽度调整，例如设计稿宽度是750px
              propList: ['*'], // 需要转换的属性，* 表示全部
            }),
          ],
        },
      }
    }
  }
})
