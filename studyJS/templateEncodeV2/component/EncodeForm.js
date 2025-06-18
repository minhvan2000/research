import html from '../core.js';
import { connect } from '../store.js';

import EncodeItemSelect from './EncodeItemSelect.js';

function EncodeForm({ encode }) {
    return html` <div class="form" id="form-1">
        <h3 class="heading">JSON Frame</h3>
        <p class="desc">Let's Create A Frame ❤️</p>

        <div class="spacer"></div>

        ${encode.map((val, index) => {
            return EncodeItemSelect({
                item: val,
                index,
                indexChild: 0,
            });
        })}
        <button class="form-submit" onclick="dispatch('createFrame')">
            Create Frame
        </button>

        <p>${0}</p>
    </div>`;
}

export default connect()(EncodeForm);
