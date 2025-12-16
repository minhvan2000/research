import {
    CaretUpDownIcon,
    CheckSquareIcon,
    ClockIcon,
    InfoIcon,
    PlusIcon,
    XIcon
} from '@phosphor-icons/react';
import { Checkbox, DatePicker, Form, Select, Switch, TimePicker } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Button } from '@/components/X/Button';

import {
    ActionTag,
    DayOfWeekTag
} from '../../../../stations/components/Sampling/Tags';
import { ValveDevice } from '../../../type';
import { ModifySection } from '../ValveItem';

const mode = 'SCHEDULE';
const DayOfWeekDefine: string[] = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
];

const ScheduleTableWrapper = styled.div`
    border: 2px solid #000;
    border-radius: 0.5rem;
    overflow: hidden;

    .schedule-header {
        display: grid;
        grid-template-columns: 308px 180px 32px;
        padding: 12px;
        background: #f9fafb;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        color: #374151;
        border: 1px solid #e4e4e7;
    }
    .schedule-row {
        display: grid;
        grid-template-columns: 308px 180px 32px;
        align-items: stretch;
        border-bottom: 1px solid #e4e4e7;
        border-left: 1px solid #e4e4e7;
        border-right: 1px solid #e4e4e7;
        background: #ffffff;
    }
    .schedule-row:last-of-type {
        border-bottom: none;
    }
    .schedule-cell-time,
    .schedule-cell-action,
    .schedule-cell-delete {
        padding: 0;
        height: 46px;
    }
    .schedule-footer {
        border-bottom: 1px solid #e4e4e7;
        border-left: 1px solid #e4e4e7;
        border-right: 1px solid #e4e4e7;
        background: #ffffff;
    }
`;

const TimePickerStyled = styled(TimePicker)`
    &.sub-app-core-picker {
        padding-left: 28px !important;
        border-radius: unset !important;
        box-shadow: none !important;
        border: 2px solid transparent !important;

        &:hover,
        &:focus {
            border-color: #bfdbfe !important;
        }

        &.sub-app-core-picker-status-error {
            &:hover,
            &:focus {
                border-color: #fecaca !important;
            }
            .sub-app-core-picker-input {
                input,
                input::placeholder,
                .sub-app-core-picker-suffix * {
                    color: #ef4444 !important;
                }
            }
        }
    }
`;

const CustomSelect = styled(Select)`
    &.sub-app-core-select-status-error {
        &.sub-app-core-select:not(.sub-app-core-select-disabled):not(
                .sub-app-core-select-customize-input
            ):not(.sub-app-core-pagination-size-changer)
            div.sub-app-core-select-selector,
        .sub-app-core-select-arrow * {
            border: 2px solid transparent !important;
            color: #ef4444 !important;

            &:focus,
            &:hover {
                border-color: #fecaca !important;
            }
            .placeholder-select {
                color: #ef4444 !important;
            }
        }
    }

    .sub-app-core-select-selector {
        height: 46px !important;
        padding-top: 2px !important;
        border-radius: 0px !important;
        box-shadow: none !important;
        border: 2px solid transparent !important;

        &:hover,
        &:focus {
            border-color: #bfdbfe !important;
        }

        .sub-app-core-select-selection-item {
            line-height: 46px !important;
        }
    }
`;

