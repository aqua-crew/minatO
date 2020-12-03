const imageHotaru = require('/src/mock/images/hotaru.jpg')
const imageBaabara = require('/src/mock/images/baabara.jpg')
const imageKlee = require('/src/mock/images/kure.jpg')
const imageKokusei = require('/src/mock/images/kokusei.jpg')

const user = {
  "uid": "1000001",
  "name": "ayarin0x0"
}

const projects = [
  {
    "pid": "100000001",
    "name": "Aqua",
    "desc": "Project Aqua",
    "image": imageHotaru,
    "createTime": "1604513154233",
    "updateTime": "1604513155345",
    "creator": "1000001",
    "team": "0"
  },
  {
    "pid": "100000035",
    "name": "Kokusei",
    "desc": "Test Description: kokusei",
    "image": imageKokusei,
    "createTime": "1604513159233",
    "updateTime": "1604513159345",
    "creator": "1000001",
    "team": "0"
  }
]

const projectAqua = {
  ...projects[0],
  "files": [
    {
      "fid": "1",
      "name": "src",
      "isFold": true,
      "parent": "0"
    },
    {
      "fid": "10",
      "name": "aqua",
      "ext": "js",
      "parent": "0"
    },
    {
      "fid": "2",
      "name": "editor",
      "isFold": true,
      "parent": "1"
    },
    {
      "fid": "3",
      "name": "editor",
      "ext": "vue",
      "parent": "2"
    },
    {
      "fid": "4",
      "name": "images",
      "isFold": true,
      "parent": "2"
    },
    {
      "fid": "5",
      "name": "kokusei",
      "ext": "jpeg",
      "parent": "4"
    },
    {
      "fid": "6",
      "name": "stage",
      "isFold": true,
      "parent": "1"
    },
    {
      "fid": "7",
      "name": "stage",
      "ext": "vue",
      "parent": "6"
    },
    {
      "fid": "8",
      "name": "index",
      "ext": "html",
      "parent": "0"
    },
    {
      "fid": "9",
      "name": "temp-aqua",
      "ext": "stylus",
      "parent": "-1"
    }
  ]
}

const projectKokusei = {
  ...projects[1],
  "files": [
    {
      "fid": "1",
      "name": "src",
      "isFold": true,
      "parent": "0"
    },
    {
      "fid": "2",
      "name": "editor",
      "isFold": true,
      "parent": "1"
    },
    {
      "fid": "3",
      "name": "editor",
      "ext": "vue",
      "parent": "2"
    },
    {
      "fid": "4",
      "name": "images",
      "isFold": true,
      "parent": "2"
    },
    {
      "fid": "5",
      "name": "kokusei",
      "ext": "jpeg",
      "parent": "4"
    },
    {
      "fid": "6",
      "name": "stage",
      "isFold": true,
      "parent": "1"
    },
    {
      "fid": "7",
      "name": "stage",
      "ext": "vue",
      "parent": "6"
    },
    {
      "fid": "8",
      "name": "index",
      "ext": "html",
      "parent": "0"
    },
    {
      "fid": "9",
      "name": "temp-color",
      "ext": "stylus",
      "parent": "-1"
    },
    {
      "fid": "10",
      "name": "temp-interface",
      "ext": "ts",
      "parent": "-1"
    }
  ]
}

const workspace = {
  "pid": "100000035",
  "project": JSON.parse(JSON.stringify(projectKokusei)),
  "currentTab": "3",
  "tabs": [
    "7",
    "9",
    "3",
    "8",
    "10"
  ],
}

const contents = {
  "10000001": {
    "5": {
      "content": "This is a IMAGE from aqua"
    },
    "7": {
      "content": `stage.js from aqua. Fid: 7`
    },
    "9": {
      "content": "temp-interface.ts from aqua. Fid: 9"
    },
    "3": {
      "content": "editor.vue from aqua, Fid: 3"
    },
    "8": {
      "content": "index.html from aqua, Fid: 8"
    },
    "10": {
      "content": "temp-color.stylus from aqua, Fid: 10"
    },
  },

  "100000035": {
    "5": {
      "content": "This is a IMAGE from kokusei"
    },
    "7": {
      "content": `stage.js from kokusei. Fid: 7
      const api = {
        get(path) {
          switch(path) {
            case '/workspace':
              return workspace
            case '/projects':
              return projects

            case '/project/100000035':
              return projectKokusei

            case '/project/100000035/file/5':
              return contents['100000035']['5']
            case '/project/100000035/file/7':
              return contents['100000035']['7']
            case '/project/100000035/file/9':
              return contents['100000035']['9']
            case '/project/100000035/file/3':
              return contents['100000035']['3']
            case '/project/100000035/file/8':
              return contents['100000035']['8']
            case '/project/100000035/file/10':
              return contents['100000035']['10']
          }
        }
      }`.split('\n')
    },
    "9": {
      "content": "temp-interface.ts from kokusei. Fid: 9"
    },
    "3": {
      "content": "editor.vue from kokusei, Fid: 3"
    },
    "8": {
      "content": "index.html from kokusei, Fid: 8"
    },
    "10": {
      "content": "temp-color.stylus from kokusei, Fid: 10"
    },
  },
}

const api = {
  get(path) {
    switch(path) {
      case '/workspace':
        return workspace
      case '/projects':
        return projects

      case '/project/100000001':
        return projectAqua
      case '/project/100000035':
        return projectKokusei

      case '/project/100000001/file/5':
        return contents['100000001']['5']
      case '/project/100000001/file/7':
        return contents['100000001']['7']
      case '/project/100000001/file/9':
        return contents['100000001']['9']
      case '/project/100000001/file/3':
        return contents['100000001']['3']
      case '/project/100000001/file/8':
        return contents['100000001']['8']
      case '/project/100000001/file/10':
        return contents['100000001']['10']

      case '/project/100000035/file/5':
        return contents['100000035']['5']
      case '/project/100000035/file/7':
        return contents['100000035']['7']
      case '/project/100000035/file/9':
        return contents['100000035']['9']
      case '/project/100000035/file/3':
        return contents['100000035']['3']
      case '/project/100000035/file/8':
        return contents['100000035']['8']
      case '/project/100000035/file/10':
        return contents['100000035']['10']
    }
  }
}

export default api
