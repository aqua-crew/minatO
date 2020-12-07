const bg = require('./aqua-chan.png')

export default {
  content: '',

  ui: {
    theme: 'aqua',
    xOverflow: 'break', // 'scroll'
    yOverflow: 'scroll', // 'extend'
  },

  assets: {
    image: {
      allow: ['inline', 'block']
    },
  },

  options: {
    readOnly: false,
    multipleCursors: true,
  },

  langs: {
    default: 'text',
    text: true,
  },

  line: {
    start: 1,
    height: 25,
  },

  lifetimes: {
    setup(aqua) {
      aqua.uiMgr.get('bgCntr').innerHTML = `<img id="aq" class="bg-image" src="${bg}" />`
    },
    ready(aqua) {},
    destroyed() {},
  },

  plugins: [],
}
