// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateChart(data);
  });

API.getWorkoutsInRange().then(populateChart);

function populateChart(data) {
  const durations = data.map(({ totalDuration }) => totalDuration);
  const pounds = calculateTotalWeight(data);
  const workouts = workoutNames(data);
  const colors = generatePalette(data);

  const line = document.querySelector("#canvas").getContext("2d");
  const bar = document.querySelector("#canvas2").getContext("2d");
  const pie = document.querySelector("#canvas3").getContext("2d");

  const labels = data.map(({ day }) => {
    const date = new Date(day);

    // Use JavaScript's `Intl` object to help format dates
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  });

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: "Time Spent Working Out (Last 7 days)",
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted (Last 7 days)",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  function generatePalette() {
    const arr = [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "ffa600",
      "#003f5c",
    ];

    return arr;
  }

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed",
      },
    },
  });

  function duration(data) {
    let durations = [];

    data.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        durations.push(exercise.duration);
      });
    });

    return durations;
  }

  function calculateTotalWeight(data) {
    let total = [];

    data.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        total.push(exercise.weight);
      });
    });

    return total;
  }

  function workoutNames(data) {
    let workouts = [];

    data.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        workouts.push(exercise.name);
      });
    });

    return workouts;
  }
}
