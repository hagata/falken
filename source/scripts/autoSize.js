function autoSize() {
  var textContainer, textareaSize, input;
  var autoSize = function () {
    textareaSize.innerHTML = input.value + '\n';
  };

  document.addEventListener('DOMContentLoaded', function() {
    textContainer = document.querySelector('.textarea-container');
    textareaSize = textContainer.querySelector('.textarea-size');
    input = textContainer.querySelector('textarea');

    autoSize();
    input.addEventListener('input', autoSize);
    });
}

export { autoSize };
