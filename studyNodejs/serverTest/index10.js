import { performance } from 'node:perf_hooks';

const data = [
    {
        Presse: '350T',
        Tasks: {
            id: 'task_350T_S26_Ma',
            start: 'S26 Je',
            end: 'S27 Lu',
            box_coordinates: [285, 418, 567, 90],
            proj_name: '1203-13 Couvercle de rehausse M150',
            proj_info:
                'Presse : 350T - Vis : Grande Vis - D\u00e9signation : Couvercle de rehausse 101144 - Quantit\u00e9 de pi\u00e8ces : 15000 blanches - Tps de cycle : 47s - Nbr empreintes : 1 - Mati\u00e8re: PP + colorant Blanc - Etuvage: oui - Pr\u00e9hension: oui - Date de livraison : 30 juin 2025',
        },
    },
    {
        Presse: '350T',
        Tasks: {
            id: 'task_350T_S27_Me',
            start: 'S27 Me',
            end: 'S27 Ve',
            box_coordinates: [943, 418, 298, 90],
            proj_name: 'Overlapped Object',
            proj_info: '',
        },
    },
    {
        Presse: '350T',
        Tasks: {
            id: 'task_350T_S28_Ma',
            start: 'S28 Ma',
            end: 'S28 Je',
            box_coordinates: [1324, 418, 284, 90],
            proj_name: 'Overlapped Object',
            proj_info: '',
        },
    },
    {
        Presse: '1000T',
        Tasks: {
            id: 'task_1000T_S26_Je',
            start: 'S26 Je',
            end: 'S26 Ve',
            box_coordinates: [478, 514, 179, 95],
            proj_name: '1313-07 : ASM Couvercle WTC 2',
            proj_info:
                '250 pi\u00e8ces en mati\u00e8re - NORYL GTX 944 (PPE+PA) - 10h de prod (Tps de cyle: 132s - 26 pi\u00e8ces /h) - 1000T: grosse vis - 1 empreinte - Etuvage 115\u00b0 - 2 a 3 Heures - Auto',
        },
    },
    {
        Presse: '1000T',
        Tasks: {
            id: 'task_1000T_S27_Ma',
            start: 'S27 Ma',
            end: 'S28 Je',
            box_coordinates: [788, 517, 825, 96],
            proj_name: '1177-11 IP3 M1899',
            proj_info:
                'Presse : 1000T - Vis : GRANDE - D\u00e9signation : TRAVERSE ARRIERE P12C - Quantit\u00e9 de pi\u00e8ces : 6700 - Tps de cycle : 47s - Nbr empreintes : 1 - Mati\u00e8re: PP 40%FV HOSTCOM - Etuvage: OUI - Pr\u00e9hension: OUI - Date de livraison : FIN JUILLET',
        },
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

        const task = message.Tasks;

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
            isSubsetRange(pressTask.start, pressTask.end, val.start, val.end)
        );

        if (!isCheckDate) {
            const isEnd = listPresses.find(
                (val) => val.end.slice(0, 10) == pressTask.start.slice(0, 10)
            );

            const isStart = listPresses.find(
                (val) => val.start.slice(0, 10) == pressTask.start.slice(0, 10)
            );

            if (isEnd) {
                isEnd.end = isEnd.end.replace('23:59:59', '11:59:59');
                pressTask.start = pressTask.start.replace(
                    '00:00:00',
                    '12:00:00'
                );
            }

            if (isStart) {
                isStart.start = isStart.start.replace('00:00:00', '12:00:00');
                pressTask.end = pressTask.end.replace('23:59:59', '11:59:59');
            }

            listPresses.push(pressTask);
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
