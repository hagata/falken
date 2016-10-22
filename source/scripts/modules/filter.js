import Module from './base';
import pubsub from '../utils/pubsub';

// Need a module loader.
class Filter extends Module {
  constructor(node) {
    super(node);
    console.log('constructing');
    console.log(this);
    this.resultsContainer_ = this.node.querySelector('.listings');
    this.manageSearchListings_ = this.manageSearchListings_.bind(this);
    this.load();
  }

  manageSubscriptions_() {
    pubsub.subscribe('search.listings', this.manageSearchListings_);
  }

  manageSearchListings_(data){
    console.group('search');
    console.log('Data from pubsub', data);
    console.groupEnd();


    let listings = [];

    fetch('listings.json')
      .then((response) => {
        response.json().then((res) => {
          // console.log(res);
          listings = res.listings;
          // console.log(listings);

          let results = listings.filter(function(listing) {
            if (listing.Bed === data['unit-beds']['number-integer'])
              return true;
          });
          console.log('RESULTS: ');
          console.log(results);
          this.renderResults_(results);

        });
      });

}

  renderResults_(data){
    // get results div and empty it
    while (this.resultsContainer_.firstChild) {
      this.resultsContainer_.removeChild(this.resultsContainer_.firstChild);
    }

    // loop over data
      for (const listing of data) {
        let a = document.createElement('a');
        a.href = listing.Url;
        let tmpl = `
         
          <div class="listing>"
            <div class="listing__image">
              <img src="${listing.Image}" class="listing__img">
            </div>
            <div class="listing__copy">
              <div class="listing__main">
                <h3 class="listing__price">$${listing.MinPrice}</h3>
                <h3 class="listing__bdbr">${listing.Bed}bd, ${listing.Bath}br</h3>
              </div>
              <div class="listing__sub">
                <span class="listing__neighborhood">Neighborhood</span>
                <span class="listing__shortdesc">Title</span>
              </div>
          `;
        a.innerHTML = tmpl;
        this.resultsContainer_.appendChild(a);

      console.log(tmpl);

      }
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

export {Filter};
