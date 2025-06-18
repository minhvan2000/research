import html from '../core.js';
import { connect } from '../store.js';
import EncodeItemSelect from './EncodeItemSelect.js';

function setInputFilter(parameter, index, i, type, inputFilter, errMsg) {
    setTimeout(() => {
        [
            'input',
            'keydown',
            'keyup',
            'mousedown',
            'mouseup',
            'select',
            'contextmenu',
            'drop',
            'focusout',
        ].forEach(function (event) {
            const textBox = document.getElementById(
                parameter + '_' + index + '-' + i
            );

            textBox.addEventListener(event, function (e) {
                if (type === 'integer') {
                    this.value = parseInt(this.value);
                }
                if (inputFilter(this.value)) {
                    // Accepted value
                    if (
                        ['keydown', 'mousedown', 'focusout'].indexOf(e.type) >=
                        0
                    ) {
                        this.classList.remove('input-error');
                        this.setCustomValidity('');
                    }
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty('oldValue')) {
                    // Rejected value - restore the previous one
                    this.classList.add('input-error');
                    this.setCustomValidity(errMsg);
                    this.reportValidity();
                    this.value = this.oldValue;
                    this.setSelectionRange(
                        this.oldSelectionStart,
                        this.oldSelectionEnd
                    );
                } else {
                    // Rejected value - nothing to restore
                    this.value = '';
                }
            });
        });
    }, 1000);
}

function EncodeItemInput({ item, ...arg }) {
    // if (['b', 'U'].includes(item.type)) {
    //     const dataRange = item.range
    //         ? item.range
    //         : [0, Math.pow(2, item.power) - 1];

    //     setInputFilter(
    //         item.label,
    //         indexChild - 3,
    //         indexKid,
    //         'integer',
    //         function (data) {
    //             return (
    //                 /^\d*$/.test(data) &&
    //                 (data === '' ||
    //                     (dataRange[0] <= parseInt(data) &&
    //                         parseInt(data) <= dataRange[1]))
    //             );
    //         },
    //         `Must be between 0 and ${dataRange[1]}`
    //     );
    // } else if (item.type == 'H') {
    //     setInputFilter(
    //         item.label,
    //         indexChild - 3,
    //         indexKid,
    //         function (data) {
    //             return /^[0-9a-f]*$/i.test(data) && data.length <= item.size;
    //         },
    //         `Must use hexadecimal characters and have a maximum length of ${item.size} characters.`
    //     );
    // } else if (item.type == 'S') {
    //     const dataRange = item.range
    //         ? item.range
    //         : [-Math.pow(2, item.power) / 2, Math.pow(2, item.power) / 2 - 1];
    //     setInputFilter(
    //         item.label,
    //         indexChild - 3,
    //         indexKid,
    //         'integer',
    //         function (data) {
    //             return (
    //                 /^-?\d*$/.test(data) &&
    //                 dataRange[0] <= parseInt(data) &&
    //                 parseInt(data) <= dataRange[1]
    //             );
    //         },
    //         `Must be between ${dataRange[0]} and ${dataRange[1]}`
    //     );
    // }

    // if (Array.isArray(item?.data)) {
    //     const arrKid = item.data.map((val, indexChildren) => {
    //         return EncodeItemInput({
    //             item: val,
    //             index,
    //             indexChild,
    //             indexKid: indexChildren,
    //         });
    //     });

    //     return html`<div class="form-group">
    //         <h2>${item.label}</h2>
    //         <div class="input-list">${arrKid.join('')}</div>
    //     </div> `

    // } else
    // console.log(arg.index);
    // console.log(arg.indexChild);
    // console.log(arg.indexKid);
    // console.log(arg.key);

    if (!item.label) {
        const keys = Object.keys(item);
        const arrChildren = keys.map((val) => {
            // console.log(object);
            if (typeof item[val] === 'object') {
                if (Array.isArray(item[val])) {
                    const objInput = {
                        index: arg.index,
                        indexChild: arg.indexChild,
                        key: val,
                    };

                    return html`<div class="form-group">
                        <h2>${val}</h2>
                        <div class="input-list">
                            ${item[val].map((elm, indexKid) => {
                                return EncodeItemInput({
                                    ...objInput,
                                    item: elm,
                                    indexKid: indexKid + 1,
                                });
                            })}
                        </div>
                    </div> `;
                } else if (item[val]?.data?.length) {
                    // console.log(`---------${val}---------`);
                    // console.log(item);
                    // console.log(val);
                    // console.log(arg.index);
                    // console.log(arg.indexChild);
                    return EncodeItemSelect({
                        item: item[val],
                        index: arg.index,
                        indexChild: arg.indexChild,
                    });
                } else {
                    const objInput = {
                        item: item[val],
                        index: arg.index,
                        indexChild: arg.indexChild,
                    };

                    if (arg.indexKid) {
                        objInput.keyParent = arg.key;
                        objInput.indexKid = arg.indexKid;

                        if (val === 'range') {
                            objInput.keyRange = val;
                        }

                        objInput.key = val;
                    }

                    return html`<div class="form-group">
                        <h2>${val}</h2>
                        <div class="input-list">
                            ${EncodeItemInput(objInput)}
                        </div>
                    </div> `;
                }
            } else {
                const objInput = {
                    item: {
                        label: val,
                        value: item[val],
                    },
                    index: arg.index,
                    indexChild: arg.indexChild,
                    key: val,
                };

                if (arg.indexKid) {
                    objInput.indexKid = arg.indexKid;
                    objInput.keyParent = arg.key;
                }

                return EncodeItemInput(objInput);
            }
        });
        return arrChildren.join('');
    }
    if (item.label) {
        return html`<div class="form-group">
            <label for="${item.label}" class="form-label">${item.label}</label>
            <input
                id="${item.label}_${(
                    arg.index - 3
                ).toString()}-${arg.indexChild.toString()}-${arg.indexKid?.toString()}"
                name="${item.label}"
                type="text"
                value="${item.value}"
                onchange="dispatch('togglePayload', this.value?.toString(), ${arg.index?.toString()}, ${arg.indexChild?.toString()}, ${arg.indexKid
                    ? `'${arg.keyParent}', ${arg.indexKid.toString()}, '${
                          arg.key
                      }'`
                    : `'${arg.key}'`})"
                placeholder="Input ${item.label}"
                class="form-control"
            />
        </div> `;
    }
}

export default connect()(EncodeItemInput);
