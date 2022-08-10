const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then(function(data){
  console.log(data);
  let metadata = data.metadata;
  let datanames = data.names;
  let datasamples = data.samples;

  function BubbleChart(id){
    for (let n = 0; n < datanames.length; n++){
      if (id == datanames[n]){
        let sample_values = datasamples[n].sample_values;
        let otu_ids = datasamples[n].otu_ids;
        let otu_labels = datasamples[n].otu_labels;
        let data = [{
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          text: otu_labels,
          marker: {
            size: sample_values,
            color: otu_ids
          }
        }];
        Plotly.newPlot("bubble", data);
        break;
      };
    };

  };
  
  function BarChart(id){
    for (let n = 0; n < datanames.length; n++){
      if (id == datanames[n]){
        let sample_values = datasamples[n].sample_values.slice(0, 10);
        let temp = datasamples[n].otu_ids.slice(0, 10);
        let otu_ids = temp.map(function (x) {
          return "OTU " + x;
        });
        let otu_labels = datasamples[n].otu_labels.slice(0, 10);
        let data = [{
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        transforms: [{
          type: 'sort',
          target: 'x',
          order: 'ascending'
        }],
        orientation: 'h'
        }];
        Plotly.newPlot("bar", data);
        break;
      };
    };
    console.log(`This function generates bar chart of ${id} `);
  };
  
  function SummaryChart(id){
    d3.select("sample_data").selectAll("p").remove();
    for (let n = 0; n < datanames.length; n++){
      if (id == datanames[n]){
        d3.select("sample_data").append("p").text(`id: ${metadata[n].id}`);
        d3.select("sample_data").append("p").text(`ethnicity: ${metadata[n].ethnicity}`);
        d3.select("sample_data").append("p").text(`gender: ${metadata[n].gender}`);
        d3.select("sample_data").append("p").text(`age: ${metadata[n].age}`);
        d3.select("sample_data").append("p").text(`location: ${metadata[n].location}`);
        d3.select("sample_data").append("p").text(`bbtype: ${metadata[n].bbtype}`);
        d3.select("sample_data").append("p").text(`wfreq: ${metadata[n].wfreq}`);
      };
    };
    console.log(`Here is information about ${id} `);
  };
  
  function init(){
    let dropdownOCI = d3.select("DataSet");
    for (let n = 0; n < datanames.length; n++){
      dropdownOCI.append("option").text(datanames[n]).attr("OCI_value", datanames[n]);
    };
    BubbleChart('940');
    BarChart('940');
    SummaryChart('940');
  };
  init();
});