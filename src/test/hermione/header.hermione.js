const {bugID} = require('./constants.js')

describe('Шапка сайта', async function() {
    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function() {
        await this.browser.setWindowSize(575, 900)
        await this.browser.url(`http://localhost:3000/hw/store${bugID ? `?bug_id=${bugID}` : ''}`);

        await this.browser.assertView('plain', '.navbar');
        await this.browser.refresh()
    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться',async function(){
        await this.browser.setWindowSize(575, 900)
        await this.browser.url(`http://localhost:3000/hw/store${bugID ? `?bug_id=${bugID}` : ''}`);

        await this.browser.$('.navbar-toggler').click()
        const navCollapse = await this.browser.$('.navbar-collapse')
        const firstLink = await this.browser.$('.navbar-nav a:first-child')
        await firstLink.click()
        const cssDisplayValue = await navCollapse.getCSSProperty('display')
        expect(cssDisplayValue.value).toBe('none')
        await this.browser.refresh()
        
        
    })
    it('в каталоге должны отображаться товары, список которых приходит с сервера', async function ()  {
        await this.browser.url('http://localhost:3000/hw/store/catalog');
        const cards = await this.browser.$$('.ProductItem.card');

        for(let i = 0; i < cards.length; i++){
            const card = cards[i]
            const name = await card.$('.ProductItem-Name.card-title').getText();
            expect(name).toBeTruthy()
        }
        await this.browser.refresh()
    })
});
