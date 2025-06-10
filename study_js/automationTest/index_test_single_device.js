const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
require('dotenv').config();
const converter = require('json-2-csv');
const moment = require('moment'); // require

const dataCsv = {};

let startTime = new Date();

const deviceID = '000000016112345';

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

        await driver.sleep(2000);

        await startSetTimeout(driver);
    } finally {
        // await driver.quit();

        console.log(dataCsv);

        console.log('Bye');
    }
}

async function startSetTimeout(driver) {
    startTime = new Date();

    if (!dataCsv[deviceID]) {
        dataCsv[deviceID] = [];
    }

    await findDeviceAndSendCommand(driver);

    await findDeviceAndCheckCommand(driver);

    const timeNextAction =
        300000 - (new Date().getTime() - startTime.getTime());

    console.log(`Waiting:: ${timeNextAction / 60000} minutes`);

    setTimeout(async () => {
        await startSetTimeout(driver);
    }, timeNextAction);
}

async function findDeviceAndSendCommand(driver) {
    dataCsv[deviceID].push({
        deviceID: `LTE-${deviceID}`,
        timeSend: '',
        'timeTotal(s)': '',
        status: '',
    });

    await findDeviceTest(driver);

    if (dataCsv[deviceID][dataCsv[deviceID].length - 1].status == 'active') {
        await sendCommand(driver, deviceID);
    }
}

async function findDeviceAndCheckCommand(driver) {
    await findDeviceTest(driver);
    await getData(driver, deviceID);
}

async function findDeviceTest(driver) {
    let flagError = false;
    let retryCount = 3;

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

            console.table(dataCsv[deviceID]);
            await driver.sleep(2000);

            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(2000);

            if (retryCount == 0) {
                throw new Error(error.message);
            }
        }
    }
}

async function sendCommand(driver, item) {
    let flagError = false;
    let retryCount = 3;

    while (retryCount > 0 && !flagError) {
        try {
            const configBtn = await driver.findElement(
                By.xpath('//*[@id="activity"]/div[1]/div[2]/div/button[2]')
            );
            configBtn.click();

            await driver.sleep(2000);
            const commandInput = await driver.findElement(
                By.xpath(
                    '//*[@id="wrapper"]/app-device-detail/div[3]/div/div/div[2]/div/div/div[1]/div/div/div/input'
                )
            );

            await commandInput.sendKeys('090305001B00CCCC');

            flagError = true;
        } catch (error) {
            retryCount--;
            console.log('message:::', error.message);
            console.log('Retry:::', retryCount);
            await driver.sleep(2000);

            if (retryCount == 0) {
                dataCsv[item][dataCsv[item].length - 1].relay = '';
                throw new Error(error.message);
            }
        }
    }

    await driver.sleep(2000);

    let saveBtn = await driver.findElement(
        By.xpath(
            '//*[@id="wrapper"]/app-device-detail/div[3]/div/div/div[3]/button[1]'
        )
    );

    const titleSave = await saveBtn.getText();

    console.log(titleSave);

    await saveBtn.click();

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
                dataCsv[item][dataCsv[item].length - 1].relay = '';
                throw new Error(error.message);
            }
        }
    }

    await driver.sleep(2000);
}

async function getData(driver, item) {
    let i = 1;

    while (i <= 20) {
        const elm = await driver.findElement(
            By.xpath(
                `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[3]`
            )
        );

        const textElm = await elm.getText();

        if (textElm === 'Downlink') {
            const timeSend = await driver.findElement(
                By.xpath(
                    `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[4]`
                )
            );

            const timeSendDownlink = await timeSend.getText();

            const timeOffset =
                Date.now() -
                moment(timeSendDownlink, 'hh:mm:ss DD/MM/YYYY').valueOf();

            if (timeOffset < 240000) {
                dataCsv[item][dataCsv[item].length - 1].timeSend =
                    await timeSend.getText();
            }
            console.log('timeSend:::', await timeSend.getText());

            break;
        } else {
            const timeTotal = await driver.findElement(
                By.xpath(
                    `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[5]`
                )
            );

            const timeReceived = await driver.findElement(
                By.xpath(
                    `//*[@id="activity"]/div[1]/div[3]/div[1]/table/tbody[${i}]/tr/td[4]`
                )
            );

            if (
                startTime.getTime() <
                new Date(await timeReceived.getText()).getTime()
            ) {
                break;
            }

            if (timeTotal) {
                dataCsv[item][dataCsv[item].length - 1]['timeTotal(s)'] = (
                    await timeTotal.getText()
                ).slice(0, -1);
            }
        }

        i++;
    }
    await exportCSV();
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
}

async function exportCSV() {
    for (const item in dataCsv) {
        const csvData = converter.json2csv(dataCsv[item]);

        const dataReplace = csvData.replace(/\,/g, ';');

        fs.writeFileSync(`file_log/log_data_${item}.csv`, dataReplace);
    }
}

getDataCSV();
accessDeviceDataAndSendCommand();

// Listen for termination signals
['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR2'].forEach((signal) => {
    process.on(signal, async () => {
        console.log(`Received ${signal}, gracefully shutting down...`);
        await exportCSV();
        process.exit(0);
    });
});
