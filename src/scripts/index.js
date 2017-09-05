/*  eslint-disable no-undef */
const backgroundColor = [
  'rgba(0,163,210, .6)',
  'rgba(125,191,196, .6)',
  'rgba(35,61,99, .6)',
  'rgba(130,127,132, .6)',
];

const borderColor = [
  'rgba(0,163,210, 1)',
  'rgba(125,191,196, 1)',
  'rgba(35,61,99, 1)',
  'rgba(130,127,132, 1)',
];

const chart2011 = {
  labels: ['CSS', 'JavaScript', 'PHP: WordPress, Symfony', 'Phonegap'],
  datasets: [{
    label: '# of Votes',
    data: [30, 30, 20, 10],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2012 = {
  labels: ['CSS', 'JavaScript', 'PHP: WordPress, Symfony', 'Phonegap'],
  datasets: [{
    label: '# of Votes',
    data: [30, 40, 10, 20],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2013 = {
  labels: ['CSS', 'JavaScript', 'PHP: WordPress', 'Ruby on Rails'],
  datasets: [{
    label: '# of Votes',
    data: [35, 20, 35, 10],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2014 = {
  /*  eslint-disable no-script-url */
  labels: ['CSS', 'JavaScript: AngularJS, PhaserJS', 'PHP: WordPress', 'Ruby on Rails'],
  datasets: [{
    label: '# of Votes',
    data: [40, 40, 10, 10],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2015 = {
  /*  eslint-disable no-script-url */
  labels: ['CSS', 'JavaScript: reactJS', 'PHP: WordPress', 'Ruby on Rails'],
  datasets: [{
    label: '# of Votes',
    data: [40, 20, 20, 20],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2016 = {
  /*  eslint-disable no-script-url */
  labels: ['CSS', 'JavaScript: AngularJS, reactJS', 'Scala: Play'],
  datasets: [{
    label: '# of Votes',
    data: [50, 40, 10],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

const chart2017 = {
  /*  eslint-disable no-script-url */
  labels: ['CSS', 'JavaScript: AngularJS', 'Scala: Play'],
  datasets: [{
    label: '# of Votes',
    data: [60, 30, 10],
    backgroundColor,
    borderColor,
    borderWidth: 1,
  }],
};

document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('js_techChart');
  const button2011 = document.getElementById('js_techChart2011');
  const button2012 = document.getElementById('js_techChart2012');
  const button2013 = document.getElementById('js_techChart2013');
  const button2014 = document.getElementById('js_techChart2014');
  const button2015 = document.getElementById('js_techChart2015');
  const button2016 = document.getElementById('js_techChart2016');
  const button2017 = document.getElementById('js_techChart2017');

  const techChart = new Chart(ctx, {
    type: 'doughnut',
    options: {
      'animation.animateRotate': true,
      cutoutPercentage: 50,
    },
    data: chart2017,
  });

  const updateChart = (data) => {
    techChart.data = data;
    techChart.update(1000, false);
  };

  button2011.addEventListener('click', () => updateChart(chart2011));
  button2012.addEventListener('click', () => updateChart(chart2012));
  button2013.addEventListener('click', () => updateChart(chart2013));
  button2014.addEventListener('click', () => updateChart(chart2014));
  button2015.addEventListener('click', () => updateChart(chart2015));
  button2016.addEventListener('click', () => updateChart(chart2016));
  button2017.addEventListener('click', () => updateChart(chart2017));
});
