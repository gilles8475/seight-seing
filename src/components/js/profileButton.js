import calculProfile from "./calculProfile"

const ProfileButton = (trajet) => {
    const but = document.createElement('button')
    //but.classList.add('btn-danger')
    but.innerHTML = "Show Profile"
    but.onclick = () => {
        calculProfile(trajet)
    }
    //document.getElementById('control').appendChild(but)
    return but

}
export default ProfileButton