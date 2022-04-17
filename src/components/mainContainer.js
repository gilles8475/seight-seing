const createContainer= (type='div',id,bs_class) => {
    //bs_class is the bootstrap class of the element
    const divElem=document.createElement(type)
    divElem.id=id
    divElem.classList.add(bs_class)
    return divElem
}
export default createContainer