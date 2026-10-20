let records = [];
let editId = null;

// Load all records from server
async function loadRecords() {
    const res = await fetch("/api/records");
    records = await res.json();
    showRecords();
}

// Display records in table
function showRecords(list = records) {
    const tableBody = document.getElementById("dataList");
    tableBody.innerHTML = "";

    list.forEach(record => {
        tableBody.innerHTML += `
            <tr>
                <td>${record.accountNumber}</td>
                <td>${record.accountHolder}</td>
                <td>$${record.balance}</td>
                <td>
                    <button onclick="editRecord('${record._id}', '${record.accountNumber}', '${record.accountHolder}', ${record.balance})">Edit</button>
                    <button onclick="deleteRecord('${record._id}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add or Update record
document.getElementById("dataForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const accountNumber = document.getElementById("accountNumber").value;
    const accountHolder = document.getElementById("accountHolder").value;
    const balance = document.getElementById("balance").value;

    const url = editId ? `/api/records/${editId}` : "/api/records";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountNumber, accountHolder, balance })
    });

    document.getElementById("dataForm").reset();
    editId = null;
    loadRecords();
});

// Load record into form for editing
function editRecord(id, accountNumber, accountHolder, balance) {
    document.getElementById("accountNumber").value = accountNumber;
    document.getElementById("accountHolder").value = accountHolder;
    document.getElementById("balance").value = balance;
    editId = id;
}

// Delete record
async function deleteRecord(id) {
    if (confirm("Delete this account?")) {
        await fetch(`/api/records/${id}`, { method: "DELETE" });
        loadRecords();
    }
}

// Search records
document.getElementById("search").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = records.filter(r => 
        r.accountNumber.toLowerCase().includes(query) || 
        r.accountHolder.toLowerCase().includes(query)
    );
    showRecords(filtered);
});

// Load records when page loads
loadRecords();
