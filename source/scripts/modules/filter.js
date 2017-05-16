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

  manageSearchListings_(data) {
    console.group('search');
    console.log('Data from pubsub', data);
    console.groupEnd();

    let listings = [];

    fetch('assets/listings.json')
      .then(response => {
        response.json().then(res => {

          listings = res.listings;

          let results = listings.filter(function(listing) {
            let city;
            if (data['geo-city'] === 'New York') {
              city = 'NY';
            } else {
              city = data['geo-city'];
            }

            if (data['geo-city'] && !(listing.Url.includes(city))) {
              return false;
            }
            if (data['unit-currency'] && data['unit-currency'].amount < listing.MinPrice) {
              return false;
            }
            if (listing.MinPrice === 0) {
              return false;
            }
            if ('unit-beds' in data && 'number-integer' in Object(data['unit-beds']) && listing.Bed !== data['unit-beds']['number-integer']) {
              return false;
            }
            if (data.intangible) {
              if (listing.Description.includes(data.intangible)) {
                return true;
              } else {
                return false;
              }
            }
            if ('geo-city' in data && data['geo-city'].length > 1 && listing.Description.includes(data['geo-city'])) {
              return true;
            }
            return true;
          });

          this.renderResults_(results);
        });
      });
  }

  renderResults_(data) {
    // get results div and empty it
    while (this.resultsContainer_.firstChild) {
      this.resultsContainer_.removeChild(this.resultsContainer_.firstChild);
    }

    // loop over data
    for (const listing of data) {
      let a = document.createElement('a');
      a.href = listing.Url;
      let tmpl = `

          <div class="listing">
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
                <span class="listing__shortdesc">Lorem ipsum dolor sic amet consectetur adipiscing elit.</span>
              </div>
          `;
      a.innerHTML = tmpl;
      this.resultsContainer_.appendChild(a);
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
