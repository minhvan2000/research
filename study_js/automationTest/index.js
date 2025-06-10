const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
require('dotenv').config();
const converter = require('json-2-csv');
const moment = require('moment'); // require

const dataCsv = {};

let startTime = new Date();

const arrESO = [];
const arrONOFF = [];
const arrREAD = [];
const arrMASTER = [];

/**
 * The function accesses device data, sends a command to navigate to a specific webpage, fills out
 * login details, and clicks on the login button.
 */
async function accessDeviceDataAndSendCommand() {
    // launch the browser
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // navigate to facebook login page
        await driver.manage().setTimeouts({ implicit: 2000 });
        await driver.get(`http://${process.env.APP_HOST}/app/#/auth/signin`);
        // Select input elements and fill them out
        await driver.findElement(By.id('email')).sendKeys('admin123@gmail.com');
        await driver
            .findElement(By.id('password'))
            .sendKeys('\\DfMEng/@*#&2021');
        // Select login button and invoke click action
        //If login details are correct we wiil be redirected to the welcome page
        await driver.findElement(By.className('btn-info')).click();

        await driver.sleep(4000);

        await startSetTimeout(driver);
    } finally {
        // await driver.quit();

        console.log('Start Interval');
    }
}

/**
 * The `initData` function reads data from CSV files and stores them in different arrays.
 */
function initData() {
    // const dataESO = handleDataRaw('./list_device_ESO.csv');

    const dataONOFF = handleDataRaw('./list_device_ONOFF.csv');

    // const dataREAD = handleDataRaw('./list_device_READ.csv');

    // const dataMASTER = handleDataRaw('./list_device_MASTER.csv');

    // console.log('dataREAD::', dataREAD);
    console.log('dataONOFF::', dataONOFF);
    // console.log('dataESO::', dataESO);
    // console.log('dataMASTER::', dataMASTER);

    // arrESO.push(...dataESO);
    arrONOFF.push(...dataONOFF);
    // arrREAD.push(...dataREAD);
    // arrMASTER.push(...dataMASTER);
}

/**
 * The function `handleDataRaw` reads data from a file, splits it into an array, removes the first and
 * last elements, and then slices each element to remove the first 5 characters.
 * @param params - It seems like you forgot to provide the value for the `params` variable in the
 * `handleDataRaw` function. The `params` variable should contain the file path from which you want to
 * read the data. Make sure to pass the correct file path as a string when calling the `handleData
 * @returns The function `handleDataRaw` reads data from a file specified by the `params` argument,
 * splits the data into an array of strings, removes the last element and the first element from the
 * array, and then returns a new array where each element is a substring of the original string
 * starting from the 6th character.
 */
function handleDataRaw(params) {
    const rawData = fs.readFileSync(params, {
        encoding: 'utf8',
    });

    const strArr = rawData.split('\r\n');
    strArr.pop();
    strArr.shift();

    return strArr.map((value) => value.slice(5));
}

/**
 * The function `startSetTimeout` asynchronously iterates through a list of devices, sends commands,
 * checks commands, waits for a specified time, and then recursively calls itself.
 * @param driver - The `driver` parameter in the `startSetTimeout` function is likely an object
 * representing a web driver or automation tool that allows you to interact with a web browser or
 * application programmatically. It is used to perform actions like finding devices, sending commands,
 * and checking commands asynchronously in the provided code snippet
 */
async function startSetTimeout(driver) {
    try {
        startTime = new Date();

        const listDevice = [...arrESO, ...arrONOFF, ...arrREAD, ...arrMASTER];

        console.log('startTime::', startTime);
        console.log('listDevice::', listDevice);

        for (const item of listDevice) {
            if (!dataCsv[item]) {
                dataCsv[item] = [];
            }

            await findDeviceAndSendCommand(driver, item);
        }

        for (const item of listDevice) {
            await findDeviceAndCheckCommand(driver, item);
        }

        const timeNextAction =
            300000 - (new Date().getTime() - startTime.getTime());

        console.log(`Waiting:: ${timeNextAction / 60000} minutes`);

        setTimeout(async () => {
            await startSetTimeout(driver);
        }, timeNextAction);
    } catch (error) {
        await exportCSV();
        throw new Error(error.message);
    }
}

/**
 * The function `findDeviceAndSendCommand` searches for a device, updates its information, displays the
 * data in a table, and sends a command if the device status is active.
 * @param driver - The `driver` parameter in the `findDeviceAndSendCommand` function is typically a
 * reference to a WebDriver instance that allows interaction with a web browser for automated testing
 * or web scraping purposes. It is used to perform actions such as navigating to URLs, clicking
 * elements, filling out forms, and more.
 * @param deviceID - The `deviceID` parameter is a unique identifier for a specific device. In the
 * `findDeviceAndSendCommand` function, it is used to locate and interact with a particular device in
 * the system.
 */
