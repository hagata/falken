<section class="results">
  {% for listing in listings %}
    <div class="listings">

      <div class="listing">
        <div class="listing__image">
          <img src="{{listing.img}}" class="listing__img">
        </div>
        <div class="listing__copy">
          <div class="listing__main">
            <h3 class="listing__price">{{listing.price}}</h3>
            <h3 class="listing__bdbr">{{listing.bdbr}}</h3>
          </div>
          <div class="listing__sub">
            <span class="listing__neighborhood">{{listing.neighborhood}}</span>
            <span class="listing__shortdesc">{{listing.shortdesc}}</span>
          </div>
        </div>
      </div>

    </div>
  {% endfor %}

</section>
