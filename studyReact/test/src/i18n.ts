import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        sampling: {
            fields: { time: 'Time' },
            history: { action: 'Action' }
        },
        control: {
            active: {
                schedule: 'Schedule Active',
                titleInfoSchedule: 'Schedule inactive',
                descInfoSchedule: 'Turn on the switch to configure schedule.'
            },
            configSchedule: 'Configuration Schedule',
            label: {
                startDate: 'Start Date',
                schedule: 'Schedule',
                repeat: 'Repeat Days',
                endDate: 'End Date'
            },
            validation: {
                inValidStartDate: 'Start date must be today or later',
                emptyCycle: 'Select at least one day',
                greaterStartDate: 'End date must be after start date',
                infoConfig: 'Please fix validation errors'
            },
            placeholder: {
                time: 'Select time',
                action: 'Select action',
                repeat: 'Select days',
                endDate: 'Select end date'
            },
            button: { addSchedule: 'Add schedule' },
            repeat: {
                title: 'Repeat',
                noti: 'If repeat is enabled schedule repeats until end date.'
            },
            dayOfWeek: {
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat',
                sun: 'Sun'
            }
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
});

export default i18n;
