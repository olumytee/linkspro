module.exports = {
  head: {
    title: 'The Gram',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'
      },
      { hid: 'description', content: 'The Gram' }
    ]
  },
  css: [
    '@/assets/css/spectre.min.css',
    '@/assets/css/spectre-icons.min.css',
    '@/assets/css/spectre-exp.min.css',
    '@/assets/css/general.css'
  ],
  plugins: [
    { src: '@/plugins/ga.js', ssr: false }
  ],
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type);
      }
    }
  },
  build: {
    vendor: ['axios'],
    extractCSS: true
  }
};
