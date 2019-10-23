import React,{useContext} from 'react'
import {PrescriptionContext} from '../../../../../contexts/PrescriptionContext'
import { Bar } from 'react-chartjs-2';

const Charts = ({
      jsbloodpressurevaluessystolic,
      jsbloodpressurevaluesdystolic,
      jsbloodsugarvaluesfast,
      jsbloodsugarvalues,
      jstime
}) => {
	// const {prescriptions} = useContext(PrescriptionContext)
      let checkupdates = jstime
      //Creating arrays for charts
      var graphcolorbloodpressuresystolic=[];
      var graphbordercolorbloodpressuresystolic=[];

      var graphcolorbloodpressuredystolic=[];
      var graphbordercolorbloodpressuredystolic=[];

      var graphcolorbloodsugarfast=[];
      var graphbordercolorbloodsugarfast=[];

      var graphcolorbloodsugar=[];
      var graphbordercolorbloodsugar=[];

      var bloodpressureexcess = 0;
      var bloodsugarexcess = 0;


      ///////////////////////////////
      //Conditions for graph colors//
      //////////////////////////////


      for(var i=0;i<jsbloodpressurevaluessystolic.length;i++)
      {
          if(jsbloodpressurevaluessystolic[i]<140 && jsbloodpressurevaluessystolic[i]>120)
          {
              graphcolorbloodpressuresystolic.push('rgba(77, 255, 77, 0.2)');
              graphbordercolorbloodpressuresystolic.push('rgba(77, 255, 77, 1)');
          }
          else
          {
              graphcolorbloodpressuresystolic.push('rgba(255, 99, 132, 0.2)');
              graphbordercolorbloodpressuresystolic.push('rgba(255, 99, 132, 1)');
              bloodpressureexcess++;
          }

      }

      for(var j=0;j<jsbloodpressurevaluesdystolic.length;j++)
      {
          if(jsbloodpressurevaluesdystolic[j]>80 && jsbloodpressurevaluesdystolic[j]<90)
          {
              graphcolorbloodpressuredystolic.push('rgba(77, 255, 77, 0.2)');
              graphbordercolorbloodpressuredystolic.push('rgba(77, 255, 77, 1)');
          }
          else
          {
              graphcolorbloodpressuredystolic.push('rgba(255, 99, 132, 0.2)');
              graphbordercolorbloodpressuredystolic.push('rgba(255, 99, 132, 1)');
              bloodpressureexcess++;
          }

      }

      for(var k=0;k<jsbloodsugarvaluesfast.length;k++)
      {
          if(jsbloodsugarvaluesfast[k]<100)
          {
              graphcolorbloodsugarfast.push('rgba(77, 255, 77, 0.2)');
              graphbordercolorbloodsugarfast.push('rgba(77, 255, 77, 1)');
          }
          else
          {
              graphcolorbloodsugarfast.push('rgba(255, 99, 132, 0.2)');
              graphbordercolorbloodsugarfast.push('rgba(255, 99, 132, 1)');
              bloodsugarexcess++;
          }

      }

      for(var l=0;l<jsbloodsugarvalues.length;l++)
      {
          if(jsbloodsugarvalues[l]<140)
          {
              graphcolorbloodsugar.push('rgba(77, 255, 77, 0.2)');
              graphbordercolorbloodsugar.push('rgba(77, 255, 77, 1)');
          }
          else
          {
              graphcolorbloodsugar.push('rgba(255, 99, 132, 0.2)');
              graphbordercolorbloodsugar.push('rgba(255, 99, 132, 1)');
              bloodsugarexcess++;
          }
      }

      let data1 = {
        labels:checkupdates,
        datasets: [{
            label: 'Blood Pressure(Systolic) Level(mmHg)',
            data:jsbloodpressurevaluessystolic,
            backgroundColor:graphcolorbloodpressuresystolic,
            borderColor: graphbordercolorbloodpressuresystolic,
            borderWidth: 1
        }]
      }

      let options1 = {
          title:{
                display:true,
                text:'Blood Pressure Systolic(mmHg) over the course of last 4 checkups'
          },
          legend:{
                display:false
          },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }

      let data2 = {
        labels:checkupdates,
        datasets: [{
            label: 'Blood Pressure(Dystolic) Level(mmHg)',
            data:jsbloodpressurevaluesdystolic,
            backgroundColor:graphcolorbloodpressuredystolic,
            borderColor: graphbordercolorbloodpressuredystolic,
            borderWidth: 1
        }]
      }

      let options2 = {
        title:{
            display:true,
            text:'Blood Pressure Dystolic(mmHg) over the course of last 4 checkups'
        },
        legend:{
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }

      let data3 = {
        labels:checkupdates,
        datasets: [{
            label: 'Blood Sugar(Fasting) Level',
            data:jsbloodsugarvaluesfast,
            backgroundColor:graphcolorbloodsugarfast,
            borderColor: graphbordercolorbloodsugarfast,
            borderWidth: 1
        }]
      }

      let options3 = {
        title:{
            display:true,
            text:'Blood Sugar Fasting(mg/dL) over the course of last 4 checkups'
        },
        legend:{
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      }

      let data4 = {
        labels:checkupdates,
        datasets: [{
            label: 'Blood Sugar(Non-Fasting) Level',
            data:jsbloodsugarvalues,
            backgroundColor:graphcolorbloodsugar,
            borderColor: graphbordercolorbloodsugar,
            borderWidth: 1
        }]
      }

      let options4 = {
        title:{
            display:true,
            text:'Blood Sugar Non-Fasting(mg/dL) over the course of last 4 checkups'
        },
        legend:{
            display:false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
      } 
      
	return(
            <div id="Charts">
            <Bar
              data={data1}
              width={110}
              height={70}
              options={options1}
            />
            <Bar
              data={data2}
              width={110}
              height={70}
              options={options2}
            />
            <Bar
              data={data3}
              width={110}
              height={70}
              options={options3}
            />
            <Bar
              data={data4}
              width={110}
              height={70}
              options={options4}
            />
            </div>
		)

}

export default Charts