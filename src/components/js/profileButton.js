import calculProfile from "./calculProfile"
const sampling = 1000 // put here the sampling value for vertical profile. Example : 200 means one point each 200m
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