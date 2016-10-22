import Module from './base';

// Need a module loader.
class Search extends Module {
  constructor(node) {
    super(node);
    this.input_ = this.node.querySelector('.textarea__area');
    this.textareaSize = this.node.querySelector('.textarea-size');

    this.autoSize_ = this.autoSize_.bind(this);

    this.load();
  }

  autoSize_() {
    this.textareaSize.innerHTML = this.input_.value + '\n';
  }

  /**
   * Binds event listeners.
   */
  bindEvents_() {
    this.input_.addEventListener('input', this.autoSize_);
  }


  /**
   * Loads module.
   */
  load() {
    this.bindEvents_();
    this.autoSize_();
  }
}

export {Search};
