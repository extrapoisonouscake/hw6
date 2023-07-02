const {bugID} = require('./constants.js')
const testsData = [
	["Главная страница",""],["Страница каталога","catalog"],["Страница условий","delivery"],["Страница контактов","contacts"]
]
describe('Доступность страниц сайта',function(){
	let i = 0;
	for(const testData of testsData){
		it(`${testData[0]} должна существовать`,async function(){
		await this.browser.url(`http://localhost:3000/hw/store/${testData[1]}${bugID ? `?bug_id=${bugID}` : ''}`);
		const body = await this.browser.$('body')
		const text = await body.getText()
		expect(text).not.toContain(`Cannot GET /hw/store/${testData[1]}`)
	})
}
})