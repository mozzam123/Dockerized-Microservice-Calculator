var P, R, N, pie, line;
var loan_amt_slider = document.getElementById("loan-amount");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("loan-period");
var monthlyemi;
// update loan amount
loan_amt_slider.addEventListener("input", (self) => {
  document.querySelector("#loan-amt-text").innerText =
    parseInt(self.target.value).toLocaleString("en-US") + "₹";
  P = parseFloat(self.target.value);
  displayDetails();
});

// update Rate of Interest
int_rate_slider.addEventListener("input", (self) => {
  document.querySelector("#interest-rate-text").innerText =
    self.target.value + "%";
  R = parseFloat(self.target.value);
  displayDetails();
});

// update loan period
loan_period_slider.addEventListener("input", (self) => {
  document.querySelector("#loan-period-text").innerText =
    self.target.value + " years";
  N = parseFloat(self.target.value);
  displayDetails();
});

// calculate total Interest payable
function calculateLoanDetails(p, r, emi) {
  /*
    p: principal
    r: rate of interest
    emi: monthly emi
  */
  let totalInterest = 0;
  let yearlyInterest = [];
  let yearPrincipal = [];
  let years = [];
  let year = 1;
  let [counter, principal, interes] = [0, 0, 0];
  while (p > 0) {
    let interest = parseFloat(p) * parseFloat(r);
    p = parseFloat(p) - (parseFloat(emi) - interest);
    totalInterest += interest;
    principal += parseFloat(emi) - interest;
    interes += interest;
    if (++counter == 12) {
      years.push(year++);
      yearlyInterest.push(parseInt(interes));
      yearPrincipal.push(parseInt(principal));
      counter = 0;
    }
  }
  line.data.datasets[0].data = yearPrincipal;
  line.data.datasets[1].data = yearlyInterest;
  line.data.labels = years;
  return totalInterest;
}
let principalAmount;
// calculate details
function displayDetails() {
  let r = parseFloat(R) / 1200;
  let n = parseFloat(N) * 12;

  let num = parseFloat(P) * r * Math.pow(1 + r, n);
  let denom = Math.pow(1 + r, n) - 1;
  let emi = parseFloat(num) / parseFloat(denom);

  let payabaleInterest = calculateLoanDetails(P, r, emi);

  let opts = '{style: "decimal", currency: "US"}';

  document.querySelector("#cp").innerText =
    parseFloat(P).toLocaleString("en-US", opts) + "₹";

  principalAmount = parseFloat(P).toLocaleString("en-US", opts);
  document.querySelector("#ci").innerText =
    parseFloat(payabaleInterest).toLocaleString("en-US", opts) + "₹";

  document.querySelector("#ct").innerText =
    parseFloat(parseFloat(P) + parseFloat(payabaleInterest)).toLocaleString(
      "en-US",
      opts
    ) + "₹";

  document.querySelector("#price").innerText =
    parseFloat(emi).toLocaleString("en-US", opts) + "₹";

  monthlyemi = parseFloat(emi).toFixed("2");

  pie.data.datasets[0].data[0] = P;
  pie.data.datasets[0].data[1] = payabaleInterest;
  pie.update();
  line.update();
}

// Initialize everything
function initialize() {
  document.getElementById("loan-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    // console.log("principalAmount", principalAmount);
    // console.log("interest", R, N, monthlyemi);
    
    // Make an AJAX request or perform any necessary actions with the principalAmount value
    
    // Redirect to a new page or display a success message
  })
  
  document.querySelector("#loan-amt-text").innerText =
    parseInt(loan_amt_slider.value).toLocaleString("en-US") + "₹";
  P = parseFloat(document.getElementById("loan-amount").value);

  document.querySelector("#interest-rate-text").innerText =
    int_rate_slider.value + "%";
  R = parseFloat(document.getElementById("interest-rate").value);

  document.querySelector("#loan-period-text").innerText =
    loan_period_slider.value + " years";
  N = parseFloat(document.getElementById("loan-period").value);

  line = new Chart(document.getElementById("lineChart"), {
    data: {
      datasets: [
        {
          type: "line",
          label: "Yearly Principal paid",
          borderColor: "rgb(54, 162, 235)",
          data: [],
        },
        {
          type: "line",
          label: "Yearly Interest paid",
          borderColor: "rgb(255, 99, 132)",
          data: [],
        },
      ],
      labels: [],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Yearly Payment Breakdown",
        },
      },
      scales: {
        x: {
          title: {
            color: "grey",
            display: true,
            text: "Years Passed",
          },
        },
        y: {
          title: {
            color: "grey",
            display: true,
            text: "Money in Rs.",
          },
        },
      },
    },
  });

  pie = new Chart(document.getElementById("pieChart"), {
    type: "doughnut",
    data: {
      labels: ["Principal", "Interest"],
      datasets: [
        {
          label: "Home Loan Details",
          data: [0, 0],
          backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Payment Breakup",
        },
      },
    },
  });
  displayDetails();
}
initialize();
console.log(P);

// function savedetails(e){
//   console.log("cp",document.getElementById('cp'));
//  const savedcp= document.getElementById('cp')
// console.log("saved",savedcp);
// // alert("The form was submitted")
// // document.getElementById(cp)
// }
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("principalAmount", principalAmount);
  console.log("intrest", R, N, monthlyemi);
  console.log('P is: ', P);
});
