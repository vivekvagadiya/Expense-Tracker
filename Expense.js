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

// let finalIncome = 0;
let finalIncome = transaction[transaction.length-1].amount;
// console.log(finalIncome)
let finalExpense = transaction[transaction.length-1].expense;
let availBalance = finalIncome - finalExpense;
showTotal(finalIncome, finalExpense, availBalance);


function handleData() {
    let entrycheck = '';
    let amount = Number(document.querySelector('.add-amount input').value);
    let discription = (document.querySelector('.discription')).value;
    let selectExpense = document.querySelector('#income-choice').value;
    let expense = selectExpense === 'expense' ? amount : 0;
    // console.log(expense)
    // console.log(typeof amount)
    // console.log(typeof discription)
    // console.log(typeof discription);

    if (!amount || !discription || !selectExpense) {
        console.log('data is require')
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
    // resetvalues();

}

{/* <td>${selectExpense==="income"?`+$${transaction[i].entry}`:`-$${transaction[i].entry}`}</td> */ }
function renderTable() {
    let html = '';
    // transaction.map((item, index) => (
    //     html += `
    //     <tr ${index}>
    //             <td>${item.amount}</td>
    //             <td>${item.expense}</td>
    //             <td>${item.discription}</td>
    //             <td>${item.availableBalance}</td>
    //             <td><button onclick="handleDelete(${item.id})">Delete</button></td>
    //         </tr>
    //         `
    // ))


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
    for(let i=0;i<transaction.length;i++){
        if(transaction[i].id===id.toString()){
            getTransaction=transaction[i];
            // console.log('gettrans',getTransaction)
        }
    }
    let entryvalue=getTransaction.entry;
    let finalEntry=(Number(entryvalue.slice(2,entryvalue.length)))
    if(entryvalue.charAt(0)==='+'){
        finalIncome-=finalEntry;
    }
    else{
        finalExpense-=finalEntry;
    }
    availBalance=finalIncome-finalExpense;
    console.log(typeof finalEntry)

    showTotal(finalIncome,finalExpense,availBalance)

    transaction = transaction.filter((item, index) => (
        // console.log(id===item.id);
        // console.log(typeof id.toString()),
        // console.log(typeof item.id),
        // console.log(item.id!==id),
       
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