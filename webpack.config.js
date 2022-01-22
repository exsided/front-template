const defaultConfig = require('./webpack.default.config.js');
const pagesList     = require('./webpack.config.pages-list.js');
const gradient      = require('gradient-string');
const coolGradient  = gradient(['#e91e63', 'crimson']);

if(process.env.ICON_NAME === 'watch')
	console.log(coolGradient(JSON.parse("\"┻┳|\\n┳┻| _\\n┻┳| •.•). i'm watching.....\\n┳┻|⊂ﾉ\\n┻┳\\n\"")));
else
	console.log(coolGradient(JSON.parse("\"{\\\\__/}\\n(●_●)\\n( > 🍪 Want a cookie?   \\n{\\\\__/}\\n(●_●)\\n( 🍪< No my cookie.\"")));

module.exports = [defaultConfig, pagesList];