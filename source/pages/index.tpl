{% extends '../templates/base.tpl' %}
{% block content %}


<main class="stage">
<div data-module="Demo"></div>
    {% include 'modules/splash.tpl' %}
    {% include 'modules/conversations.tpl' %}
    {% include 'modules/results.tpl' %}
</main>


{% endblock %}
