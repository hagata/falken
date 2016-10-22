import Module from './base';
import pubsub from '../utils/pubsub';


// Need a module loader.
class Demo extends Module {
  constructor(node) {
    super(node);
    this.load();
    this.manageSearchListings_ = this.manageSearchListings_.bind(this);
  }

  manageSubscriptions_() {
    pubsub.subscribe('search.listings', this.manageSearchListings_);
  }

  manageSearchListings_(data){
    console.group('search');
    console.log('Data from pubsub', data);
    console.groupEnd();
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
    this.manageSubscriptions_();
    console.log('loaded demo module');
  }
}

export {Demo};
