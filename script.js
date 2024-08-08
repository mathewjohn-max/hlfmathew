function showCalculator(type) {
    let calculatorContainer = document.getElementById('calculator');
    let calculatorHTML = '';

    if (type === 'lowIP') {
        calculatorHTML = `
            <h2>IP CALCULATOR</h2>
            <form id="lowIPForm">
                <label for="onroadPrice">On-road Price:</label>
                <input type="number" id="onroadPrice" required>

                <label for="downpayment">Downpayment:</label>
                <input type="number" id="downpayment" required>

                <input type="submit" value="Calculate IP">
            </form>
            <div class="result-container" id="result">
                <p id="hlfOnroad"></p>
                <p id="hlfFund"></p>
                <p id="loanAmount"></p>
                <p id="processingFee"></p>
                <p id="dd"></p>
                <p id="answer"></p>
            </div>
        `;

        setTimeout(() => {
            document.getElementById('lowIPForm').addEventListener('submit', function (e) {
                e.preventDefault();
                main();
            });
        }, 0);

    } else if (type === 'ip') {
        calculatorHTML = `
            <h2>LOW-IP CALCULATOR</h2>
            <form id="ipForm">
                <label for="onroadPrice">On-road Price:</label>
                <input type="number" id="onroadPrice" required>

                <label for="exShowroomPrice">Ex-showroom Price:</label>
                <input type="number" id="exShowroomPrice" required>

                <label for="tax">Tax:</label>
                <input type="number" id="tax" required>

                <label for="insurance">Insurance:</label>
                <input type="number" id="insurance" required>

                <label for="percentageLoan">Percentage Loan (%):</label>
                <input type="number" id="percentageLoan" value="90" required>

                <label for="percentageProcessingFee">Percentage Processing Fee (%):</label>
                <input type="number" id="percentageProcessingFee" value="3" required>

                <input type="submit" value="Calculate Low-IP">
            </form>
            <div class="result-container" id="result"></div>
        `;

        setTimeout(() => {
            document.getElementById('ipForm').addEventListener('submit', function (e) {
                e.preventDefault();
                calculateIP();
            });
        }, 0);

    } else if (type === 'emi') {
        calculatorHTML = `
            <h2>EMI Calculator</h2>
            <form onsubmit="calculateEMI(); return false;">
                <label for="loanAmount">Loan Amount:</label><br>
                <input type="number" id="loanAmount" required><br><br>

                <label for="interestRate">Interest Rate (%):</label><br>
                <input type="number" id="interestRate" step="0.01" required><br><br>

                <label for="years">Years:</label><br>
                <input type="number" id="years" required><br><br>

                <label for="monthsInYear">Months in Year:</label><br>
                <input type="number" id="monthsInYear" required><br><br>

                <input type="submit" value="Calculate EMI">
            </form>
            <p id="emi"></p>
        `;
    }

    calculatorContainer.innerHTML = calculatorHTML;
}

function roundOff(value) {
    return Math.round(value);
}

function calculateDownpayment(onroadPrice, downpayment) {
    let hlfOnroad = onroadPrice - downpayment;
    hlfOnroad = roundOff(hlfOnroad);

    let hlfFund = hlfOnroad * 0.03;
    hlfFund = roundOff(hlfFund);

    let loanAmount = hlfOnroad + hlfFund;
    loanAmount = roundOff(loanAmount);

    let processingFee = loanAmount * 0.03;
    processingFee = roundOff(processingFee);

    let dd = loanAmount - processingFee;
    dd = roundOff(dd);

    let answer = onroadPrice - dd;
    answer = roundOff(answer);

    document.getElementById("hlfOnroad").innerText = "HLF on-road: ₹" + hlfOnroad.toFixed(2);
    document.getElementById("hlfFund").innerText = "HLF fund: ₹" + hlfFund.toFixed(2);
    document.getElementById("loanAmount").innerText = "Loan amount: ₹" + loanAmount.toFixed(2);
    document.getElementById("processingFee").innerText = "Processing fee: ₹" + processingFee.toFixed(2);
    document.getElementById("dd").innerText = "DD: ₹" + dd.toFixed(2);
    document.getElementById("answer").innerText = "Answer: ₹" + answer.toFixed(2);
}

function main() {
    let onroadPrice = parseFloat(document.getElementById("onroadPrice").value);
    let downpayment = parseFloat(document.getElementById("downpayment").value);

    calculateDownpayment(onroadPrice, downpayment);
}

function calculateIP() {
    let onroadPrice = parseFloat(document.getElementById("onroadPrice").value);
    let exShowroomPrice = parseFloat(document.getElementById("exShowroomPrice").value);
    let tax = parseFloat(document.getElementById("tax").value);
    let insurance = parseFloat(document.getElementById("insurance").value);

    let percentageLoan = parseFloat(document.getElementById("percentageLoan").value);
    let percentageProcessingFee = parseFloat(document.getElementById("percentageProcessingFee").value);

    let hlfOnroad = exShowroomPrice + tax + insurance + 3500;
    hlfOnroad = roundOff(hlfOnroad);

    let loanAmount = hlfOnroad * (percentageLoan / 100);
    loanAmount = roundOff(loanAmount);

    let processingFee = loanAmount * (percentageProcessingFee / 100);
    processingFee = roundOff(processingFee);

    let dd = loanAmount - processingFee;
    dd = roundOff(dd);

    let lowIP = onroadPrice - dd;
    lowIP = roundOff(lowIP);

    document.getElementById("result").innerHTML = `
        <p>HLF ONROAD: ₹${hlfOnroad.toFixed(2)}</p>
        <p>Loan Amount: ₹${loanAmount.toFixed(2)}</p>
        <p>Processing Fee: ₹${processingFee.toFixed(2)}</p>
        <p>DD: ₹${dd.toFixed(2)}</p>
        <p>Low IP: ₹${lowIP.toFixed(2)}</p>
    `;
}

function calculateEMI() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100; // Convert percentage to decimal
    let years = parseFloat(document.getElementById("years").value);
    let monthsInYear = parseFloat(document.getElementById("monthsInYear").value);

    // Updated EMI formula: (Loan Amount * Rate of Interest * (Years + Loan Amount)) / (Years in Months)
    let emi = (loanAmount * interestRate * years + loanAmount) / monthsInYear;

    // Add 67 to the calculated EMI
    emi += 67;

    // Display the result
    document.getElementById("emi").innerText = "EMI: ₹" + emi.toFixed(2);
}
