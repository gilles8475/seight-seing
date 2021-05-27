import Chart from 'chart.js/auto'

let createChartElement = new Promise((res, rej) => {
    const myCanvas = document.createElement('canvas')

    
    res(document.body.appendChild(myCanvas))


})




const PathProfil = (idref) => {
    //---------------
    createChartElement.then(el => {
        el.style.width = "500px"
        el.style.height = "400px"
        el.id = idref
        var myChart = new Chart(el, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
        console.log(el)
        return el
    })
        .catch(err => console.log('ya un blem'))
    








}
export default PathProfil