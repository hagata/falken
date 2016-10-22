<section class="results" data-module="Filter">
  <!-- <div class="result-filter">
    <span class="sort"><span>Sort by:</span> Price</span>
    <span class="map CTA">Map View</span>
  </div> -->
<div class="listings">
  {% for listing in listings %}

        <div class="listing">
          <a href={{listing.Url}}>
          <div class="listing__image">
            <img src="{{listing.Image}}" class="listing__img">
          </div>
          <div class="listing__copy">
            <div class="listing__main">
              <h3 class="listing__price">${{listing.MinPrice}}</h3>
              <h3 class="listing__bdbr">{{listing.Bed}}bd{% if listing.Bath %}, {{listing.Bath}}br{% endif %}</h3>
            </div>
            <div class="listing__sub">
              <span class="listing__neighborhood">Neighborhood</span>
              <span class="listing__shortdesc">Lorem ipsum dolor sic amet consectetur adipiscing elit.</span>
            </div>
          </div>
        </div>
      </a>

  {% endfor %}
</div>
</section>
