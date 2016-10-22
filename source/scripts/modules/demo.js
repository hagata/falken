import Module from './base';

// Need a module loader.
class Demo extends Module {
  constructor(node) {
    super(node);
    this.load();
  }


  /**
   * Binds event listeners.
   */
  bindEvents() {
  }

  /**
   * Loads module.
   */
  load() {
    this.bindEvents();
    console.log('loaded demo module');
  }
}

export {Demo};
