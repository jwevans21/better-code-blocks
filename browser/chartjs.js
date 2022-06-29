function chartInit() {
   const charts = document.querySelectorAll('.chartjs');

   for (const chart of charts) {
      const ctx = chart.getContext('2d');

      const data = JSON.parse(chart.textContent);

      data.plugins = []; // to prevent execution of plugins that are potentially unsafe

      const chartjs = new Chart(ctx, data);
      chartjs.render();
   }
}

window.addEventListener('load', chartInit);
