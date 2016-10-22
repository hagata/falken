import Module from './base';

// Need a module loader.
class Splash extends Module {
  constructor(node) {
    super(node);

    this.bot = document.querySelector('.conversations');
    this.keywords = document.querySelector('.keywords');
    this.textarea = document.querySelector('.textarea-container');
    this.mic = document.querySelector('.mic');
    this.home = document.querySelector('.splash');
    this.splashQuestion = document.querySelector('.splash-question');
    this.question = document.querySelector('.question');
    this.qanda = document.querySelector('.conversations-QA');
    this.homeCopy = document.querySelector('.home-copy');

    this.splash = this.splash.bind(this);

    this.load();
  }

  splash() {
    this.bot.classList.remove("small-bot");
    this.keywords.classList.remove("hide");
    this.keywords.classList.remove("fade");
    this.textarea.classList.remove("hide");
    this.mic.classList.remove("fade");
    this.question.classList.remove("fade");
    this.qanda.classList.remove("fade");

    this.home.classList.add("fade");
    this.splashQuestion.classList.add("fade");
    this.homeCopy.classList.add("fade");
  }

  /**
   * Binds event listeners.
   */
  bindEvents() {
    this.bot.addEventListener("click", this.splash);
  }

  /**
   * Loads module.
   */
  load() {
    this.bindEvents();
    console.log('loaded splash module');
  }
}

export {Splash};
