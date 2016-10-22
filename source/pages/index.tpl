{% extends '../templates/base.tpl' %}
{% block content %}


<main class="stage">
<div data-module="Demo"></div>
    {% include 'modules/conversations.tpl' %}
    {% include 'modules/results.tpl' %}
</main>


{% endblock %}
