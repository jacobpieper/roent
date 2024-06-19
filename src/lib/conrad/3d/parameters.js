import GUI from 'lil-gui'

export default class Parameters {
  constructor() {
    // Attach to div with id 'parameter'. Otherwise will overlay the header.
    const parametersEl = document.getElementById('parameters')
    this.ui = new GUI({ container: parametersEl })
  }
}
