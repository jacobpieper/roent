import GUI from 'lil-gui'

export default class Parameters {
  constructor() {
    // Attach to div with id 'parameters'. Otherwise will overlay the header.
    const parameterEl = document.getElementById('parameters')
    this.ui = new GUI({ container: parameterEl })
  }
}
