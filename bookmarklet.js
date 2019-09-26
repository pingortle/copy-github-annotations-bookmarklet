// ==Bookmarklet==
// @name Copy GitHub annotated files
// @author @pingortle
// ==/Bookmarklet==

var handle = setInterval(() => {
  if (!loadMore()) {
    clearInterval(handle)
    copyText(annotatedFiles())
  }
}, 1000)

function loadMore () {
  var button = document.querySelector('.js-ajax-pagination button[type=submit]')
  if (button) button.click()

  return button
}

function annotatedFiles () {
  var annotations = Array.from(document.getElementsByTagName('a'))
    .filter(element => element.textContent.startsWith('Check'))
    .map(element =>
      element.textContent.replace(/Check failure on line \d+ in /, '')
    )

  return unique(annotations).join(' ')
}

function copyText (text) {
  var node = document.createElement('textarea')
  var selection = document.getSelection()

  node.textContent = text
  document.body.appendChild(node)

  selection.removeAllRanges()
  node.select()
  document.execCommand('copy')

  selection.removeAllRanges()
  document.body.removeChild(node)
}

function unique (array) {
  return Array.from(new Set(array))
}
