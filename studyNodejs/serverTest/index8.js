import { performance } from 'node:perf_hooks';

const SCH_DEVICE = [
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
                    'Presse:350T-Yis:GRANDE Yis-Désignation:COUYERCLE DE REHAUSSE-Quantité DE plèces:1000O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Matière:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Préhension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_50T_S23_Ve',
                start: 'S23 Ve',
                end: 'S23 Ve',
                box_coordinates: [410, 237, 58, 48],
                proj_name: '1352-09-B2 Esclave 7',
                proj_info:
                    '50T-120 pièces-PPAGF35 EMS-Moule à 150°C-1 empreinte-Semi-auto',
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
                    'Presse:350T-Yis:GRANDE Yis-Désignation:COUYERCLE DE REHAUSSE-Quantité DE plèces:1500O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Matière:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Préhension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_50T_S23_Me',
                start: 'S23 Me',
                end: 'S23 Me',
                box_coordinates: [254, 376, 40, 45],
                proj_name: '1352-09-B2 Esclave 5',
                proj_info:
                    '50T-120 pièces-PPAGF35 EMS-Moule 150°C-1 empreinte-Semf-auto',
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
                box_coordinates: [475, 238, 59, 54],
                proj_name: 'Overlapped Object',
                proj_info: '',
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
                end: 'S23 Ve',
                box_coordinates: [408, 303, 54, 62],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_350T_S24_Lu',
                start: 'S24 Lu',
                end: 'S24 Me',
                box_coordinates: [470, 302, 200, 62],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-Désignation:COUVERCLE DE REHAUSSE-Quantité DE pièces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Matière:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Préhension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S25_Me',
                start: 'S25 Me',
                end: 'S25 Ve',
                box_coordinates: [884, 441, 232, 58],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Yis:GRANDE Yis-Désignation:COUYERCLE DE REHAUSSE-Quantité DE plèces:1500O blanches+500O gris-Tps DE cycle:48s-Nbr empreintes:1-Matière:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Préhension:OUI-Date DE livraison:3 JUIN 2025',
            },
            {
                id: 'task_350T_S28_Me',
                start: 'S28 Me',
                end: 'S28 Ve',
                box_coordinates: [947, 308, 249, 62],
                proj_name: '1203-13 CALIPLAST M150',
                proj_info:
                    'Presse:350T-Vis:GRANDE Vis-Désignation:COUVERCLE DE REHAUSSE-Quantité DE pièces:15000 blanches+5000 gris-Tps DE cycle:48s-Nbr empreintes:1-Matière:PP COPO GRADE 15-20T+BLANC R9016-Etuvage:OUI-Préhension:OUI-Date DE livraison:3 JUIN 2025',
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
                    '20000 pièces-Tps Cycle:60s-Tps Prod:337h-6500 pièces pour S17 0h 6500 pièces moulées et livrées-6500 pièces pour S20 8.34h 5944 pièces moulées Livrée 5128 pièces-7000 pièces pour S24 108h',
            },
            {
                id: 'task_1000T_S23_Je',
                start: 'S23 Je',
                end: 'S23 Ve',
                box_coordinates: [340, 377, 130, 69],
                proj_name: '1357-01 ORCAPLAST',
                proj_info:
                    'Presse:1000T-Vis:GRANDE Vis-Désignation:GOULOTTE ATX-Quantité de plèces:1200-Tps de cycle:60s-Nbr empreintes:1+1-Matière:PP15T20T-Etuvage:OUI-Fréhension:OUI-Date de livraison:11/06/2025',
            },
            {
                id: 'task_1000T_S24_Lu',
                start: 'S24 Lu',
                end: 'S24 Lu',
                box_coordinates: [476, 379, 62, 65],
                proj_name: '1177-55 M2065 IP3',
                proj_info:
                    'Presse:1000T-Yis:PETITE ou GRANDE-Désignation:CARTER EXTERIEUR SIEGE DROIT-Quantité de pi&pièces:135-Tps de cycle:48s-Nbr empreintes:1-Matière:PP SABIC PHC31/81-Etuvage:OUI-Préhension:OUI-Date de livraison:6 juin 2025',
            },
            {
                id: 'task_1000T_S24_Ma',
                start: 'S24 Ma',
                end: 'S28 Ve',
                box_coordinates: [545, 378, 651, 67],
                proj_name: '1331-01 ID2P-Seau 30L-PP MAIFILL CR X 8044',
                proj_info:
                    '20000 pièces-Tps Cycle:60s-Tps Prod:337h-6500 pièces pour S17 0h 6500 pièces moulées et livrées-6500 pièces pour S20 58.8h 2650 pièces moulées livrée 1252 pièces-7000 pièces pour S24 108h',
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
                box_coordinates: [924, 678, 32, 22],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_S25_Ve',
                start: 'S25 Ve',
                end: 'S25 Ve',
                box_coordinates: [1047, 678, 23, 25],
                proj_name:
                    '1350-02 Essai T0 sans gaz pour déveriner 4 à 5 roues pleines',
                proj_info: '',
            },
        ],
    },
];

const handleDataJOBEA = (param) => {
    const listGroup = {
        name: '',
        type: 'GENERAL',
        shortDescription: '',
        isLocal: '',
    };
};

const start = performance.now();
handleDataJOBEA(SCH_DEVICE);
const end = performance.now();
console.log(`Total execution time: ${(end - start).toFixed(3)} ms`);
