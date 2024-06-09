document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form");
  const recordList = document.getElementById("record_list");

  // Load records from local storage on page load
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

  // Function to render records in the record_list
  function renderRecords() {
      recordList.innerHTML = "";
      records.forEach((record, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${record.name}</td>
              <td>${record.id}</td>
              <td>${record.email}</td>
              <td>${record.contact}</td>
              <td><button onclick="editRecord(${index})">Edit</button></td>
              <td><button onclick="deleteRecord(${index})">Delete</button></td>
          `;
          recordList.appendChild(row);
      });
  }
  renderRecords();
  // Function to add or edit a record
  form.addEventListener("submit", function(event) {
      event.preventDefault();
      const sname = document.getElementById("sname").value;
      const sId = document.getElementById("sId").value;
      const email = document.getElementById("email").value;
      const contact = document.getElementById("contact").value;
      const editIndex = parseInt(document.getElementById("edit-index").value);

      if (sname && sId && email && contact) {
          if (editIndex === -1) {
              records.push({ name: sname, id: sId, email: email, contact: contact });
          } else {
              records[editIndex] = { name: sname, id: sId, email: email, contact: contact };
              document.getElementById("edit-index").value = -1;
          }

          localStorage.setItem("studentRecords", JSON.stringify(records));
          renderRecords();
          form.reset();
      }
  });
  // Function to edit a record
  window.editRecord = function(index) {
      const record = records[index];
      document.getElementById("sname").value = record.name;
      document.getElementById("sId").value = record.id;
      document.getElementById("email").value = record.email;
      document.getElementById("contact").value = record.contact;
      document.getElementById("edit-index").value = index;
  };
  // Function to delete a record
     window.deleteRecord = function(index) {
      records.splice(index, 1);
      localStorage.setItem("studentRecords", JSON.stringify(records));
      renderRecords();
  };
  const recordlist = document.getElementById("record_list");
 });