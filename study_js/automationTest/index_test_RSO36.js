const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');
require('dotenv').config();
const converter = require('json-2-csv');
const moment = require('moment'); // require

const dataCsv = {};

let startTime = new Date();

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

        const rawDataID = fs.readFileSync('./list_device.csv', {
            encoding: 'utf8',
        });

        const dataID = handleDataRaw(rawDataID);

        await driver.sleep(2000);

        await startSetTimeout(driver, dataID);
    } finally {
        // await driver.quit();

        console.log(dataCsv);

        console.log('Bye');
    }
}

function handleDataRaw(params) {
    const strArr = params.split('\r\n');
    strArr.pop();
    strArr.shift();

    return strArr.map((value) => value.slice(5));
}

async function startSetTimeout(driver, dataID) {
    startTime = new Date();

    for (const item of dataID) {
        if (!dataCsv[item]) {
            dataCsv[item] = [];
        }

        await findDeviceAndSendCommand(driver, item);
    }

    const timeSleep = 120000 - (new Date().getTime() - startTime.getTime());

    await driver.sleep(timeSleep);

    for (const item of dataID) {
        if (!dataCsv[item]) {
            dataCsv[item] = [];
        }

        await findDeviceAndCheckCommand(driver, item);
    }

    const timeNextAction =
        900000 - (new Date().getTime() - startTime.getTime());

    console.log(timeNextAction);

    setTimeout(async () => {
        await startSetTimeout(driver, dataID);
    }, timeNextAction);
}

async function findDeviceAndSendCommand(driver, item) {
    dataCsv[item].push({
        deviceID: `LTE-${item}`,
        timeSend: '',
        'timeTotal(s)': '',
        relay: '',
        status: '',
    });
    await findDeviceTest(driver, item);

    if (dataCsv[item][dataCsv[item].length - 1].status == 'active') {
        await sendCommand(driver, item);
    }
}

async function findDeviceAndCheckCommand(driver, item) {
    await findDeviceTest(driver, item);
    await getData(driver, item);
}

async function findDeviceTest(driver, item) {
    let flagError = false;
    let retryCount = 5;

    let page = 1;

    while (retryCount > 0 && !flagError) {
        try {
            if (page === 1) {
                await driver
                    .navigate()
                    .to(`http://${process.env.APP_HOST}/app/#/admin/devices`);

                await driver.sleep(5000);
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
                    .sendKeys(item);

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
                dataCsv[item][dataCsv[item].length - 1].status = 'in-active';
            } else {
                dataCsv[item][dataCsv[item].length - 1].status = 'active';
            }

            console.table(dataCsv[item]);
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
            const configBtn = await driver.findElement(By.css('i.fa.fa-cogs'));
            configBtn.click();

            await driver.sleep(2000);
            const switchBtn = await driver.findElement(
                By.css('.modal.fade.in.show .form-group ui-switch button')
            );

            await switchBtn.click();

            dataCsv[item][dataCsv[item].length - 1].relay =
                await switchBtn.getText();

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
            '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[3]/button[1]'
        )
    );

    const titleSave = await saveBtn.getText();

    if (titleSave !== 'Sauvegarder') {
        saveBtn = await driver.findElement(
            By.xpath(
                '//*[@id="wrapper"]/app-device-detail/div[8]/div/div/div[3]/button[2]'
            )
        );
    }

    saveBtn.click();

    await driver.sleep(2000);
    const swalConfirm = await driver.findElement(
        By.css('.swal2-actions .swal2-confirm')
    );

    await swalConfirm.click();
    await driver.sleep(2000);
}

async function getData(driver, item) {
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

                console.log(await elm.getText());

                const textElm = await elm.getText();
                if (textElm === 'Downlink') {
                    const timeSend = await driver.findElement(
                        By.xpath(tableRow4)
                    );

                    console.log(await timeSend.getText());
                    const timeSendDownlink = await timeSend.getText();

                    const timeOffset =
                        Date.now() -
                        moment(
                            timeSendDownlink,
                            'hh:mm:ss DD/MM/YYYY'
                        ).valueOf();

                    if (timeOffset < 240000) {
                        dataCsv[item][dataCsv[item].length - 1].timeSend =
                            await timeSend.getText();
                    }
                    console.log('timeSend:::', await timeSend.getText());
                    console.table(dataCsv[item]);

                    break;
                } else {
                    const timeTotal = await driver.findElement(
                        By.xpath(tableRow5)
                    );
                    console.log(await timeTotal.getText());

                    const timeReceived = await driver.findElement(
                        By.xpath(tableRow4)
                    );

                    console.log(await timeReceived.getText());
                    if (
                        startTime.getTime() <
                        new Date(await timeReceived.getText()).getTime()
                    ) {
                        break;
                    }

                    if (timeTotal) {
                        dataCsv[item][dataCsv[item].length - 1][
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

    await exportCSV();
}

async function exportCSV() {
    for (const item in dataCsv) {
        const csvData = converter.json2csv(dataCsv[item]);

        csvData.replace(/\,/, ';');

        fs.writeFileSync(`file_log/log_data_${item}.csv`, csvData);
    }
}

accessDeviceDataAndSendCommand();

// Listen for termination signals
['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGUSR2'].forEach((signal) => {
    process.on(signal, async () => {
        console.log(`Received ${signal}, gracefully shutting down...`);
        await exportCSV();
        process.exit(0);
    });
});
