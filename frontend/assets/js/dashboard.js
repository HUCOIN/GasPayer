$(document).ready(function () {
    var ctx = document.getElementById("allVulnerabilities").getContext("2d");
    var chart = new Chart(ctx, {
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["Passed", "Critical", "Dangerous", "Low Risk"],
            datasets: [{
                label: 'Total Vulnerabilities',
                backgroundColor: ['rgb(50,205,50)', 'rgb(220, 20, 60)', 'rgb(255,140,0)', 'rgb(255, 215, 0)'],
                borderColor: 'rgb(255, 255, 255)',
                data: [500, 100, 30, 40]
            }]
        },

        // Configuration options go here
        options: {}
    })
    var ctx2 = document.getElementById('day').getContext('2d');
    var chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: ['Monday', 'Sunday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45],
                fill: false
            }]
        },

        // Configuration options go here
        options: {}
    });
})