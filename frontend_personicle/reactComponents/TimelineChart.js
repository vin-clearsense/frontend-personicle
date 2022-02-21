import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import sample_events from "../sample_data/sample_events"

function TimelineChart ({google}) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (google && !chart) {

      // Create functions 
      function endDateInMilliseconds(startDate, duration) {
        var startDate = new Date(startDate); // some mock date
        console.log(startDate);
        var startDateInMS = startDate.getTime(); 
        //console.log("startDateInMS " + startDateInMS);
        var endDateInMS = startDateInMS + duration
        //console.log("endDateInMS " + endDateInMS);
        return endDateInMS;
     }

     
     let events = sample_events["sample_events"];
     console.log(events);
     var endDate = endDateInMilliseconds(events[0].startTime, events[0].duration);

     function GFG_Fun(endDateInMS) {
            var endDate = new Date(endDateInMS);
            //console.log("endDate " + endDate);
            return endDate;
        }

    GFG_Fun(endDate);

      // Create the data table.
      
      const data = new google.visualization.DataTable();
      data.addColumn({ type: 'string', id: 'Events' });
      data.addColumn({ type: 'string', id: 'Task ID' });
      data.addColumn({ type: 'date', id: 'Start Date' });
      data.addColumn({ type: 'date', id: 'End Date' });
          events.forEach(event => 
          {
            data.addRow([event.activityName, event.logId.toString(), new Date(event.startTime), GFG_Fun(endDateInMilliseconds(event.startTime, event.duration))]);
          });
  

      // Set chart options
      var options = {'title':'Gantt Chart Timeline Visualization',
                    'width':500,
                    'height':300,
                    timeline: { groupByRowLabel: true}, 
                    displayAnnotations: true};

      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.Timeline(document.getElementById('timeline'));
      newChart.draw(data, options);

      setChart(newChart);
    }
  }, [google, chart]);

  return (
    <>
    <div>
      <h1>Event Timeline</h1>
    </div>
      {!google && <Spinner />}
      <div id="timeline" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default TimelineChart;