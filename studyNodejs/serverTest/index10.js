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
                end: 'S24 Me',
                box_coordinates: [188, 373, 124, 50],
                proj_name: '1352-12 ADV03 INTERFACE',
                proj_info:
                    'Presse:50T-Yis:035-D\u00e9signation:ADV03 COVER-Quantit\u00e9 de pi\u00e8ces:-Tps de cycle:45s-Nbr empreintes:1-Mati\u00e8re:PPA GF35-Etuvage:90"C-Pr\u00e9hension:NON-Date de livraison:',
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
            {
                id: 'task_50T_SNone_Ve',
                start: 'SNone Ve',
                end: 'SNone Lu',
                box_coordinates: [334, 370, 61, 50],
                proj_name: '1352-11 ADV03 COVER',
                proj_info:
                    'Presse:50T-Vis:035-D\u00e9signation:ADV03 COVER Quantit\u00e9 de pl\u00e8ces:150-Tps de cycle:50s-Nbr empreintes:1-Mati\u00e8re PPA GF35-Etuvage:90\u00b0C-Pr\u00e9hension:NON-Date de livraison:',
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
                end: 'S24 Ma',
                box_coordinates: [67, 434, 179, 59],
                proj_name: 'Overlapped Object',
                proj_info: '',
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
                end: 'S25 Lu',
                box_coordinates: [444, 437, 56, 59],
                proj_name: '1203-15 Caliplast M319',
                proj_info:
                    'Presse:350T-Vis:petite Vis-D\u00e9signation:boite \u00e0 PLomb-Quantit\u00e9 de pi\u00e8ces:50-Tps de cycle:-Nbr empreintes:8-Mati\u00e8re:PP+colorant-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:semaine 26',
            },
            {
                id: 'task_350T_S25_Ve',
                start: 'S25 Ve',
                end: 'S26 Ve',
                box_coordinates: [696, 435, 366, 60],
                proj_name: '1203-13 Couvercle de rehausse M150',
                proj_info:
                    'Presse:350T-Vis:Grande Vis D\u00e9signation:Couvercle de rehausse 101144-Quantit\u00e9 de pl\u00e8ces:15000 blanches-Tps de cycle:47s-Nbr empreintes:1-Mati\u00e8re:PP+colornt Blanc-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:30 juin 2025',
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
            {
                id: 'task_350T_S24_Ma',
                start: 'S24 Ma',
                end: 'S25 Lu',
                box_coordinates: [195, 434, 283, 60],
                proj_name: '1203-03 Caliplast',
                proj_info:
                    'Presse:350T-Yis:Grande Yis-D\u00e9signation:Base Carr\u00e9 Blanche 106529-Quantit\u00e9 de pl\u00e8ces:2552-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PC+BLANC REGENERE-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
            {
                id: 'task_350T_S26_Me',
                start: 'S26 Me',
                end: 'S26 Ve',
                box_coordinates: [883, 434, 348, 60],
                proj_name: '1203-13 Couvercle de rehausse M150',
                proj_info:
                    'Presse:350T-Vis:Grande Vis D\u00e9signation:Couvercle de rehausse 101144-Quantit\u00e9 de pl\u00e8ces:15000 blanches-Tps de cycle:47s-Nbr empreintes:1-Mati\u00e8re:PP+colornt Blanc-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:30 juin 2025',
            },
            {
                id: 'task_350T_SNone_Ma',
                start: 'SNone Ma',
                end: 'SNone Je',
                box_coordinates: [484, 435, 143, 60],
                proj_name: '1203-02 Caliplast',
                proj_info:
                    'Presse:350T-Yis:Grande Yis-D\u00e9signation:Couronne Carr\u00e8 Blanche-Quantit\u00e9 de pi\u00e8ces:1254-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PP+BLANC-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
            {
                id: 'task_350T_Sra_Ma',
                start: 'Sra Ma',
                end: 'Sra Ma',
                box_coordinates: [760, 435, 56, 58],
                proj_name: '1203-15 Caliplast M319',
                proj_info:
                    'Presse:350T-Vis:petite Vis-D\u00e9signation:boite \u00e0 PLomb-Quantit\u00e9 de pi\u00e8ces:50-Tps de cycle:-Nbr empreintes:8-Mati\u00e8re:PP+colorant-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:semaine 26',
            },
            {
                id: 'task_350T_Sra_Me',
                start: 'Sra Me',
                end: 'Sra Me',
                box_coordinates: [821, 435, 57, 59],
                proj_name: '1203-15 Caliplast M320',
                proj_info:
                    'Presse:350T-Vis:petite Vis-D\u00e9signation:Couvercle boite \u00e0 plomb-Quantit\u00e9 de pl\u00e8ces:50-Tps de cycle:-Nbr empreintes:8-Mati\u00e8re:PS CRISTAL-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:semaine 26',
            },
            {
                id: 'task_350T_Sra_Je',
                start: 'Sra Je',
                end: 'Sra Ve',
                box_coordinates: [883, 434, 348, 60],
                proj_name: '1203-13 Couvercle de rehausse M150',
                proj_info:
                    'Presse:350T-Vis:Grande Vis D\u00e9signation:Couvercle de rehausse 101144-Quantit\u00e9 de pl\u00e8ces:15000 blanches-Tps de cycle:47s-Nbr empreintes:1-Mati\u00e8re:PP+colornt Blanc-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:30 juin 2025',
            },
            {
                id: 'task_350T_S24_Me',
                start: 'S24 Me',
                end: 'S24 Ve',
                box_coordinates: [251, 435, 182, 60],
                proj_name: '1203-02 Caliplast',
                proj_info:
                    'Presse:350T-Yis:Grande Yis-D\u00e9signation:Couronne Carr\u00e8 Blanche-Quantit\u00e9 de pi\u00e8ces:1254-Tps de cycle:55s-Nbr empreintes:1-Mati\u00e8re:PP+BLANC-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:13 juin 2025',
            },
            {
                id: 'task_350T_S25_Ma',
                start: 'S25 Ma',
                end: 'S25 Ma',
                box_coordinates: [506, 435, 57, 60],
                proj_name: '1203-15 Caliplast M320',
                proj_info:
                    'Presse:350T-Vis:petite Vis-D\u00e9signation:Couvercle boite \u00e0 plomb-Quantit\u00e9 de pl\u00e8ces:50-Tps de cycle:-Nbr empreintes:8-Mati\u00e8re:PS CRISTAL-Etuvage:oui-Pr\u00e9hension:oui-Date de livraison:semaine 26',
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
                box_coordinates: [219, 507, 89, 60],
                proj_name: '1177-55 M2065 IPS',
                proj_info:
                    'Presse:1000T-IPS:PETITE ou GRANDE-D\u00e9signation:CARTER EXTERIEUR SIEGE DROIT-Quantit\u00e8 de pi\u00e8ces:135-Tps de cycle:48s-Nbr empreintes:1-Mati\u00e8re:PP SABIC PHC31/81-Etuvage:OUI-Pr\u00e9hension:ou-Date de Livraison:6 juin 2025',
            },
            {
                id: 'task_1000T_S23_Ve',
                start: 'S23 Ve',
                end: 'S25 Ve',
                box_coordinates: [67, 509, 683, 56],
                proj_name: '1331-01 ID2P-Seau 30L-PP MAIFILL CR X 8044',
                proj_info:
                    '20000 pi\u00e8ces-Tps Cycle:60s-Tps Prod:337h-6500 pi\u00e8ces pour S17 0h 6500 pi\u00e8ces moul\u00e9es et livr\u00e9es-6500 pi\u00e8ces pour S20 0h 6500 pi\u00e8ces moul\u00e9es livr\u00e9e 5128 pi\u00e8ces 7000 pi\u00e8ces pour S24 99h 594 pi\u00e8ces moul\u00e9es',
            },
            {
                id: 'task_1000T_S24_Je',
                start: 'S24 Je',
                end: 'S26 Ve',
                box_coordinates: [317, 509, 751, 56],
                proj_name: '1331-01 ID2P-Seau 30L-PP MAIFILL CR X 8044',
                proj_info:
                    '20000 pi\u00e8ces-Tps Cycle:60s-Tps Prod:337h-6500 pi\u00e8ces pour S17 0h 6500 pi\u00e8ces moul\u00e9es et livr\u00e9es-6500 pi\u00e8ces pour S20 0h 6500 pi\u00e8ces moul\u00e9es livr\u00e9e 5128 pi\u00e8ces 7000 pi\u00e8ces pour S24 99h 594 pi\u00e8ces moul\u00e9es',
            },
            {
                id: 'task_1000T_SNone_Je',
                start: 'SNone Je',
                end: 'Sra Ve',
                box_coordinates: [317, 509, 751, 56],
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
                box_coordinates: [69, 580, 368, 61],
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
            {
                id: 'task_2500T_SNone_Ve',
                start: 'SNone Je',
                end: 'SNone Lu',
                box_coordinates: [69, 580, 368, 61],
                proj_name: 'Essai',
                proj_info: '',
            },
            {
                id: 'task_2500T_Sra_Lu',
                start: 'Sra Lu',
                end: 'Sra Lu',
                box_coordinates: [713, 674, 40, 31],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_Sra_Ma',
                start: 'Sra Ma',
                end: 'Sra Ma',
                box_coordinates: [799, 676, 26, 19],
                proj_name: 'Overlapped Object',
                proj_info: '',
            },
            {
                id: 'task_2500T_Sra_Je',
                start: 'Sra Je',
                end: 'Sra Ve',
                box_coordinates: [924, 678, 32, 22],
                proj_name: 'Overlapped Object',
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

const isSubsetRange = (aStart, aEnd, bStart, bEnd) => {
    const valA1 = new Date(aStart);
    const valA2 = new Date(aEnd);
    const valB1 = new Date(bStart);
    const valB2 = new Date(bEnd);

    return valB1 < valA1 && valA2 < valB2;
};

const getDateFromISOWeek = (weekNumber, frenchWeekday) => {
    const weekday = dayOfWeek[frenchWeekday];
    if (!weekday) throw new Error('Invalid French weekday');

    const year = new Date().getFullYear();

    // Get the first day of the year
    const jan4 = new Date(year, 0, 4);

    // Get the first Monday of the year (start of ISO week 1)
    const firstWeekStart = new Date(jan4);
    const day = jan4.getDay(); // 0 (Sun) - 6 (Sat)
    const isoDay = day === 0 ? 7 : day;
    firstWeekStart.setDate(jan4.getDate() - isoDay + 1);

    // Calculate the date for the requested week and weekday
    const date = new Date(firstWeekStart);
    date.setDate(date.getDate() + (weekNumber - 1) * 7 + (weekday - 1));

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};

const hanldeDateOfTask = (str) => {
    // Example usage
    const match = str.match(/^S+(\d{1,2})\s+(\w+)$/);
    if (match) {
        const week = parseInt(match[1], 10);
        const weekday = match[2];
        const fullDate = getDateFromISOWeek(week, weekday);
        return fullDate;
    } else {
        throw new Error('Invalid input format');
    }
};

const handleData = (message) => {
    const messageData = message;

    const listPresses = [];

    for (const message of messageData) {
        const namePress = message.Presse;

        const listTasks = message.Tasks;

        for (const task of listTasks) {
            const pressTask = {
                _id: task.id,
                pressName: namePress,
                projectName: task.proj_name,
            };

            try {
                const startDate = hanldeDateOfTask(task.start);
                const endDate = hanldeDateOfTask(task.end);

                pressTask.start = `${startDate} 00:00:00`;
                pressTask.end = `${endDate} 23:59:59`;
            } catch (error) {
                console.log(error.message);
                continue;
            }

            const isCheckDate = listPresses.find((val) =>
                isSubsetRange(
                    pressTask.start,
                    pressTask.end,
                    val.start,
                    val.end
                )
            );

            if (!isCheckDate) {
                const isEnd = listPresses.find(
                    (val) =>
                        val.end.slice(0, 10) == pressTask.start.slice(0, 10)
                );

                const isStart = listPresses.find(
                    (val) =>
                        val.start.slice(0, 10) == pressTask.start.slice(0, 10)
                );

                if (isEnd) {
                    isEnd.end = isEnd.end.replace('23:59:59', '11:59:59');
                    pressTask.start = pressTask.start.replace(
                        '00:00:00',
                        '12:00:00'
                    );
                }

                if (isStart) {
                    isStart.start = isStart.start.replace(
                        '00:00:00',
                        '12:00:00'
                    );
                    pressTask.end = pressTask.end.replace(
                        '23:59:59',
                        '11:59:59'
                    );
                }

                listPresses.push(pressTask);
            }
        }
    }

    console.log(JSON.stringify(listPresses));
};

const start = performance.now();
handleData(data);
const end = performance.now();

console.log(`start: ${start} ms`);
console.log(`end: ${end} ms`);
console.log(`excute: ${(end - start).toFixed(3)} ms`);
