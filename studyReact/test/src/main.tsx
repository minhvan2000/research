import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import 'antd/dist/antd.css';
import { ScheduleModeConfig } from './features/control/containers/ValveControl/ConfigAutoTab/ScheduleModeTab';
import { ValveDevice } from './features/control/containers/ValveControl/type';

const sampleValve: ValveDevice = {
    mode: ['SCHEDULE'],
    configSchedule: {
        startDate: new Date().toISOString(),
        isRepeat: true,
        cycle: ['mon', 'tue', 'wed', 'thu', 'fri'],
        schedules: [
            { dateTime: '08:00', action: 'ON' },
            { dateTime: '17:00', action: 'OFF' }
        ]
    }
};

const App = () => {
    return (
        <div style={{ padding: 24 }}>
            <h2>Schedule Mode Test</h2>
            <ScheduleModeConfig valve={sampleValve} isEdit={() => {}} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
);
