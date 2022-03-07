import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import sample_events from "../sample_data/sample_events"

function BarChart ({google}) {
    const [chart, setChart] = useState(null);
    const [dimensions, setDimensions] = useState({ 
      height: 0,
      width: 0
    })
    useEffect(() => {
      if (google && !chart) {

        // Calculate total duration spent per activity in minutes
        function totalDurationInMins(duration) {
            var durationInMins = duration / (1000 * 60);
            return durationInMins;
        }

        let events = sample_events["sample_events"];

        // Create the data table.
        var totalDuration = {};
        const data = new google.visualization.DataTable();
        data.addColumn({ type: 'string', id: 'Events' });
        data.addColumn({ type: 'number', id: 'Duration' });
            events.forEach(event => {
                if (event.activityName in totalDuration)
                    {
                        totalDuration[event.activityName] = totalDuration[event.activityName] + totalDurationInMins(event.duration);
                    }
                else 
                    {
                        totalDuration[event.activityName] = totalDurationInMins(event.duration)
                    } 
                   
                }
            );

            console.log(totalDuration);
            
            for (const key in totalDuration) {
                console.log(`${key}: ${totalDuration[key]}`);
                data.addRow([key, totalDuration[key]]);
              }

        // Set chart options
        var options = {
        title: 'Total Time Spent Doing Activity',
        legend: 'none',
        chartArea: {width: '75%'},
        hAxis: {title: 'Total Duration'},
        vAxis: {title: 'Event'},
        legend: {position: 'none'}
        };

        // Create a range slider, passing some options
        var categoryFilter = new google.visualization.ControlWrapper({
          'controlType': 'CategoryFilter',
          'containerId': 'dropdown_div',
          'options': {
            'filterColumnIndex': 0
          }
        });

      // Create a Bar chart, passing some options
      var barChartOptions = {
        width: 700,
        height: 200,
        legend: 'none'
    };

      var barChart = new google.visualization.ChartWrapper({
        'chartType': 'BarChart',
        'containerId': 'chart_div',
        'options': barChartOptions,
       
      });

    // Instantiate and draw our dashboard and chart, passing in some options.
    var dashboard = new google.visualization.Dashboard(document.getElementById('barchart_div'));
    dashboard.bind(categoryFilter, barChart);
    dashboard.draw(data,options);

    function resize () {
      console.log("called barchart resize");
      const chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      barChartOptions.width = .4 * window.innerWidth;
      //barChartOptions.height = .4 * window.innerHeight;
      dashboard.draw(data, options);
    }

    window.onload = resize;
    window.onresize = resize;
  }

    // // The select handler. Call the chart's getSelection() method
    // function selectHandler() {
    //   var selectedItem = chart.getSelection()[0];
    //   if (selectedItem) {
    //     var topping = data.getValue(selectedItem.row, 0);
    //     alert('The user selected ' + topping);
    //   }
    // }
    // // Listen for the 'select' event, and call my function selectHandler() when
    // // the user selects something on the chart.
    // google.visualization.events.addListener(chart, 'select', selectHandler);  
    
}, [google, chart]);

  return (
    <>
    <div>
      <h1>Bar Chart</h1>
      <p> This is a simple Next.js page showing an interavtive and responsive Bar Chart. It shows the number of minutes the user spent doing various activities.</p>
    </div>
      {!google && <Spinner />}
      <div id="barchart_div">
        <div id="dropdown_div"></div>
        <div id="chart_div" className={!google ? 'd-none' : ''}/>
      </div>
    </>
  )
}
  export default BarChart; 