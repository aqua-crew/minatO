export default {
  project: [
    {
      name: 'Create',
      fn(context) {

        console.warn('Emit Create')
      }
    },
    {
      name: 'Create From Template',
      fn() {
        console.warn('Create From Template')
      }
    }
  ]
}
