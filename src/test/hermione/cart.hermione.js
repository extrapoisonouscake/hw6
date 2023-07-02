const {bugID} = require('./constants.js')
const TESTING_ITEM_ID = 0
describe('Страница корзины', async function() {
    it('содержимое корзины должно сохраняться между перезагрузками страницы',async function(){
      
        await this.browser.url(`http://localhost:3000/hw/store/catalog/${TESTING_ITEM_ID}${bugID ? `?bug_id=${bugID}` : ''}`);
        await this.browser.execute('localStorage.clear()')
        
      const addToCartButton = await this.browser.$('.ProductDetails-AddToCart')
       await addToCartButton.waitForExist({timeout:5000})
        await addToCartButton.click()
        await this.browser.url(`http://localhost:3000/hw/store/cart${bugID ? `?bug_id=${bugID}` : ''}`);
        await this.browser.refresh()
        const expectedElement = await this.browser.$(`.Cart-Table tbody tr[data-testid="${TESTING_ITEM_ID}"]`)
        await expectedElement.waitForExist({timeout:5000})
      
    })
});
