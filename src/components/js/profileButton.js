import calculProfile from "./calculProfile"
import sampling from './sampling'
const ProfileButton = (trajet) => {
    const but = document.createElement('button')
    //but.classList.add('btn-danger')
    but.innerHTML = "Show Profile"
    but.onclick = () => {
        calculProfile(trajet,sampling)
    }
    //document.getElementById('control').appendChild(but)
    return but

}
export default ProfileButton