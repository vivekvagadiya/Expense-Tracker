let transaction = JSON.parse(localStorage.getItem('expense-app')) || [
    {
        id: '',
        amount: 0,
        expense: 0,
        availableBalance: 0,
        discription: 'Discription',
        entry: '0$',
    }
]



console.log(transaction)
function renderHtml() {
    let incomeHtml = `
     <label for="income">Enter Income or Expense</label>
        <input type="number" placeholder="Enter amount">
    `
    let discHtml = `
     <label for="description">Enter discription</label>
        <input type="text" class="discription" placeholder="Enter discription">
    `
    let selectHtml = `
     <select name="income" id="income-choice">
            <option value="">Select spends</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
    `
    let addButton = `
     <button class="add-button" onclick="handleData()">Add</button>
     `
    let clearButton = `<button onclick="removeStorage()">Clear Data</button>`

    document.querySelector('.add-amount').innerHTML = incomeHtml;
    document.querySelector('.add-disc').innerHTML = discHtml;
    document.querySelector('.select-spend').innerHTML = selectHtml;
    document.querySelector('.btn').innerHTML = addButton;
    document.querySelector('.clear-btn').innerHTML = clearButton;

}
renderHtml();
renderTable();

let finalIncome = transaction[transaction.length - 1].amount;
let finalExpense = transaction[transaction.length - 1].expense; `  `
let availBalance = finalIncome - finalExpense;
showTotal(finalIncome, finalExpense, availBalance);


function handleData() {
    let entrycheck = '';
    let amount = Number(document.querySelector('.add-amount input').value);
    let discription = (document.querySelector('.discription')).value;
    let selectExpense = document.querySelector('#income-choice').value;
    let expense = selectExpense === 'expense' ? amount : 0;

    if (errorCheck(amount, discription, selectExpense) === false) {
        console.log('false')
        return;
    }
    if (!amount || !discription || !selectExpense) {
        console.log('data is require')
        errorHandle();
        return;
    }
    if (selectExpense === 'income') {
        finalIncome += amount;
        availBalance += amount;
        entrycheck = `+$${amount}`
    } else {
        finalExpense += expense;
        availBalance = finalIncome - finalExpense;
        entrycheck = `-$${amount}`
    }
    transaction.push({
        amount: finalIncome,
        expense: finalExpense,
        discription: discription,
        availableBalance: availBalance,
        id: Date.now().toString(),
        entry: entrycheck
    })
    localStorage.setItem('expense-app', JSON.stringify(transaction))
    console.log(transaction);
    renderTable();
    showTotal(finalIncome, finalExpense, availBalance);

}

function renderTable() {
    let html = '';

    for (let i = transaction.length - 1; i > 0; i--) {
        html += `
            <tr>
                <td style="color:${transaction[i].entry.charAt(0) === '+' ? "green" : "red"}">${transaction[i].entry}</td>
                <td>${transaction[i].discription}</td>
                <td class="table-income">+$${transaction[i].amount}</td>
                <td class="table-expense">-$${transaction[i].expense}</td>
                <td class="table-balance">${transaction[i].availableBalance}</td>
                <td><button class="table-delete" onclick="handleDelete(${transaction[i].id})">Delete</button></td>
            </tr>
            `
    }
    document.querySelector('tbody').innerHTML = html;
}

function handleDelete(id) {
    let getTransaction;
    for (let i = 0; i < transaction.length; i++) {
        if (transaction[i].id === id.toString()) {
            getTransaction = transaction[i];
        }
    }
    let entryvalue = getTransaction.entry;
    let finalEntry = (Number(entryvalue.slice(2, entryvalue.length)))
    if (entryvalue.charAt(0) === '+') {
        finalIncome -= finalEntry;
    }
    else {
        finalExpense -= finalEntry;
    }
    availBalance = finalIncome - finalExpense;
    console.log(typeof finalEntry)

    showTotal(finalIncome, finalExpense, availBalance)

    transaction = transaction.filter((item, index) => (
        item.id !== id.toString()
    ))

    localStorage.setItem('expense-app', JSON.stringify(transaction))
    renderTable();
    console.log(transaction)
}

function removeStorage() {
    transaction = [
        {
            id: '',
            amount: 0,
            expense: 0,
            availableBalance: 0,
            discription: 'Discription',
            entry: '0$'
        }
    ];
    localStorage.setItem('expense-app', JSON.stringify(transaction))
    renderTable();
    showTotal(0, 0, 0);
}

function resetvalues() {
    document.querySelector('.add-amount input').value = ''
    document.querySelector('.add-disc input').value = ''
    document.querySelector('select').value = ''
}

function showTotal(income, expense, availBalance) {
    document.querySelector('.show-income').textContent = `Total Income: ${income}`;
    document.querySelector('.show-expense').textContent = `Total expense: ${expense}`;
    document.querySelector('.show-avail').textContent = `Available Balance: ${availBalance}`;
}

function errorHandle() {
    document.querySelectorAll('.error').forEach((item) => {
        console.log('error', item)
    })
}

function errorCheck(amount, discription, selectExpense) {
    console.log(amount, discription, selectExpense)
    let isvalid = true;
    if (!amount) {
        isvalid=false;
        document.querySelector('.error-amount').classList.add('error-style');
        document.querySelector('.error-amount').classList.remove('span-show');
    } else {
        document.querySelector('.error-amount').classList.remove('error-style');
        document.querySelector('.error-amount').classList.add('span-show');
    }
    if (!discription) {
        isvalid = false;
        document.querySelector('.error-disc').classList.remove('span-show');
        document.querySelector('.error-disc').classList.add('error-style');
    }
    else {
        document.querySelector('.error-disc').classList.add('span-show');
        document.querySelector('.error-disc').classList.remove('error-style');
    }
    if (!selectExpense) {
        isvalid = false;
        document.querySelector('.error-select').classList.add('error-style');
        document.querySelector('.error-select').classList.remove('span-show');
    }
    else {
        document.querySelector('.error-select').classList.add('span-show');
        document.querySelector('.error-select').classList.remove('error-style');
    }
    return isvalid;
}