async function findDeviceAndSendCommand(driver, deviceID) {
    const object = {
        deviceID: `LTE-${deviceID}`,
        timeSend: '',
        'timeTotal(s)': '',
        status: '',
        firmwareVer: '',
    };

    if (!arrREAD.includes(deviceID)) {
        object.relay = '';

        if (arrESO.includes(deviceID)) {
            object.dimming = '100';
        }
    }

    dataCsv[deviceID].push(object);

    await findDeviceTest(driver, deviceID);

    console.table(dataCsv[deviceID]);

    if (dataCsv[deviceID][dataCsv[deviceID].length - 1].status == 'active') {
        await sendCommand(driver, deviceID);
    }
}

async function findDeviceAndCheckCommand(driver, deviceID) {
    await findDeviceTest(driver, deviceID);
    await getData(driver, deviceID);
}

async function findDeviceTest(driver, deviceID) {
    let flagError = false;
    let retryCount = 5;

    await driver
        .navigate()
        .to(`http://${process.env.APP_HOST}/app/#/admin/devices`);

    await driver.sleep(5000);

    let page = 1;

    while (retryCount > 0 && !flagError) {
        try {
            if (page === 1) {
                const inputSearch = await driver.findElement(
                    By.xpath('//*[@id="typeSearch"]')
                );

                await inputSearch.click();

                await driver.sleep(2000);

                await driver
                    .findElement(By.css('option[value="deviceID"]'))
                    .click();
                await driver.sleep(2000);

                await driver
                    .findElement(By.css('.input-container input'))
                    .sendKeys(deviceID);

                await driver.sleep(300);

                await driver
                    .findElement(
                        By.css(
                            'div.suggestions-container.is-visible ul li.item.ng-star-inserted div a'
                        )
                    )
                    .click();

                await driver.sleep(2000);

                await driver
                    .findElement(
                        By.css('.table-responsive table tbody tr .line-break a')
                    )
                    .click();

                await driver.sleep(4000);
            }

            page++;

            const statusDevice = await driver
                .findElement(
                    By.css('.agm-info-window-content tr:nth-child(3) td')
                )
                .getText();

            if (statusDevice.includes('in-active')) {
                dataCsv[deviceID][dataCsv[deviceID].length - 1].status =
                    'in-active';
            } else {
                dataCsv[deviceID][dataCsv[deviceID].length - 1].status =
                    'active';
            }

            const firmwareVersion = await driver
                .findElement(
                    By.xpath(
                        '//*[@id="page-wrapper"]/div/div[2]/div[1]/div/div/ul[2]/li[1]/div[2]'
                    )
                )
                .getText();

            dataCsv[deviceID][dataCsv[deviceID].length - 1].firmwareVer =
                firmwareVersion;

            await driver.sleep(4000);

            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(4000);

            if (retryCount == 0) {
                await exportCSV();
                throw new Error(error.message);
            }
        }
    }
}

async function sendCommand(driver, deviceID) {
    let flagError = false;
    let retryCount = 5;

    while (retryCount > 0 && !flagError) {
        try {
            if (arrMASTER.includes(deviceID)) {
                const listSlave = await driver.findElements(
                    By.xpath(
                        '//*[@id="page-wrapper"]/div/div[2]/div[1]/div/div/ul[2]/li[5]/div[2]/div'
                    )
                );

                for (const slave of listSlave) {
                    console.log(await slave.getText());
                    await slave.click();
                }
            } else if (!arrREAD.includes(deviceID)) {
                const configBtn = await driver.findElement(
                    By.css('i.fa.fa-cogs')
                );
                configBtn.click();

                await driver.sleep(4000);
                const switchBtn = await driver.findElement(
                    By.css('.modal.fade.in.show .form-group ui-switch button')
                );
                const textSwitch = await switchBtn.getText();

                console.log('textSwitch::', textSwitch);

                if (arrESO.includes(deviceID) && textSwitch === 'ON') {
                    const rangeText = await driver.findElement(
                        By.xpath(
                            '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[2]/div/div[2]/div/div/div/div/span'
                        )
                    );

                    const rangeInput = await driver.findElement(
                        By.xpath(
                            '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[2]/div/div[2]/div/div/div/div/input'
                        )
                    );

                    const dataRange = await rangeText.getText();

                    if (dataRange === '100') {
                        const actions = driver.actions();
                        await actions
                            .move({ origin: rangeInput, x: 0, y: 1 })
                            .press()
                            .release()
                            .perform();
                    } else {
                        await switchBtn.click();
                    }
                    dataCsv[deviceID][dataCsv[deviceID].length - 1].dimming =
                        await rangeText.getText();
                } else {
                    await switchBtn.click();
                }

                dataCsv[deviceID][dataCsv[deviceID].length - 1].relay =
                    await switchBtn.getText();
            } else {
                const downlinkBtn = await driver.findElement(
                    By.xpath('//*[@id="activity"]/div[1]/div[2]/div/button[2]')
                );
                downlinkBtn.click();

                await driver.sleep(4000);
                const commandInput = await driver.findElement(
                    By.xpath(
                        '//*[@id="wrapper"]/app-device-detail/div[3]/div/div/div[2]/div/div/div[1]/div/div/div/input'
                    )
                );

                await commandInput.sendKeys('090305001B00CCCC');
            }

            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(4000);

            if (retryCount == 0) {
                dataCsv[deviceID][dataCsv[deviceID].length - 1].relay = '';
                dataCsv[deviceID][dataCsv[deviceID].length - 1].dimming = '';
                await exportCSV();
                throw new Error(error.message);
            }
        }
    }

    await driver.sleep(4000);

    if (!arrREAD.includes(deviceID)) {
        let saveBtn = await driver.findElement(
            By.xpath(
                '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[3]/button[1]'
            )
        );

        const titleSave = await saveBtn.getText();

        console.log('titleSave::', titleSave);

        if (titleSave !== 'Sauvegarder') {
            saveBtn = await driver.findElement(
                By.xpath(
                    '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[3]/button[2]'
                )
            );
        }

        await saveBtn.click();
    } else {
        const saveBtn = await driver.findElement(
            By.xpath(
                '//*[@id="wrapper"]/app-device-detail/div[3]/div/div/div[3]/button[1]'
            )
        );

        const titleSave = await saveBtn.getText();

        console.log('titleSave::', titleSave);

        await saveBtn.click();
    }

    retryCount = 5;
    flagError = false;

    while (retryCount > 0 && !flagError) {
        try {
            await driver.sleep(5000);
            const swalConfirm = await driver.findElement(
                By.css('.swal2-actions .swal2-confirm')
            );

            await swalConfirm.click();
            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(2000);

            if (retryCount == 0) {
                dataCsv[deviceID][dataCsv[deviceID].length - 1].relay = '';
                await exportCSV();
                throw new Error(error.message);
            }
        }
    }

    await driver.sleep(4000);
}

