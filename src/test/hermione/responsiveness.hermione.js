
const {pages} = require('./constants.js')
const sizes = [[1920,1080],[570,850],[1366,768],[1536,864]]
describe('Адаптивность', async function() {
    for(const [width,height] of sizes){
	it(`Адаптирован для ${width}x${height}`,async function(){
		await this.browser.setWindowSize(width,height)
      for(const page of pages){
        await this.browser.url(`http://localhost:3000/hw/store/${page}`);
        await this.browser.assertView(`size${width}-${page}`,'.Application')
	  }
    })
}
});
