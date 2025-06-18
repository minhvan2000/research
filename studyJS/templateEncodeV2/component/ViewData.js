import html from '../core.js';
import { connect } from '../store.js';

function viewFormattedJSON(jsonData) {
    // Convert object to formatted string
    let formatted = JSON.stringify(jsonData, null, 2);

    // Optional: basic syntax highlighting
    formatted = formatted
        .replace(/(&|<|>)/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
        })
        .replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*?"(\s*:)?|\b(true|false|null)\b|\d+)/g,
            function (match) {
                let cls = 'number';
                if (/^"/.test(match)) {
                    cls = /:$/.test(match) ? 'key' : 'string';
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return `<span class="${cls}">${match}</span>`;
            }
        );

    return `<pre>${formatted}</pre>`;
}

function ViewData({ objectFormat }) {
    return html` <div class="form" style="width: 360px;">
        <h3 class="heading">JSON Frame</h3>
        <p class="desc">Show A JSON Frame ❤️</p>

        <div class="spacer"></div>
        ${viewFormattedJSON(objectFormat)}
    </div>`;
}

export default connect()(ViewData);
