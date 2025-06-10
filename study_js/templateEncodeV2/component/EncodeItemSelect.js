import html from '../core.js';
import { connect } from '../store.js';
import EncodeItemInput from './EncodeItemInput.js';

function EncodeItemSelect({ item, index, indexChild }) {
    if (item.dataInput?.length) {
        return html`<div class="form-group">
            <h2>${item.label}s</h2>
            ${item.dataInput.map((val, indexChildren) => {
                return html` <label for="" class="form-label"
                        >${item.label} ${indexChildren + 1}</label
                    >
                    <div class="input-list">
                        ${EncodeItemInput({
                            item: val,
                            index,
                            indexChild: indexChildren,
                        })}
                    </div>`;
            })}
        </div> `;
    } else {
        return html`<div class="form-group">
            <label for="" class="form-label">${item.label}</label>
            <select
                class="form-control ${['Info', 'Option', 'Access'].includes(
                    item.label
                )
                    ? 'multi-select'
                    : ''}"
                onchange="dispatch('toggle', this.value.toString(), ${index.toString()}, ${indexChild.toString()})"
                ${['Info', 'Option', 'Access'].includes(item.label)
                    ? 'multiple'
                    : ''}
            >
                <option value="">--- Choose ${item.label} More ---</option>
                ${item.data?.map((elm) => {
                    if (item?.value === elm.name || item?.value === elm) {
                        return `<option value="${elm.name || elm}" selected>${
                            elm.name || elm
                        }</option>`;
                    } else {
                        return `<option value="${elm.name || elm}">${
                            elm.name || elm
                        }</option>`;
                    }
                })}
            </select>
            <span class="form-message"></span>
        </div>`;
    }
}

export default connect()(EncodeItemSelect);
