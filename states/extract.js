const parse = require('svg-parser').parse
const getBounds = require('svg-path-bounds')
const fs = require('fs')

parsed = parse(fs.readFileSync('all.svg').toString())
states = parsed.children[0].children[2].children

for (let i = 0; i < states.length; i++) {
	states[i] = states[i].tagName == 'path' ? states[i] : states[i].children.filter(c => c.tagName == 'path')[0]
	let bounds = getBounds(states[i].properties.d)
	fs.writeFileSync('out/'+states[i].properties.id+'.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${bounds[0]} ${bounds[1]} ${bounds[2]-bounds[0]} ${bounds[3]-bounds[1]}"><path d="${states[i].properties.d}"></path></svg>`)
}
