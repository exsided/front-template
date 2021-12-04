import '@/blocks/footer/footer.js';
import '@/assets/scss/main.scss';

console.log('main: any');

class Rectangle
{
	constructor(height, width)
	{
		this.height = height;
		this.width = width;
	}
}

let p = new Rectangle();

console.log(p);