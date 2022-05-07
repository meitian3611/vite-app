import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from "vite-plugin-mock"
import path from 'path'

// element 自动导入
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//@ts-ignore
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', //打包路径
  plugins: [
    vue(),
    viteMockServe({
      supportTs: true
    }),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@static': path.resolve(__dirname, 'src/assets'),
      'com': path.resolve(__dirname, 'src/components'),
    },
    // 导入时想要省略的扩展名列表  不建议使用 .vue 影响IDE和类型支持
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `$injectedColor:orange;`,
        additionalData: '@import "@/assets/style/mian.scss";',
      },
    },
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: ['axios'],
  },
  //启动服务配置
  server: {
    host: "0.0.0.0",
    cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
    open: true, // 服务启动时自动在浏览器中打开应用
    https: false, // 是否启用 http 2
    port: 9000,
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.99.223:3000', //代理接口
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    target: 'modules',
    outDir: 'dist', // 指定输出路径
    emptyOutDir: true, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    assetsDir: 'static', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器 , terser 构建后文件体积更小
    reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    terserOptions: {
      compress: {
        // 打包生产环境 去除 console 和 debug
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // manualChunks(id) { //静态资源分拆打包
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }
      },
    },
  },
})
