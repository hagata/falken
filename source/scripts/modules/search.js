import Module from './base';
import {API_AI} from '../api/api.ai.api';

// Need a module loader.
class Search extends Module {
  constructor(node) {
    super(node);
    this.form_ = this.node.querySelector('.search__form');
    this.input_ = this.node.querySelector('.textarea__area');
    this.textareaSize = this.node.querySelector('.textarea-size');
    this.chatOutput_ = this.node.querySelector('.conversations-io__output');
    this.autoSize_ = this.autoSize_.bind(this);
    this.userInputHandler_ = this.userInputHandler_.bind(this);
    this.load();
  }

  autoSize_() {
    this.textareaSize.innerHTML = this.input_.value + '\n';
  }

  handleInputError_(msg) {
    this.updateBotResponse_(msg);
    console.warn(msg);
  }

  validate_(query) {
    const maxLength = 140;
    if (query.length >= 2 && query.length <= maxLength) {
      return true;
    }
    else if (query.length >= maxLength) {
      this.handleInputError_('Say in a tweet.');
    }
    return false;
  }

  userInputHandler_(e) {
    e.preventDefault();

    const query = e.currentTarget.querySelector('.textarea__area').value;
    console.log('val', e.currentTarget);
    if (!this.validate_(query)) {
      return;
    }
    API_AI.get(query, this.contexts_).then(data => {
      data.json().then(results => {
        this.updateBotResponse_(results.result.fulfillment.speech);
        console.log('.json!', results.result);
        this.contexts_ = results.contexts_;
        this.form_.reset();
      });
    });
  }

  updateBotResponse_(response){
    this.chatOutput_.innerHTML = response;
  }

  /**
   * Binds event listeners.
   */
  bindEvents_() {
    this.input_.addEventListener('input', this.autoSize_);
    this.form_.addEventListener('submit', this.userInputHandler_);
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
