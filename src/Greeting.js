import _ from 'lodash'

const Greeting = (value) => {
    console.log(_.join(['un',' autre',' module', ' chargé'],' '));
    const element = document.createElement('div')
    const btn = document.createElement('button')
    btn.innerHTML = 'click to see message'
    btn.onclick = function () {
        const p = document.createElement('p')
        p.innerHTML = 'salut ' + value
        element.appendChild(p)
        //const a= ()=> console.log('salut');
        

    }
    element.appendChild(btn)
    return element

}
export default Greeting