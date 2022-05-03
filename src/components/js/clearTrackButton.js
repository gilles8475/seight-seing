const clearTrackButton = (trajet) => {
    const but = document.createElement('button')
    //but.classList.add('btn', 'btn-warning')
    but.innerHTML = "Clear Track"
    but.onclick = () => {
        trajet.path = []
        trajet.refresh()
    }
    return but
}
export default clearTrackButton