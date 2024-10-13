// Function to show selected calculator and hide others
function showCalculator(calculator) {
    document.querySelectorAll('.input-field').forEach(field => {
        field.style.display = 'none';
    });
    document.getElementById(calculator).style.display = 'block';
}

// Low-IP Calculator Logic
function calculateLowIP() {
    var exShowroomPrice = parseFloat(document.getElementById('exShowroomPrice').value);
    var roadTax = parseFloat(document.getElementById('roadTax').value);
    var insurance = parseFloat(document.getElementById('insurance').value);
    var loanPercentage = parseFloat(document.getElementById('loanPercentage').value) / 100;
    var processingFeePercentage = parseFloat(document.getElementById('processingFeePercentage').value) / 100;
    var showroomOnroad = parseFloat(document.getElementById('showroomOnroad').value);

    var hlfOnroad = exShowroomPrice + roadTax + insurance + 3500;
    var loanAmount = loanPercentage * hlfOnroad;
    var processingFee = (processingFeePercentage * loanAmount) + 2000;
    var dd = loanAmount - processingFee;
    var lowIp = showroomOnroad - dd;

    document.getElementById('lowipResults').innerHTML = `
        <p>HLF ONROAD: ${hlfOnroad.toFixed(2)}</p>
        <p>Loan Amount: ${loanAmount.toFixed(2)}</p>
        <p>Processing Fee: ${processingFee.toFixed(2)}</p>
        <p>DD: ${dd.toFixed(2)}</p>
        <p>Low-IP: ${lowIp.toFixed(2)}</p>
    `;
}

// IP Calculator Logic
function calculateIP() {
    var onroadPrice = parseFloat(document.getElementById('onroadPriceIP').value);
    var ipAmount = parseFloat(document.getElementById('ipAmount').value);

    var difference = onroadPrice - ipAmount;
    var loanAmount = difference + (difference * 0.04) + 2000 + 250;
    var processingFee = (loanAmount * 0.04) + 2000;
    var dd = loanAmount - processingFee;
    var ip = onroadPrice - dd;

    document.getElementById('ipResults').innerHTML = `
        <p>Loan Amount: ${loanAmount.toFixed(2)}</p>
        <p>Processing Fee: ${processingFee.toFixed(2)}</p>
        <p>DD: ${dd.toFixed(2)}</p>
        <p>IP: ${ip.toFixed(2)}</p>
    `;
}

// EMI Calculator Logic
function calculateEMI() {
    var loanAmount = parseFloat(document.getElementById('loanAmount').value);
    var years = parseInt(document.getElementById('years').value);

    var interestRate, months;

    if (years === 2) {
        interestRate = 12.85;
        months = 24;
    } else if (years === 3) {
        interestRate = 13.12;
        months = 36;
    } else if (years === 4) {
        interestRate = 13.46;
        months = 48;
    }

    var interestCalculated = loanAmount * (interestRate / 100);
    var interestTotal = interestCalculated * years;
    var totalAmount = interestTotal + loanAmount;
    var emi = totalAmount / months;

    if (years === 2) {
        emi += 100;
    } else if (years === 3) {
        emi += 67;
    } else if (years === 4) {
        emi += 50;
    }

    document.getElementById('emiResults').innerHTML = `
        <p>Interest Rate: ${interestRate}%</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>EMI: ${emi.toFixed(2)}</p>
    `;
}
