const KEYWORDS =
  /\b(export|async|function|return|const|let|var|type|interface|Promise|await|new|from|import)\b/g;
const TYPES = /\b(string|boolean|number|null|User|Route|Math)\b/g;
const STRINGS = /('[^']*'|"[^"]*"|`[^`]*`)/g;
const COMMENTS = /(\/\/.*$)/g;
const JSX_BITS = /(&lt;\/?[\w.]+|&gt;|\/&gt;)/g;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/** Lightweight JS/TS highlight for decorative background lines only */
export function highlightCodeLine(line: string): string {
  if (!line) return "&nbsp;";

  let html = escapeHtml(line);

  html = html.replace(COMMENTS, '<span class="tok-cm">$1</span>');
  html = html.replace(STRINGS, '<span class="tok-str">$1</span>');
  html = html.replace(KEYWORDS, '<span class="tok-kw">$1</span>');
  html = html.replace(TYPES, '<span class="tok-type">$1</span>');
  html = html.replace(JSX_BITS, '<span class="tok-jsx">$1</span>');

  return html;
}
