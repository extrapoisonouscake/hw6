export default function resizeWindow(x?:number, y?:number){
	window.innerWidth = x || window.innerWidth;
	window.innerHeight = y || window.innerHeight;
	window.dispatchEvent(new Event('resize'));
  }