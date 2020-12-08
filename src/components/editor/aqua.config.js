import bg from './aqua-chan.png'

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
      const img = new Image

      img.src = bg
      img.classList.add('bg-image')
      img.onload = () => {
        aqua.uiMgr.get('bgCntr').appendChild(img)
      }
    },
    ready(aqua) {},
    destroyed() {},
  },

  plugins: [],
}