async function getData(driver, deviceID) {
    let flagError = false;
    let retryCount = 3;

    while (retryCount > 0 && !flagError) {
        try {
            let i = 1;

            while (i <= 20) {
                const tableRow3 = `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[3]/span`;
                const tableRow4 = `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[4]/span`;
                const tableRow5 = `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[5]`;

                const elm = await driver.findElement(By.xpath(tableRow3));

                console.log('TypeMessage::', await elm.getText());

                const textElm = await elm.getText();

                if (textElm === 'Downlink') {
                    const timeSend = await driver.findElement(
                        By.xpath(tableRow4)
                    );

                    console.log(
                        `timeSend[${deviceID}]::`,
                        await timeSend.getText()
                    );

                    const timeSendDownlink = await timeSend.getText();

                    console.log(
                        `timeSendDownlink[${deviceID}]::`,
                        timeSendDownlink
                    );

                    const timeOffset =
                        Date.now() -
                        moment(
                            timeSendDownlink,
                            'hh:mm:ss DD/MM/YYYY'
                        ).valueOf();

                    console.log(`timeOffset[${deviceID}]::`, timeOffset);
                    console.log(`dateNow[${deviceID}]::`, Date.now());

                    if (timeOffset < 900000) {
                        dataCsv[deviceID][
                            dataCsv[deviceID].length - 1
                        ].timeSend = await timeSend.getText();
                    }
                    console.log('timeSend:::', await timeSend.getText());

                    break;
                } else {
                    const timeTotal = await driver.findElement(
                        By.xpath(tableRow5)
                    );

                    console.log('timeTotal::', await timeTotal.getText());

                    const timeReceived = await driver
                        .findElement(By.xpath(tableRow4))
                        .getText();

                    console.log('timeReceived::', timeReceived);

                    const timeOffset =
                        Date.now() -
                        moment(timeReceived, 'hh:mm:ss DD/MM/YYYY').valueOf();

                    if (startTime.getTime() < timeOffset) {
                        break;
                    }

                    if (timeTotal) {
                        dataCsv[deviceID][dataCsv[deviceID].length - 1][
                            'timeTotal(s)'
                        ] = (await timeTotal.getText()).slice(0, -1);
                    }
                }

                i++;
            }
            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(4000);

            if (retryCount == 0) {
                throw new Error(error.message);
            }
        }
    }
}

async function getDataCSV() {
    const arrFiles = fs.readdirSync('file_log').filter(function (file) {
        return /^log_data_.*\.csv$/.test(file);
    });

    for (const file of arrFiles) {
        const pathFile = `file_log/${file}`;

        const dataFile = fs.readFileSync(pathFile, 'utf8');

        const data = converter.csv2json(dataFile, {
            delimiter: { field: ';' },
        });

        const key = file.slice(9, file.length - 4);

        dataCsv[key] = data;
    }

    console.log('dataCsv::', dataCsv);
}

async function exportCSV() {
    for (const item in dataCsv) {
        const csvData = converter.json2csv(dataCsv[item]);

        const dataReplace = csvData.replace(/\,/g, ';');

        fs.writeFileSync(`file_log/log_data_${item}.csv`, dataReplace);
    }
}

initData();

// getDataCSV();

accessDeviceDataAndSendCommand();

// Listen for termination signals
{
    ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR2'].forEach((signal) => {
        process.on(signal, async () => {
            console.log(`Received ${signal}, gracefully shutting down...`);
            await exportCSV();
            process.exit(0);
        });
    });
}
