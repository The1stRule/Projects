
const form = document.getElementById('my-form');
const labelsArray = document.getElementsByTagName('label');
const messageDivArray = document.getElementsByClassName('error-message');
const spanArray = document.getElementsByTagName('span');
const btn = document.getElementById('btn');

function ifError(inputArray) {
    for(let index = 0; index < inputArray.length; index++) {
        labelsArray[index].style.color = 'red';
        inputArray[index].style.borderColor = 'red';
    }
}

function claculateDate(userDate) {
    const d = new Date();
    let userYears = d.getFullYear() - userDate.getFullYear();
    let userMonths = d.getMonth() - userDate.getMonth();
    let userDays = d.getDate() - userDate.getDate();

    if (userDays < 0) {
        userMonths--;
        const lastMonth = new Date(d.getFullYear(), d.getMonth(), 0);
        userDays += lastMonth.getDate();
    }

    if (userMonths < 0) {
        userYears--;
        userMonths += 12;
    }

    console.log(userYears, userMonths, userDays);

    const result = [userYears, userMonths, userDays];

    for(let i = 0; i < result.length; i++) {
        if(String(result[i]).length === 1) {
            spanArray[i].textContent = `0${result[i]}`
        } else {
            spanArray[i].textContent = `${result[i]}`
        }
    }
}

function validateForm() {

    const inputArray = [form.day, form.month, form.year];

    for(let index = 0; index < inputArray.length; index++) {
        labelsArray[index].style.color = '#878787';
        inputArray[index].style.borderColor = '#878787';
        messageDivArray[index].textContent = '';
    }

    if(form.day.value === '' || form.month.value === '' || form.year.value === '') {
        ifError(inputArray);
        
        for(let i = 0; i < inputArray.length; i++) {
            if(inputArray[i].value === '') {
                messageDivArray[i].textContent = 'This fild is required';
            }
        }
    } else {
        const checkArray = [form.day.value > 31, form.month.value > 12, form.year.value > 2024]

        if(checkArray[0] || checkArray[1] || checkArray[2]) {
            ifError(inputArray);

            for(let i = 0; i < checkArray.length; i++) {
                if(checkArray[i]) {
                    messageDivArray[i].textContent = 'Must be valid date';
                }
            }
            return;
        }
        const userDate = new Date(Number(form.year.value), Number(form.month.value) - 1, Number(form.day.value));

        if(userDate.getDate() !== Number(form.day.value)) {
            messageDivArray[0].textContent = 'Must be valid date';
            ifError(inputArray);
            return;
        }

        claculateDate(userDate);
    }
}

btn.onclick = validateForm;