import Chart from 'chart.js/auto'

const createChartElement = (id) => {
    if (document.getElementById(id)) {
        console.log("deleting canvas")
        //remove existing div element if exists
        document.getElementById(id).remove()
    }
    const myPromise = new Promise((res, rej) => {
        console.log('creating canvas');
        let canvasContainer = document.createElement('div')
        
        let myCanvas = document.createElement('canvas')

        canvasContainer.appendChild(myCanvas)

        res([myCanvas, canvasContainer])

    })
    return myPromise
}



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

const PathProfil = (data, idref,trajetRef, width = '500px', height = '800px') => {
    let [aBs, oRd] = data
    const config = {
        type: 'line',
        data: {
            labels: aBs,
            datasets: [{
                label: 'Profil altimétrique',
                data: oRd,
                borderColor: 'rgb(75,192,192)',
                tension: 0.1
            }]

        }
        ,
        options: {
            interaction: {
                mode: 'index',
                intersect:false,
            },
            aspectRatio:1.2,
            decimation:{
                enabled:true,
                algorithm:'lttb',
                samples: 10,
            },
            plugins: {
                title: {
                    display: true,
                    text: (ctx) => 'Profil altimétrique',
                },
                tooltip: {
                    usePointStyle: true,
                    callbacks: {
                      
                        labelPointStyle: function(context){
                            return {
                                pointStyle:'triangle',
                                rotation:0
                            };

                        },
                        footer: function (context) {
                            //console.log(context)
                            //return 'zob'
                            //return (context[0].formattedValue)
                        },
                        title: function (context) {
                            return 'slope'
                        },
                        label: function (context) {
                            let i = context.dataIndex
                            let y1 = context.raw
                            let x1 = context.label
                            let y2 = context.dataset.data[i + 1]
                            let x2 = aBs[i + 1]
                            let slope = 100 * (y2 - y1) / (x2 - x1)
                            
                            // console.log('data index', context.dataIndex)
                            let l=context.formattedValue //abscisse ie lenth on the path
                            trajetRef.setOdoMarker(x1.valueOf())
                            
                            return ([slope.toFixed(1) + '%', "z: "+l])
                        }
                    }
                }
            }
        }

    }


    createChartElement(idref).then(([canvas, container]) => {
        const rootDiv = document.getElementById('root')
        container.id = idref
        container.style.width = width
        container.style.height = height
        let myChart = new Chart(canvas, config)
        rootDiv.appendChild(container)
        return container
    }
    )
        .catch(err => console.log("il y a un blem: ", err))
}

export default PathProfil