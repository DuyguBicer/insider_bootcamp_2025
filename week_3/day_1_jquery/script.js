$(document).ready(function () {

const employeeData = [
    {name: "Duygu", age: 30, time: 4},
    {name: "Ahmet", age: 42, time: 6},
    {name: "Nesli", age: 28, time: 2},
    {name: "Cansu", age: 32, time: 3},
    {name: "Mert", age: 29, time: 1},
    {name: "Kerim", age: 48, time: 8}
]


function renderTable() {

    $("#employeeTable tbody").empty();
    employeeData.forEach((employee, index) => {
        $("#employeeTable tbody").append(`
            <tr data-index="${index}">
                <td>${employee.name}</td>
                <td>${employee.age}</td>
                <td>${employee.time}</td>
                <td><button class="deleteBtn">Sil</button></td>
            </tr>
            
            `)
    })
}

$("#employeeForm").on("submit", function(e) {
     e.preventDefault();
     const name = $("#nameInput").val().trim();
     const age = $("#ageInput").val().trim();
     const time = $("#timeInput").val().trim();

       if (name === "" || age === "" || time === "") {
    alert("Lütfen bilgileri eksiksiz giriniz!");
    return;
  }
     
    employeeData.push({ name, age, time});
   renderTable();

   $("#employeeForm")[0].reset();
})

$("#employeeTable").on("click", ".deleteBtn", function () {
  const index = $(this).closest("tr").data("index");

  const confirmDelete = confirm("Bu çalışanı silmek istediğinize emin misiniz?");
  if (!confirmDelete) 
    return;

  employeeData.splice(index, 1); 
  renderTable(); 
})

$("#employeeTable").on("click", "tr", function () {
  $(this).toggleClass("highlight");
});

  renderTable();
});