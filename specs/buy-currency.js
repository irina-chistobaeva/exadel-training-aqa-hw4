describe('Check app', function () {
    before('Login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    let amountArr = [];
    function waitForWriting(selector, timeout, amount) {
        amountArr.push({ num: amount });
        return browser.waitUntil(
            async () => {
                const recordedAmountArr = await $(selector).getHTML(false);
                try {
                    await expect(JSON.parse(recordedAmountArr)).toEqual(amountArr);
                }
                catch {
                    return false;
                }
                return true;
            },
            {
                timeout: timeout,
                timeoutMsg: `Expected amount is different after ${timeout} ms`
            });
    }

    it('Buy currency: 1234', async function () {
        await $('#sum-to-buy').setValue('1');
        await waitForWriting('script#database', 5000, '1');
        await $('#sum-to-buy').setValue('2');
        await waitForWriting('script#database', 5000, '2');
        await $('#sum-to-buy').setValue('3');
        await waitForWriting('script#database', 5000, '3');
        await $('#sum-to-buy').setValue('4');
        await waitForWriting('script#database', 5000, '4');
        await $('//button[contains(.,"Buy")]').click();
        const rate = await $('#currency-rate').getText();
        const resultStr = await $('#withdrew').getText();
        const result = +resultStr.replace('1234 => ', '');
        await expect(result).toEqual(1234 * rate);
    });
});