import Module from './base';

// Need a module loader.
class Splash extends Module {
  constructor(node) {
    super(node);

    this.bot = document.querySelector('.conversations');
    this.keywords = document.querySelector('.keywords');
    this.textarea = document.querySelector('.textarea-container');
    this.mic = document.querySelector('.mic');
    this.banner = document.querySelector('.banner');
    this.home = document.querySelector('.splash');
    this.splashIntro = document.querySelector('.splash-intro');
    this.splashQuestion = document.querySelector('.splash-question');
    this.question = document.querySelector('.question');

    this.splash = this.splash.bind(this);

    this.load();
  }

  splash() {
    this.bot.classList.remove("small-bot");
    this.keywords.classList.remove("hide");
    this.textarea.classList.remove("hide");
    this.mic.classList.remove("hide");
    this.question.classList.remove("hide");
    this.splashIntro.classList.remove("splash-intro");

    this.banner.classList.add("hide");
    this.home.classList.add("hide");
    this.splashQuestion.classList.add("hide");
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
