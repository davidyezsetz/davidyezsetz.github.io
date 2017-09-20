/*  eslint-disable no-undef */

// Define chart colours
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

// definde chart data

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
  const nav = document.getElementById('js_techChartNav');
  const button2011 = document.getElementById('js_techChart2011');
  const button2012 = document.getElementById('js_techChart2012');
  const button2013 = document.getElementById('js_techChart2013');
  const button2014 = document.getElementById('js_techChart2014');
  const button2015 = document.getElementById('js_techChart2015');
  const button2016 = document.getElementById('js_techChart2016');
  const button2017 = document.getElementById('js_techChart2017');
  const isBreakpointS = document.body.clientWidth <= 650;
  const buttonActiveClass = 'button--active';
  const navActiveClass = 'tech-chart__nav--active';

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

  const buttonHandler = (data, e) => {
    if (isBreakpointS) {
      if (e.target.classList.contains(buttonActiveClass)) {
        e.target.classList.remove(buttonActiveClass);
        nav.classList.add(navActiveClass);
      } else {
        e.target.classList.add(buttonActiveClass);
        nav.classList.remove(navActiveClass);
        nav.addEventListener('transitionend', () => {
          updateChart(data);
        });
      }
    } else {
      updateChart(data);
    }
  };

  button2011.addEventListener('click', (e) => buttonHandler(chart2011, e));
  button2012.addEventListener('click', (e) => buttonHandler(chart2012, e));
  button2013.addEventListener('click', (e) => buttonHandler(chart2013, e));
  button2014.addEventListener('click', (e) => buttonHandler(chart2014, e));
  button2015.addEventListener('click', (e) => buttonHandler(chart2015, e));
  button2016.addEventListener('click', (e) => buttonHandler(chart2016, e));
  button2017.addEventListener('click', (e) => buttonHandler(chart2017, e));
});
