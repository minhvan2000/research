import html from '../core.js';
import { connect } from '../store.js';
import EncodeForm from './EncodeForm.js';
import ViewData from './ViewData.js';

function App({ encode }) {
    return html`<section class="main">
        ${encode.length > 0 && EncodeForm()} ${encode.length > 0 && ViewData()}
    </section>`;
}

export default connect()(App);
