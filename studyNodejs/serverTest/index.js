import { performance } from 'node:perf_hooks';

const data = [
    {
        Presse: '50T',
        Tasks: [
            {
                id: 'task_50T_S22_Ve',
                start: 'S23 Me',
                end: 'S23 Ve',
                box_coordinates: [65, 376, 355, 118],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Yis:GRANDE Yis-D\u00e9signation:COUYERCLE DE REHAUSSE-Quantit\u00e9 DE pl\u00e8ces:1000O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_50T_S23_Ve',
                start: 'S23 Ve',
                end: 'S23 Ve',
                box_coordinates: [74, 237, 60, 49],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_50T_S24_Je',
                start: 'S24 Je',
                end: 'S24 Je',
                box_coordinates: [680, 234, 67, 53],
                proj_name: '1352-11 et 1352-12 B0',
                proj_info: '',
            },
            {
                id: 'task_50T_S25_Me',
                start: 'S25 Me',
                end: 'S25 Ve',
                box_coordinates: [884, 441, 232, 58],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Yis:GRANDE Yis-D\u00e9signation:COUYERCLE DE REHAUSSE-Quantit\u00e9 DE pl\u00e8ces:1500O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_50T_S23_Me',
                start: 'S23 Me',
                end: 'S23 Me',
                box_coordinates: [254, 376, 40, 45],
                proj_name: '1352-09-B2 Esclave 5',
                proj_info:
                    '50T-120 pi\u00e8ces-PPAGF35 EMS-Moule 150\u00b0C-1 empreinte-Semf-auto',
            },
            {
                id: 'task_50T_S23_Je',
                start: 'S23 Je',
                end: 'S23 Je',
                box_coordinates: [342, 240, 56, 43],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_50T_S24_Lu',
                start: 'S24 Lu',
                end: 'S24 Lu',
                box_coordinates: [140, 234, 58, 53],
                proj_name: '1352-01',
                proj_info:
                    '50T-1 empreinte-Essaf suite modifs sur 2 versions-Quantit\u00e9s de pi\u00e8ces:25 version 5710+et 25 version MNB(MINEBEA)-Mati\u00e8re:-PA66 GF30-Serni-auto',
            },
            {
                id: 'task_50T_S24_Ma',
                start: 'S24 Ma',
                end: 'S24 Ma',
                box_coordinates: [201, 234, 65, 54],
                proj_name: '1352-12 ADY03 INTERFACE',
                proj_info:
                    'Presse:50T-Vis:035-D\u00e9signation:ADV03 COYER-Quantit\u00e8 de pi\u00e8ces:-Tps de cycle:45s-Nbr empreintes:1-Mati\u00e8re:PPA GF35-Etuvage:90\u00b0C-Fr\u00e9hension:NON-Date de livraison:',
            },
            {
                id: 'task_50T_S24_Me',
                start: 'S24 Me',
                end: 'S24 Me',
                box_coordinates: [269, 234, 65, 54],
                proj_name: '1352-11 ADY03 COYER',
                proj_info:
                    'Presse:50T-Yis:035-D\u00e9signation:ADY03 COVER-Quantit\u00e9 de pi\u00e8ces:-Tps de cycle:50s-Nbr empreintes:1-Mati\u00e8re:PPA GF35-Etuvage:90\u00b0C-Fr\u00e9hension:NON-Date de livraison:',
            },
        ],
    },
    {
        Presse: '350T',
        Tasks: [
            {
                id: 'task_350T_S22_Ve',
                start: 'S23 Je',
                end: 'S23 Je',
                box_coordinates: [69, 303, 329, 62],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_350T_S23_Ve',
                start: 'S23 Ve',
                end: 'S20 Ve',
                box_coordinates: [756, 301, 379, 62],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-D\u00e9signation:COUVERCLE DE REHAUSSE-Quantit\u00e9 DE pi\u00e8ces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S24_Lu',
                start: 'S24 Lu',
                end: 'S24 Ve',
                box_coordinates: [158, 303, 311, 61],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-D\u00e9signation:COUVERCLE DE REHAUSSE-Quantit\u00e9 DE pi\u00e8ces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S25_Me',
                start: 'S25 Me',
                end: 'S25 Ve',
                box_coordinates: [884, 441, 232, 58],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Yis:GRANDE Yis-D\u00e9signation:COUYERCLE DE REHAUSSE-Quantit\u00e9 DE pl\u00e8ces:1500O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S28_Me',
                start: 'S28 Me',
                end: 'S28 Ve',
                box_coordinates: [947, 308, 249, 62],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-D\u00e9signation:COUVERCLE DE REHAUSSE-Quantit\u00e9 DE pi\u00e8ces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S25_Lu',
                start: 'S25 Lu',
                end: 'S25 Ma',
                box_coordinates: [443, 435, 122, 60],
                proj_name: '1203-14 Caliplast',
                proj_info:
                    'Presse:350T-Yis:Grande Yis-D\u00e9signation:Couronne Carr\u00e8 Blanche-Quantit\u00e9 de pi\u00e8ces:1254-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PP+BLANC-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
            {
                id: 'task_350T_S25_Ve',
                start: 'S25 Ve',
                end: 'S26 Ve',
                box_coordinates: [706, 435, 353, 58],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Yis:GRANDE Yis-D\u00e9signation:COUYERCLE DE REHAUSSE-Quantit\u00e9 DE pl\u00e8ces:1500O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S20_Lu',
                start: 'S20 Lu',
                end: 'S20 Ma',
                box_coordinates: [474, 301, 131, 64],
                proj_name: '1203-14 Caliplast',
                proj_info:
                    'Presse:350T-Vis:Grande Vis-D\u00e9signation:Couronne CarT\u00e9 Blanche-Quantit\u00e9 de pi\u00e8ces:1254-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PP+BLANC-Etuvage:oui-Fr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
            {
                id: 'task_350T_S20_Ve',
                start: 'S20 Ve',
                end: 'S20 Ve',
                box_coordinates: [756, 301, 379, 62],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-D\u00e9signation:COUVERCLE DE REHAUSSE-Quantit\u00e9 DE pi\u00e8ces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Pr\u00e9hension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S23_Lu',
                start: 'S23 Lu',
                end: 'S23 Ma',
                box_coordinates: [474, 301, 131, 64],
                proj_name: '1203-14 Caliplast',
                proj_info:
                    'Presse:350T-Vis:Grande Vis-D\u00e9signation:Couronne CarT\u00e9 Blanche-Quantit\u00e9 de pi\u00e8ces:1254-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PP+BLANC-Etuvage:oui-Fr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
        ],
    },
    {
        Presse: '1000T',
        Tasks: [
            {
                id: 'task_1000T_S22_Ve',
                start: 'S23 Me',
                end: 'S23 Me',
                box_coordinates: [67, 509, 245, 57],
                proj_name: '1331-01 ID2P-Seau 30L-PP MAIFILL CR X 8044',
                proj_info:
                    '20000 pi\u00e8ces-Tps Cycle:60s-Tps Prod:337h-6500 pi\u00e8ces pour S17 0h 6500 pi\u00e8ces moul\u00e9es et livr\u00e9es-6500 pi\u00e8ces pour S20 8.34h 5944 pi\u00e8ces moul\u00e9es Livr\u00e9e 5128 pi\u00e8ces-7000 pi\u00e8ces pour S24 108h',
            },
            {
                id: 'task_1000T_S23_Je',
                start: 'S23 Je',
                end: 'S23 Ve',
                box_coordinates: [340, 377, 130, 69],
                proj_name: '1357-01 ORCAPLAST',
                proj_info:
                    'Presse:1000T-Vis:GRANDE Vis-D\u00e9signation:GOULOTTE ATX-Quantit\u00e9 de pl\u00e8ces:1200-Tps de cycle:60s-Nbr empreintes:1+1-Mati\u00e8re:PP15T20T-Etuvage:OUI-Fr\u00e9hension:OUI-Date de livraison:11/06/2025',
            },
            {
                id: 'task_1000T_S24_Lu',
                start: 'S24 Lu',
                end: 'S24 Lu',
                box_coordinates: [476, 379, 62, 65],
                proj_name: '1177-55 M2065 IP3',
                proj_info:
                    'Presse:1000T-Yis:PETITE ou GRANDE-D\u00e9signation:CARTER EXTERIEUR SIEGE DROIT-Quantit\u00e9 de pi&pi\u00e8ces:135-Tps de cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP SABIC PHC31/81-Etuvage:OUI-Pr\u00e9hension:OUI-Date de livraison:6 juin 2025',
            },
            {
                id: 'task_1000T_S24_Ma',
                start: 'S24 Ma',
                end: 'S24 Me',
                box_coordinates: [235, 378, 94, 65],
                proj_name: '1177-55 M2065 IP3',
                proj_info:
                    'Presse:1000T-Yis:PETITE ou GRANDE-D\u00e9signation:CARTER EXTERIEUR SIEGE DROIT-Quantit\u00e9 de pi&pi\u00e8ces:135-Tps de cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP SABIC PHC31/81-Etuvage:OUI-Pr\u00e9hension:OUI-Date de livraison:6 juin 2025',
            },
            {
                id: 'task_1000T_S23_Ve',
                start: 'S23 Ve',
                end: 'S24 Ma',
                box_coordinates: [71, 376, 158, 68],
                proj_name: '1357-01 ORCAPLAST',
                proj_info:
                    'Presse:1000T-Vis:GRANDE Vis-D\u00e9signation:GOULOTTE ATX-Quantit\u00e9 de pl\u00e8ces:1200-Tps de cycle:60s-Nbr empreintes:1+1-Mati\u00e8re:PP15T20T-Etuvage:OUI-Fr\u00e9hension:OUI-Date de livraison:11/06/2025',
            },
            {
                id: 'task_1000T_S24_Je',
                start: 'S24 Je',
                end: 'S20 Ve',
                box_coordinates: [339, 380, 805, 60],
                proj_name: '1331-01 ID2P-Seau 30L-PP MAIFILL CR X 8044',
                proj_info:
                    '20000 pi\u00e8ces-Tps Cycle:60s-Tps Prod:337h-6500 pi\u00e8ces pour S17 0h 6500 pi\u00e8ces moul\u00e9es et livr\u00e9es-6500 pi\u00e8ces pour S20 0h 6500 pi\u00e8ces moul\u00e9es livr\u00e9e 5128 pi\u00e8ces 7000 pi\u00e8ces pour S24 99h 594 pi\u00e8ces moul\u00e9es',
            },
        ],
    },
    {
        Presse: '2500T',
        Tasks: [
            {
                id: 'task_2500T_S23_Lu',
                start: 'S23 Je',
                end: 'S23 Ve',
                box_coordinates: [144, 459, 323, 65],
                proj_name: 'Essai',
                proj_info: '',
            },
            {
                id: 'task_2500T_S24_Me',
                start: 'S24 Me',
                end: 'S24 Je',
                box_coordinates: [618, 677, 26, 23],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S24_Ve',
                start: 'S24 Ve',
                end: 'S24 Ve',
                box_coordinates: [713, 674, 40, 31],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S25_Lu',
                start: 'S25 Lu',
                end: 'S25 Lu',
                box_coordinates: [799, 676, 26, 19],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S25_Me',
                start: 'S25 Me',
                end: 'S25 Je',
                box_coordinates: [618, 677, 26, 23],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S25_Ve',
                start: 'S25 Ve',
                end: 'S25 Ve',
                box_coordinates: [713, 674, 40, 31],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S23_Ve',
                start: 'S23 Ve',
                end: 'S24 Ve',
                box_coordinates: [74, 457, 394, 65],
                proj_name: 'Essai',
                proj_info: '',
            },
            {
                id: 'task_2500T_S26_Lu',
                start: 'S26 Lu',
                end: 'S26 Lu',
                box_coordinates: [799, 676, 26, 19],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S26_Me',
                start: 'S26 Me',
                end: 'S26 Je',
                box_coordinates: [924, 678, 32, 22],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S26_Ve',
                start: 'S26 Ve',
                end: 'S26 Ve',
                box_coordinates: [1047, 678, 23, 25],
                proj_name:
                    '1350-02 Essai T0 sans gaz pour d\u00e9veriner 4 \u00e0 5 roues pleines',
                proj_info: '',
            },
        ],
    },
];

const dayOfWeek = {
    Lu: 1,
    Ma: 2,
    Me: 3,
    Je: 4,
    Ve: 5,
    Sa: 6,
    Di: 7,
};

// // const timezone = 'Europe/Paris';
// // const timezone = 'Asia/Ho_Chi_Minh';

const getCurrentMonday = (date) => {
    const now = new Date(date);
    const diff = (now.getDay() + 6) % 7; // Monday = 0
    now.setDate(now.getDate() - diff);
    return now.toISOString().split('T')[0];
};

const getFirstMondayOfWeek = (weekNo) => {
    const year = new Date().getFullYear();

    // Test weekNo is an integer in range 1 to 53
    if (Number.isInteger(+weekNo) && weekNo > 0 && weekNo < 54) {
        // Get to Monday of first ISO week of year
        const firstMonday = new Date(year, 0, 4);
        firstMonday.setDate(firstMonday.getDate() + (1 - firstMonday.getDay()));

        // Add required weeks
        firstMonday.setDate(firstMonday.getDate() + 7 * (weekNo - 1));

        // Check still in correct year (e.g. weekNo 53 in year of 52 weeks)
        if (firstMonday.getFullYear() <= year) {
            return firstMonday;
        }
    }
    // If not an integer or out of range, return undefined
    return;
};

const handleDays = (start, end) => {
    const splitStart = start.split(' ');
    const splitEnd = end.split(' ');
    const firstDayOfWeek = getFirstMondayOfWeek(
        parseInt(splitStart[0].replace(/[a-z]/gi, ''))
    );

    const lastDayOfWeek = getFirstMondayOfWeek(
        parseInt(splitEnd[0].replace(/[a-z]/gi, ''))
    );

    const startDay = new Date(
        firstDayOfWeek.setDate(
            firstDayOfWeek.getDate() + dayOfWeek[splitStart[1]]
        )
    )
        .toISOString()
        .split('T')[0];

    const endDay = new Date(
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + dayOfWeek[splitEnd[1]])
    )
        .toISOString()
        .split('T')[0];

    const mondayOfWeek = getCurrentMonday(startDay);

    return {
        mondayOfWeek,
        startDay,
        endDay,
    };
};

const handleData = (message) => {
    const messageData = message;

    const listPresses = [];

    for (const message of messageData) {
        listPresses.push(message.Presse);

        const listSch = [];

        const tasks = message.Tasks;

        for (const { proj_name, ...attr } of tasks) {
            const objSch1 = {
                firstDay: '',
                time: '00:00:00',
                action: true,
                days: [],
                isEnabled: true,
            };

            const objSch2 = {
                firstDay: '',
                time: '00:00:00',
                action: false,
                days: [],
                isEnabled: true,
            };

            const objHandled = handleDays(attr.start, attr.end);

            objSch1.firstDay = objHandled.mondayOfWeek;
            objSch1.days.push(objHandled.startDay);

            if (objHandled.startDay == objHandled.endDay) {
                objSch2.time = '23:59:59';
            }

            objSch2.firstDay = objHandled.mondayOfWeek;
            objSch2.days.push(objHandled.endDay);

            listSch.push(objSch1, objSch2);
        }

        console.log(JSON.stringify(listSch));
        break;
    }
};

const start = performance.now();
handleData(data);
const end = performance.now();

console.log(`start: ${start} ms`);
console.log(`end: ${end} ms`);
console.log(`excute: ${(end - start).toFixed(3)} ms`);
