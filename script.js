function calculateLowIP() {
    // Get input values
    var exShowroomPrice = parseFloat(document.getElementById('exShowroomPrice').value);
    var roadTax = parseFloat(document.getElementById('roadTax').value);
    var insurance = parseFloat(document.getElementById('insurance').value);
    var loanPercentage = parseFloat(document.getElementById('loanPercentage').value) / 100;
    var processingFeePercentage = parseFloat(document.getElementById('processingFeePercentage').value) / 100;
    var showroomOnroad = parseFloat(document.getElementById('showroomOnroad').value);

    // Step 1: Calculate HLF ONROAD
    var hlfOnroad = exShowroomPrice + roadTax + insurance + 3500;

    // Step 2: Calculate Loan Amount
    var loanAmount = loanPercentage * hlfOnroad;

    // Step 3: Calculate Processing Fee
    var processingFee = (processingFeePercentage * loanAmount) + 2000;

    // Step 4: Calculate DD (Loan Amount - Processing Fee)
    var dd = loanAmount - processingFee;

    // Step 5: Calculate Low-IP (SHOWROOM ONROAD - DD)
    var lowIp = showroomOnroad - dd;

    // Display results
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('hlfOnroad').innerHTML = "HLF ONROAD: " + hlfOnroad.toFixed(2);
    document.getElementById('loanAmount').innerHTML = "Loan Amount: " + loanAmount.toFixed(2);
    document.getElementById('processingFee').innerHTML = "Processing Fee: " + processingFee.toFixed(2);
    document.getElementById('dd').innerHTML = "DD: " + dd.toFixed(2);
    document.getElementById('lowIp').innerHTML = "Low-IP: " + lowIp.toFixed(2);
}
