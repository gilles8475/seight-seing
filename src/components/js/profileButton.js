import PathProfil from "./PathProfil"
import calculProfile from "./calculProfile"

const ProfileButton = (trajet) => {
    const but = document.createElement('button')
    but.classList.add('button')
    but.innerHTML = "Show Profile"
    but.onclick = () => {
        calculProfile(trajet)
    }
    document.getElementById('control').appendChild(but)

}
export default ProfileButton