export const ScheduleModeConfig = ({
    valve,
    innerRef,
    isEdit
}: {
    valve: ValveDevice;
    innerRef?: any;
    isEdit: (section?: ModifySection, state?: boolean) => void;
}) => {
    const { t } = useTranslation([
        'sampling',
        'validation',
        'control',
        'common'
    ]);
    const [form] = Form.useForm();
    const [active, setActive] = useState(valve.mode?.includes(mode));

    const isCycle = Form.useWatch('isCycle', form);
    const cycle = Form.useWatch('cycle', form);
    const [isError, setIsError] = useState(
        form.getFieldsError().some((f) => f.errors.length)
    );

    return (
        <div>
            <Form
                ref={innerRef}
                layout="vertical"
                className="border-b-0 cus-form1 reverse-required-mark max-h-[524px] overflow-y-auto"
                form={form}
                preserve={false}
                initialValues={{
                    startDate: valve.configSchedule
                        ? moment(valve.configSchedule.startDate)
                        : moment().startOf('day'),
                    active,
                    isCycle: valve.configSchedule?.isRepeat,
                    listSchedule: valve.configSchedule.schedules?.length
                        ? valve.configSchedule.schedules.map((sch: any) => {
                              const [hour, minute] = sch.dateTime.split(':');
                              return {
                                  startTime: moment(
                                      valve.configSchedule.startDate
                                  )
                                      .set('hour', hour)
                                      .set('minute', minute),
                                  action: sch.action
                              };
                          })
                        : [{}],
                    cycle: valve.configSchedule?.cycle || [
                        'mon',
                        'tue',
                        'wed',
                        'thu',
                        'fri',
                        'sat',
                        'sun'
                    ],
                    endDate: valve.configSchedule.endDate
                        ? moment(valve.configSchedule.endDate)
                        : null
                }}
                onFinish={(_) => {}}
                onValuesChange={() => {
                    isEdit('SCHEDULE', true);
                }}
            >
                <div className="flex justify-between p-4 rounded-xl border border-gray-200 font-medium text-base bg-white text-gray-700">
                    <div>{t('control:active.schedule')}</div>
                    <Form.Item name={'active'} valuePropName="checked" noStyle>
                        <Switch
                            onChange={(checked) => {
                                setActive(checked);
                            }}
                        />
                    </Form.Item>
                </div>
                {!active && (
                    <div className="text-primary-700 rounded-lg bg-primary-50 bg-opacity-50 border border-primary-400 p-4 mt-5 ">
                        <div className="font-semibold text-base flex gap-2 mb-1.5 items-center text-primary-600">
                            <InfoIcon size={16} />
                            {t('control:active.titleInfoSchedule')}
                        </div>
                        <div className="text-sm">
                            {t('control:active.descInfoSchedule')}
                        </div>
                    </div>
                )}

                {active && (
                    <>
                        <div className="bg-white border-gray-200 border my-4 rounded-lg">
                            <div className="p-4">
                                <div className="text-base font-medium text-gray-700">
                                    {t('control:configSchedule')}
                                </div>
                                <div className="bg-white mt-4">
                                    <Form.Item
                                        className="!mb-4 [&_label]:!text-gray-700"
                                        label={t('control:label.startDate')}
                                        required
                                        name={'startDate'}
                                        dependencies={['startDate']}
                                        rules={[
                                            () => ({
                                                validator: (_, value) => {
                                                    if (!value)
                                                        return Promise.reject(
                                                            t(
                                                                'control:validation.inValidStartDate'
                                                            )
                                                        );

                                                    const today =
                                                        moment().startOf('day');

                                                    if (value.isBefore(today)) {
                                                        return Promise.reject(
                                                            t(
                                                                'control:validation.inValidStartDate'
                                                            )
                                                        );
                                                    }
                                                    return Promise.resolve();
                                                }
                                            })
                                        ]}
                                    >
                                        <DatePicker
                                            className="w-full !rounded-lg"
                                            placeholder=""
                                            format="DD/MM/YYYY"
                                            allowClear={false}
                                            placement="topLeft"
                                            disabledDate={(current) => {
                                                return (
                                                    current &&
                                                    current <
                                                        moment().startOf('day')
                                                );
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        shouldUpdate
                                        label={t('control:label.schedule')}
                                        className="!mb-4 [&_label]:!text-gray-700 "
                                        trigger="onSubmit"
                                        required
                                    >
                                        {(formInstance) => {
                                            const err =
                                                formInstance.getFieldsError();
                                            setIsError(
                                                err.some(
                                                    (f) =>
                                                        f.name.length > 1 &&
                                                        f.errors.length
                                                )
                                            );
                                            return (
                                                <>
                                                    <Form.List
                                                        name="listSchedule"
                                                        rules={[]}
                                                    >
                                                        {(
                                                            fields,
                                                            { add, remove }
                                                        ) => (
                                                            <>
                                                                <ScheduleTableWrapper
                                                                    className={clsx(
                                                                        isError &&
                                                                            'border !border-red-500 rounded-lg'
                                                                    )}
                                                                >
                                                                    <div className="schedule-header rounded-t-lg">
                                                                        <div className="uppercase text-xs font-semibold text-gray-700 flex items-center">
                                                                            {t(
                                                                                'sampling:fields.time'
                                                                            )}
                                                                        </div>
                                                                        <div className="uppercase text-xs font-semibold text-gray-700 flex items-center">
                                                                            {t(
                                                                                'sampling:history.action'
                                                                            )}
                                                                        </div>
                                                                        <div />
                                                                    </div>
                                                                    {fields.map(
                                                                        ({
                                                                            key,
                                                                            name
                                                                        }) => {
                                                                            return (
                                                                                <div
                                                                                    className="schedule-row"
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                >
                                                                                    <div className="schedule-cell-time ">
                                                                                        <Form.Item
                                                                                            className="[&.sub-app-core-form-item-has-error]:!m-0 [&.sub-app-core-form-item-has-error>.sub-app-core-form-item-row>.sub-app-core-form-item-control div:last-child]:!m-0 [&_.sub-app-core-form-item-control>div>div.sub-app-core-form-item-explain-connected]:!hidden"
                                                                                            name={[
                                                                                                name,
                                                                                                'startTime'
                                                                                            ]}
                                                                                            dependencies={[
                                                                                                [
                                                                                                    'startDate'
                                                                                                ]
                                                                                            ]}
                                                                                            rules={[
                                                                                                {
                                                                                                    required:
                                                                                                        true,
                                                                                                    message:
                                                                                                        ''
                                                                                                },
                                                                                                ({
                                                                                                    getFieldValue
                                                                                                }) => ({
                                                                                                    validator(
                                                                                                        _,
                                                                                                        value
                                                                                                    ) {
                                                                                                        if (
                                                                                                            !value ||
                                                                                                            !moment.isMoment(
                                                                                                                value
                                                                                                            ) ||
                                                                                                            !value.isValid()
                                                                                                        ) {
                                                                                                            return Promise.resolve();
                                                                                                        }
                                                                                                        const listStartTime =
                                                                                                            getFieldValue(
                                                                                                                'listSchedule'
                                                                                                            ) ||
                                                                                                            [];
                                                                                                        const currentTimeStr =
                                                                                                            value.format(
                                                                                                                'HH:mm'
                                                                                                            );
                                                                                                        const hasDuplicate =
                                                                                                            listStartTime.filter(
                                                                                                                (
                                                                                                                    item: any
                                                                                                                ) =>
                                                                                                                    moment.isMoment(
                                                                                                                        item.startTime
                                                                                                                    ) &&
                                                                                                                    item.startTime.format(
                                                                                                                        'HH:mm'
                                                                                                                    ) ===
                                                                                                                        currentTimeStr
                                                                                                            );
                                                                                                        if (
                                                                                                            hasDuplicate.length >
                                                                                                            1
                                                                                                        ) {
                                                                                                            return Promise.reject();
                                                                                                        }
                                                                                                        return Promise.resolve();
                                                                                                    }
                                                                                                })
                                                                                            ]}
                                                                                        >
                                                                                            <TimePickerStyled
                                                                                                className="w-full h-full relative "
                                                                                                placeholder={t(
                                                                                                    'control:placeholder.time'
                                                                                                )}
                                                                                                format="HH:mm"
                                                                                                popupClassName="[&_.sub-app-core-picker-ok>button]:!h-9"
                                                                                                allowClear={
                                                                                                    false
                                                                                                }
                                                                                                placement="topLeft"
                                                                                                suffixIcon={
                                                                                                    <>
                                                                                                        <CaretUpDownIcon
                                                                                                            size={
                                                                                                                16
                                                                                                            }
                                                                                                        />
                                                                                                        <ClockIcon
                                                                                                            size={
                                                                                                                16
                                                                                                            }
                                                                                                            className="absolute -left-5"
                                                                                                        />
                                                                                                    </>
                                                                                                }
                                                                                            />
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                    <div className="schedule-cell-action">
                                                                                        <Form.Item
                                                                                            noStyle
                                                                                            name={[
                                                                                                name,
                                                                                                'action'
                                                                                            ]}
                                                                                            rules={[
                                                                                                {
                                                                                                    required:
                                                                                                        true,
                                                                                                    message:
                                                                                                        ''
                                                                                                }
                                                                                            ]}
                                                                                        >
                                                                                            <CustomSelect
                                                                                                placeholder={
                                                                                                    <span className="placeholder-select">
                                                                                                        {t(
                                                                                                            'control:placeholder.action'
                                                                                                        )}
                                                                                                    </span>
                                                                                                }
                                                                                                style={{
                                                                                                    width: '100%'
                                                                                                }}
                                                                                                popupClassName="bg-red"
                                                                                                options={[
                                                                                                    {
                                                                                                        label: (
                                                                                                            <ActionTag
                                                                                                                action={
                                                                                                                    'OFF'
                                                                                                                }
                                                                                                                className="truncate max-w-24 !mt-1.5"
                                                                                                            />
                                                                                                        ),
                                                                                                        value: 'OFF'
                                                                                                    },
                                                                                                    {
                                                                                                        label: (
                                                                                                            <ActionTag
                                                                                                                action={
                                                                                                                    'ON'
                                                                                                                }
                                                                                                                className="truncate max-w-24 !mt-1.5"
                                                                                                            />
                                                                                                        ),
                                                                                                        value: 'ON'
                                                                                                    }
                                                                                                ]}
                                                                                                dropdownStyle={{
                                                                                                    borderRadius:
                                                                                                        '0.5rem',
                                                                                                    padding:
                                                                                                        '0.5rem'
                                                                                                }}
                                                                                                suffixIcon={
                                                                                                    <CaretUpDownIcon
                                                                                                        size={
                                                                                                            16
                                                                                                        }
                                                                                                    />
                                                                                                }
                                                                                            />
                                                                                        </Form.Item>
                                                                                    </div>
                                                                                    <div className="schedule-cell-delete flex items-stretch">
                                                                                        <Button
                                                                                            type="button"
                                                                                            className="flex-1 text-base font-normal cursor-pointer text-gray-700 p-3 hover:bg-gray-50"
                                                                                            onClick={() => {
                                                                                                remove(
                                                                                                    name
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <XIcon />
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                    <div className="schedule-footer rounded-b-lg">
                                                                        <Button
                                                                            type="button"
                                                                            className="flex justify-center items-center bg-white text-primary-500 font-medium w-full h-full py-2 hover:!bg-gray-100 rounded-b-xl"
                                                                            onClick={() =>
                                                                                add()
                                                                            }
                                                                        >
                                                                            <PlusIcon
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="mr-1"
                                                                            />
                                                                            {t(
                                                                                'control:button.addSchedule'
                                                                            )}
                                                                        </Button>
                                                                    </div>
                                                                </ScheduleTableWrapper>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                    <div className="text-red-700 mt-1 flex items-center">
                                                        {isError &&
                                                            t(
                                                                'control:validation.infoConfig'
                                                            )}
                                                    </div>
                                                </>
                                            );
                                        }}
                                    </Form.Item>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-gray-200 border mt-4 rounded-lg">
                            <div className="p-4">
                                <div className="flex justify-between font-medium text-base text-gray-700">
                                    <div>{t('control:repeat.title')}</div>
                                    <Form.Item
                                        name={'isCycle'}
                                        valuePropName="checked"
                                        noStyle
                                    >
                                        <Switch />
                                    </Form.Item>
                                </div>
                                {isCycle && (
                                    <div className="bg-white mt-4">
                                        <Form.Item
                                            className="!mb-4 [&_label]:!text-gray-700"
                                            label={t('control:label.repeat')}
                                            required
                                            name={'cycle'}
                                            dependencies={['cycle']}
                                            rules={[
                                                {
                                                    validator: async (
                                                        _,
                                                        value
                                                    ) => {
                                                        if (
                                                            Array.isArray(
                                                                value
                                                            ) &&
                                                            value.length > 0
                                                        )
                                                            return Promise.resolve();
                                                        return Promise.reject(
                                                            new Error(
                                                                t(
                                                                    'control:validation.emptyCycle'
                                                                )
                                                            )
                                                        );
                                                    }
                                                }
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                placeholder={t(
                                                    'control:placeholder.repeat'
                                                )}
                                                className="w-full"
                                                optionLabelProp="label"
                                                tagRender={DayOfWeekTag}
                                                showArrow
                                                suffixIcon={
                                                    <CaretUpDownIcon
                                                        className="text-gray-500"
                                                        size={16}
                                                    />
                                                }
                                            >
                                                {DayOfWeekDefine.map((day) => (
                                                    <Select.Option
                                                        key={day}
                                                        value={day}
                                                        label={t(
                                                            `control:dayOfWeek.${
                                                                day as
                                                                    | 'mon'
                                                                    | 'tue'
                                                                    | 'wed'
                                                                    | 'thu'
                                                                    | 'fri'
                                                                    | 'sat'
                                                                    | 'sun'
                                                            }`
                                                        )}
                                                        menuItemSelectedIcon={
                                                            <CheckSquareIcon className="text-blue-500" />
                                                        }
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                checked={(
                                                                    cycle || []
                                                                ).includes(day)}
                                                            />
                                                            <span>
                                                                {t(
                                                                    `control:dayOfWeek.${
                                                                        day as
                                                                            | 'mon'
                                                                            | 'tue'
                                                                            | 'wed'
                                                                            | 'thu'
                                                                            | 'fri'
                                                                            | 'sat'
                                                                            | 'sun'
                                                                    }`
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            className="[&_label]:!text-gray-700 !mb-0"
                                            label={t('control:label.endDate')}
                                            name={'endDate'}
                                            dependencies={[
                                                'endDate',
                                                'startDate'
                                            ]}
                                            rules={[
                                                () => ({
                                                    validator(_, value) {
                                                        if (!value)
                                                            return Promise.resolve();
                                                        const startDate =
                                                            form.getFieldValue(
                                                                'startDate'
                                                            );
                                                        if (
                                                            !moment.isMoment(
                                                                value
                                                            ) ||
                                                            !value.isValid()
                                                        ) {
                                                            return Promise.reject(
                                                                new Error('')
                                                            );
                                                        }
                                                        if (
                                                            startDate &&
                                                            moment(
                                                                startDate
                                                            ).isValid()
                                                        ) {
                                                            const start =
                                                                moment(
                                                                    startDate
                                                                ).endOf('day');
                                                            const end =
                                                                moment(
                                                                    value
                                                                ).startOf(
                                                                    'day'
                                                                );
                                                            if (
                                                                end.isBefore(
                                                                    start
                                                                )
                                                            ) {
                                                                return Promise.reject(
                                                                    new Error(
                                                                        t(
                                                                            'control:validation.greaterStartDate'
                                                                        )
                                                                    )
                                                                );
                                                            }
                                                        }
                                                        return Promise.resolve();
                                                    }
                                                })
                                            ]}
                                        >
                                            <DatePicker
                                                className="w-full !rounded-lg"
                                                placeholder={t(
                                                    'control:placeholder.endDate'
                                                )}
                                                format="DD/MM/YYYY"
                                                allowClear={true}
                                                placement="topLeft"
                                                disabledDate={(current) => {
                                                    const startDate =
                                                        form.getFieldValue(
                                                            'startDate'
                                                        );
                                                    const minDate = startDate
                                                        ? moment(
                                                              startDate
                                                          ).endOf('day')
                                                        : moment().endOf('day');
                                                    return (
                                                        current &&
                                                        current <= minDate
                                                    );
                                                }}
                                                suffixIcon={
                                                    <CaretUpDownIcon
                                                        className="text-gray-500"
                                                        size={16}
                                                    />
                                                }
                                            />
                                        </Form.Item>
                                        <p className="mt-2 text-gray-600 mb-0">
                                            {t('control:repeat.noti')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
};
