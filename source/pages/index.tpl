{% extends '../templates/base.tpl' %}
{% block content %}

<main class="stage">
    {% include 'modules/conversations.tpl' %}
    {% include 'modules/results.tpl' %}
</main>

{% endblock %}
