describe('Check app', function () {
    before('Login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    function waitForSorting(selector, timeout) {
        return browser.waitUntil(
            async () => await $(selector).isDisplayed(),
            {
                timeout: timeout,
                timeoutMsg: `Expected sorting is different after ${timeout} ms`
            });
    }

    function compareAsc(a, b) {
        return a - b;
    }

    function compareDesc(a, b) {
        return b - a;
    }

    it('Sort and check Id column - ascending', async function () {
        await $('//div[@tabulator-field="id" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="asc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="id" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const itemsToNum = items.map((item) => {
            return +item;
        });
        const properlySortedArr = Array.from(itemsToNum).sort(compareAsc);
        await expect(itemsToNum).toEqual(properlySortedArr);
    });

    it('Sort and check Id column - descending', async function () {
        await $('//div[@tabulator-field="id" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="desc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="id" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const itemsToNum = items.map((item) => {
            return +item;
        });
        const properlySortedArr = Array.from(itemsToNum).sort(compareDesc);
        await expect(itemsToNum).toEqual(properlySortedArr);
    });

    it('Sort and check Name column - ascending', async function () {
        await $('//div[@tabulator-field="name" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="asc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="name" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const properlySortedArr = Array.from(items).sort();
        await expect(items).toEqual(properlySortedArr);
    });

    it('Sort and check Name column - descending', async function () {
        await $('//div[@tabulator-field="name" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="desc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="name" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const properlySortedArr = Array.from(items).sort(compareDesc);
        await expect(items).toEqual(properlySortedArr);
    });

    it('Sort and check Age column - ascending', async function () {
        await $('//div[@tabulator-field="age" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="asc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="age" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const itemsToNum = items.map((item) => {
            return +item;
        });
        const properlySortedArr = Array.from(itemsToNum).sort(compareAsc);
        await expect(itemsToNum).toEqual(properlySortedArr);
    });

    it('Sort and check Age column - descending', async function () {
        await $('//div[@tabulator-field="age" and @role="columnheader"]').click();
        await waitForSorting('//div[@aria-sort="desc"]', 3000);
        const itemsList = await $$('//div[@tabulator-field="age" and @role="gridcell"]');
        const sortedItemsList = itemsList.map(async (item) => {
            return await item.getText();
        });
        const items = await Promise.all(sortedItemsList);
        const itemsToNum = items.map((item) => {
            return +item;
        });
        const properlySortedArr = Array.from(itemsToNum).sort(compareDesc);
        await expect(itemsToNum).toEqual(properlySortedArr);
    });
});