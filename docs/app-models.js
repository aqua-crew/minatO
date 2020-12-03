const Tab = {
  id: '',
  name: '',
  ext: '',
}

const File = {
  basic: {
    createdTime: -1,
    updatedTime: -1,
    size: -1,
    position: Position,
    author: User,
    ...Tab,
  },
  editor: {
    complex: '0', // '1' 包含自定义 asset,
    content: '',
  },
}


/* Meta */
const Position = `/${pid}` + Position || ''
const User = { uid: '', name: '', }

