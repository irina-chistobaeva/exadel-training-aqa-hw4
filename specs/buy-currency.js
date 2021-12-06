describe('Check app', function () {
    before('Login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/index.html?quick');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: true });
    })

    function waitForWriting(selector, index, timeout, amount) {
        return browser.waitUntil(
            async () => {
                const recordetAmountObj = await $(selector).getHTML(false);
                const amountObj = { num: amount };
                try {
                    await expect(JSON.parse(recordetAmountObj)[index]).toEqual(amountObj);
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
        await waitForWriting('script#database', 0, 5000, '1');
        await $('#sum-to-buy').setValue('2');
        await waitForWriting('script#database', 1, 5000, '2');
        await $('#sum-to-buy').setValue('3');
        await waitForWriting('script#database', 2, 5000, '3');
        await $('#sum-to-buy').setValue('4');
        await waitForWriting('script#database', 3, 5000, '4');
        await $('//button[contains(.,"Buy")]').click();
        const rate = await $('#currency-rate').getText();
        const resultStr = await $('#withdrew').getText();
        const result = +resultStr.replace('1234 => ', '');
        await expect(result).toEqual(1234 * rate);
    });
});