
let highlighter;
const highlights = new Map();

const load = function() {
  highlighter = new Highlighter({$root: document.querySelector('div[contenteditable]')});
  for (let button of document.querySelectorAll('button.highlight')) {
    button.addEventListener('click', (ev) => do_highlight(ev.target.getAttribute('id')));
  }

  let editableDiv = document.querySelector('div[contenteditable]');

  editableDiv.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  });

  editableDiv.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(editableDiv);
  selection.removeAllRanges();
  selection.addRange(range);


}

const do_highlight = function(type) {
  let previous = highlights.get(type);
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    let {id} = highlighter.fromRange(selection.getRangeAt(0));
    highlighter.addClass(type,id);
    highlights.set(type,id);
  }
  if (previous) {
    highlighter.remove(previous);
  }
};


window.addEventListener('load', load);