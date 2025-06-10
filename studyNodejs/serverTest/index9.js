import { performance } from 'node:perf_hooks';
import xlsx from 'node-xlsx';

const dataGroup = [
    {
        _id: '67f5dfd992368043ebc369b7',
        name: 'Group ESO_BB',
        path: '/Group ESO_BB',
        type: 'ESO',
        isLocalMap: false,
        action: { turn: false, schedules: [] },
        createdAt: '2025-04-09T02:47:53.623Z',
        updatedAt: '2025-04-09T02:47:53.623Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67f5daeec68bf64339af764e',
        name: 'Group ESO_EEE',
        path: '/Group ESO_EEE',
        type: 'ESO',
        isLocalMap: false,
        action: { turn: false, schedules: [] },
        createdAt: '2025-04-09T02:26:54.741Z',
        updatedAt: '2025-04-17T08:43:30.996Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67f5dac6c68bf64339af7643',
        name: 'Group ESO',
        path: '/Group ESO',
        type: 'ESO',
        isLocalMap: true,
        action: { turn: false, brightness: 0, schedules: [Array] },
        createdAt: '2025-04-09T02:26:14.733Z',
        updatedAt: '2025-05-05T07:23:11.482Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 1,
        numOfGroups: 3,
        imageMap:
            'http://192.168.30.213:9999/images/groups/1745295618126-map-2D.png',
    },
    {
        _id: '67e21a98ff4480ab7bd0bf86',
        name: 'Farm1',
        path: '/Farm1',
        type: 'RSO36',
        isLocalMap: true,
        createdAt: '2025-03-25T02:53:12.829Z',
        updatedAt: '2025-03-25T11:10:19.604Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap:
            'http://192.168.30.213:9999/images/groups/2025-03-25T04-06-43.588Z-map-2D.png',
    },
    {
        _id: '67e21a348898de5ed5d18f26',
        name: 'Farm',
        path: '/Farm',
        type: 'RSO36',
        isLocalMap: false,
        createdAt: '2025-03-25T02:51:32.026Z',
        updatedAt: '2025-03-25T02:51:32.026Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 2,
        imageMap: null,
    },
    {
        _id: '67d1717c01a4d6cdebb2c31d',
        name: 'Xuong C',
        path: '/Group RSO36/Xuong C',
        type: 'RSO36',
        isLocalMap: false,
        createdAt: '2025-03-12T11:35:24.911Z',
        updatedAt: '2025-04-08T07:54:12.842Z',
        parent: { name: 'Group RSO36', path: '/Group RSO36' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67d1717801a4d6cdebb2c311',
        name: 'Xuong B',
        path: '/Group RSO36/Xuong B',
        type: 'RSO36',
        isLocalMap: false,
        createdAt: '2025-03-12T11:35:20.192Z',
        updatedAt: '2025-04-08T07:54:12.842Z',
        parent: { name: 'Group RSO36', path: '/Group RSO36' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67d1713b01a4d6cdebb2c303',
        name: 'Nhom2',
        path: '/Group RSO18/Xuong A/Xuong A1/Nhom2',
        type: 'RSO18',
        isLocalMap: false,
        createdAt: '2025-03-12T11:34:19.903Z',
        updatedAt: '2025-03-12T11:34:19.903Z',
        parent: { name: 'Xuong A1', path: '/Group RSO18/Xuong A/Xuong A1' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67d1713701a4d6cdebb2c2f7',
        name: 'Nhom1',
        path: '/Group RSO18/Xuong A/Xuong A1/Nhom1',
        type: 'RSO18',
        isLocalMap: false,
        createdAt: '2025-03-12T11:34:15.787Z',
        updatedAt: '2025-03-12T11:34:15.787Z',
        parent: { name: 'Xuong A1', path: '/Group RSO18/Xuong A/Xuong A1' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 1,
        imageMap: null,
    },
    {
        _id: '67d1712501a4d6cdebb2c2eb',
        name: 'Xuong A1',
        path: '/Group RSO18/Xuong A/Xuong A1',
        type: 'RSO18',
        isLocalMap: false,
        createdAt: '2025-03-12T11:33:57.023Z',
        updatedAt: '2025-03-12T11:33:57.023Z',
        parent: { name: 'Xuong A', path: '/Group RSO18/Xuong A' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 3,
        imageMap: null,
    },
    {
        _id: '67d1710e01a4d6cdebb2c2df',
        name: 'Xuong A',
        path: '/Group RSO18/Xuong A',
        type: 'RSO18',
        isLocalMap: false,
        createdAt: '2025-03-12T11:33:34.486Z',
        updatedAt: '2025-03-12T11:33:34.486Z',
        parent: { name: 'Group RSO18', path: '/Group RSO18' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 4,
        imageMap: null,
    },
    {
        _id: '67d170e901a4d6cdebb2c2d2',
        name: 'Group RSO18',
        path: '/Group RSO18',
        type: 'RSO18',
        isLocalMap: false,
        createdAt: '2025-03-12T11:32:57.647Z',
        updatedAt: '2025-04-08T10:54:36.229Z',
        action: { brightness: true, turn: true },
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 2,
        numOfGroups: 5,
        imageMap: null,
    },
    {
        _id: '67d170e101a4d6cdebb2c2c9',
        name: 'Group RSO36',
        path: '/Group RSO36',
        type: 'RSO36',
        isLocalMap: false,
        createdAt: '2025-03-12T11:32:49.698Z',
        updatedAt: '2025-04-08T08:12:29.927Z',
        parent: { name: 'root', path: '/' },
        tenantName: 'DFM-Engineering',
        numOfDevices: 0,
        numOfGroups: 3,
        imageMap: null,
    },
];

const createDataExcel = (arrData, options) => {
    const dataExcel = [];
    const arrHeaderTitle = [];

    Object.keys(arrData[0]).forEach((key) => {
        arrHeaderTitle.push(key);
    });

    dataExcel.push(arrHeaderTitle);

    for (const item of arrData) {
        const rowItemValue = [];

        Object.keys(item).forEach((key) => {
            rowItemValue.push(item[key]);
        });

        dataExcel.push(rowItemValue);
    }

    const buffer = xlsx.build(
        [{ name: 'List Message', data: dataExcel }],
        options
    );

    const result = {
        data: buffer.toString('base64'),
    };

    return result;
};

const handleExportExcel = (data, timeZone) => {
    const dataExport = [];
    const options = {
        '!cols': [
            { wch: 30 },
            { wch: 30 },
            { wch: 55 },
            { wch: 55 },
            { wch: 15 },
            { wch: 25 },
        ],
    };
    for (const item of data) {
        const objectData = {
            Group: item.name,
            'Group path': item.path,
            'Created date': new Date(item.createdAt).toLocaleString('en-US', {
                timeZone,
            }),
            'Updated date': new Date(item.updatedAt).toLocaleString('en-US', {
                timeZone,
            }),
            'Number of devices': item.numOfDevices,
            'Local view': item.isLocalMap,
        };
        dataExport.push(objectData);
    }

    const dataExcel = createDataExcel(dataExport, options);
    console.log(dataExcel);
};

const start = performance.now();
handleExportExcel(dataGroup, 'Europe/Paris');
const end = performance.now();

console.log(`start: ${start} ms`);
console.log(`end: ${end} ms`);
console.log(`excute: ${(end - start).toFixed(3)} ms`);
