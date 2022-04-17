const createContainer = (type = 'div', id, bs_class) => {
    //bs_class is the bootstrap class of the element
    const divElem = document.createElement(type)
    divElem.id = id
    let _bs_class = bs_class.split(" "); //on peut avoir des espaces dans bs_class, il faut donc décomposer pour pouvoir attibuer chacune de ces classes
    _bs_class.forEach(el => {
        divElem.classList.add(el)

    })
    return divElem
}
export default createContainer