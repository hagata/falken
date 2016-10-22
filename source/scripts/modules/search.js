import Module from './base';
import {API_AI} from '../api/api.ai.api';
import pubsub from '../utils/pubsub';

class Search extends Module {
  constructor(node) {
    super(node);
    this.form_ = this.node.querySelector('.search__form');
    this.input_ = this.node.querySelector('.textarea__area');
    this.textareaSize = this.node.querySelector('.textarea-size');
    this.chatOutput_ = this.node.querySelector('.conversations-io__output');

    this.submitButton_ = this.form_.querySelector('.search__cta');

    this.autoSize_ = this.autoSize_.bind(this);
    this.userInputHandler_ = this.userInputHandler_.bind(this);
    this.keyHandler_ = this.keyHandler_.bind(this);

    this.isThinking_ = false;
    this.load();
  }

  autoSize_(e) {
    let inputValue = this.input_.value;
    if (inputValue.length > 0) {
      this.submitButton_.classList.remove('search__cta--hidden');
    }

    if (inputValue.length >= 140) {
      e.preventDefault();
      this.handleInputError_('Try to fit your dream apartment in a tweet');
      return false;
    }

    this.textareaSize.innerHTML = inputValue + ' \n';
    this.input_.setAttribute("style", `height: ${this.textareaSize.offsetHeight}px; min-height:10rem`);

  }

  toggleThinking_() {
    this.node.classList.toggle('thinking');
  }

  keyHandler_(e) {
    if (e.keyCode === 13) {
      this.userInputHandler_(e);
    }
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
    this.toggleThinking_();
    const query = this.node.querySelector('.textarea__area').value;

    if (!this.validate_(query)) {
      return;
    }
    this.handleAPIrequest_(query);
  }

  handleAPIrequest_(query) {
    API_AI.get(query, this.contexts_).then(data => {
      data.json().then(results => {
        this.updateBotResponse_(results.result.fulfillment.speech);
        console.log('.json!', results.result);
        this.contexts_ = results.contexts_;
        const parameters = results.result.parameters;
        pubsub.publish('search.listings', parameters);
        this.form_.reset();

        // TODO: Add pubsub
        setTimeout(() => {
          this.toggleThinking_();
        }, 500);
          // TODO: Call Search from subscription, pass parameters.
        // If action search.listings fire off all the things
      });
    });
  }

  updateBotResponse_(response) {
    this.chatOutput_.innerHTML = response;
  }

  /**
   * Binds event listeners.
   */
  bindEvents_() {
    this.input_.addEventListener('input', this.autoSize_);
    this.input_.addEventListener('keydown', this.keyHandler_);
    this.form_.addEventListener('submit', this.userInputHandler_);
  }

  /**
   * Loads module.
   */
  load() {
    this.bindEvents_();
    this.autoSize_();
    console.log('loaded search module');
  }
}

export {Search};
