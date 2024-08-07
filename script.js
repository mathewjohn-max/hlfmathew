function roundOff(value) {
    return Math.round(value);
}

function showLowIP() {
    document.getElementById('lowIPForm').style.display = 'block';
    document.getElementById('ipForm').style.display = 'none';
}

function showIP() {
    document.getElementById('lowIPForm').style.display = 'none';
    document.getElementById('ipForm').style.display = 'block';
}

function calculateLowIP() {
    let onroadPrice = parseFloat(document.getElementById("lowIPOnroadPrice").value);
    let exShowroomPrice = parseFloat(document.getElementById("lowIPExShowroomPrice").value);
    let tax = parseFloat(document.getElementById("lowIPTax").value);
    let insurance = parseFloat(document.getElementById("lowIPInsurance").value);
    let percentageLoan = parseFloat(document.getElementById("lowIPPercentageLoan").value);
    let percentageProcessingFee = parseFloat(document.getElementById("lowIPPercentageProcessingFee").value);

    if (isNaN(percentageLoan)) percentageLoan = 90;
    if (isNaN(percentageProcessingFee)) percentageProcessingFee = 3;

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

    document.getElementById("hlfOnroad").innerText = "HLF ONROAD: " + hlfOnroad.toFixed(2);
    document.getElementById("loanAmount").innerText = "Loan Amount: " + loanAmount.toFixed(2);
    document.getElementById("processingFee").innerText = "Processing Fee: " + processingFee.toFixed(2);
    document.getElementById("dd").innerText = "DD: " + dd.toFixed(2);
    document.getElementById("lowIP").innerText = "Low IP: " + lowIP.toFixed(2);
}

function calculateIP() {
    let onroadPrice = parseFloat(document.getElementById("ipOnroadPrice").value);
    let downpayment = parseFloat(document.getElementById("ipDownpayment").value);

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

    document.getElementById("ipHlfOnroad").innerText = "HLF on-road: " + hlfOnroad.toFixed(2);
    document.getElementById("ipHlfFund").innerText = "HLF fund: " + hlfFund.toFixed(2);
    document.getElementById("ipLoanAmount").innerText = "Loan amount: " + loanAmount.toFixed(2);
    document.getElementById("ipProcessingFee").innerText = "Processing fee: " + processingFee.toFixed(2);
    document.getElementById("ipDd").innerText = "DD: " + dd.toFixed(2);
    document.getElementById("ipAnswer").innerText = "Answer: " + answer.toFixed(2);
}
