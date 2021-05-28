import Chart from 'chart.js/auto'

let createChartElement = new Promise((res, rej) => {
    const canvasContainer = document.createElement('div')
    const myCanvas = document.createElement('canvas')

    canvasContainer.appendChild(myCanvas)

    //res(document.body.appendChild(myCanvas))
    res([myCanvas, canvasContainer])

})


const graphicObject = {
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

}

const PathProfil = (idref, width='500px',height='500px') => {
    createChartElement.then(([canvas, container]) => {
        container.id = idref
        container.style.width = width
        container.style.height = height
        const myChart = new Chart(canvas, graphicObject)
        document.body.appendChild(container)
        return container
    }
    )
}

export default PathProfil