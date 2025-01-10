const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('customTip');
const peopleInput = document.getElementById('people');
const resetButton = document.getElementById('reset');
const tipAmountOutput = document.getElementById('tipAmount');
const totalAmountOutput = document.getElementById('totalAmount');
const errorPeople = document.getElementById('errorPeople');

const tipButtons = document.querySelectorAll('.tip-buttons button');

let selectedTip = 0.15;

function updateBillCalculation() {
    const bill = parseFloat(billInput.value);
    const people = parseInt(peopleInput.value);
    resetButton.classList.remove('disabled');

    if (isNaN(bill) || bill < 0 || isNaN(people) || people <= 0) {
        tipAmountOutput.textContent = "0.00";
        totalAmountOutput.textContent = "0.00";

        if (people <= 0) {
            errorPeople.textContent = people < 0 ? "Can't be negative" : "Can't be zero";
            errorPeople.style.display = "block";
            peopleInput.classList.add('invalid');
        } else {
            errorPeople.style.display = "none";
            peopleInput.classList.remove('invalid');
        }

        return;
    }

    errorPeople.style.display = "none";
    peopleInput.classList.remove('invalid');

    const tipAmount = (bill * selectedTip) / people;
    const totalPerPerson = (bill + bill * selectedTip) / people;

    tipAmountOutput.textContent = tipAmount.toFixed(2);
    totalAmountOutput.textContent = totalPerPerson.toFixed(2);
}

updateBillCalculation()
billInput.addEventListener('input', updateBillCalculation);
peopleInput.addEventListener('input', updateBillCalculation);

tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class
        tipButtons.forEach(btn => btn.classList.remove('active'));
        // Add active for the clicked button
        button.classList.add('active');

        selectedTip = parseFloat(button.dataset.tip);
        customTipInput.value = ""; // clear custom tip
        updateBillCalculation();
    });
});

customTipInput.addEventListener('input', () => {
    // remove active class
    tipButtons.forEach(btn => btn.classList.remove('active'));

    const customTipValue = parseFloat(customTipInput.value) / 100;
    selectedTip = isNaN(customTipValue) || customTipValue < 0 ? 0 : customTipValue;

    updateBillCalculation();
});





resetButton.addEventListener('click', () => {
    billInput.value = '';
    customTipInput.value = "";
    peopleInput.value = 1;
    tipAmountOutput.textContent = '0.00';
    totalAmountOutput.textContent = '0.00';
    selectedTip = 0;
    errorPeople.style.display = 'none';
    // remove active class
    tipButtons.forEach(btn => btn.classList.remove('active'));
    peopleInput.classList.remove('invalid');
    resetButton.classList.add('disabled');

});