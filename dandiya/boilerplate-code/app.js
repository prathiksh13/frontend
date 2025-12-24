function register() {
  // Step 1: Get the values entered by the user
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = Number(document.getElementById("age").value);
  const email = document.getElementById("email").value.trim();

  // Step 2: Get output div
  const outputDiv = document.getElementById("output");

  // Step 3: Clear previous output
  outputDiv.innerHTML = "";

  // Step 4: Check if person is younger than 16
  if (age < 16) {
    outputDiv.innerHTML = `<p class='notice'>Sorry ${name}, you are not eligible to participate.</p>`;
    return;
  }

  // Step 5: Determine hall based on age
  let hall = "";
  if (age >= 16 && age <= 25) {
    hall = "Hall 1";
  } else if (age >= 26 && age <= 35) {
    hall = "Hall 2";
  } else if (age >= 36 && age <= 70) {
    hall = "Hall 3";
  } else {
    hall = "Hall 4";
  }

  // Step 6: Create table to display details
  let table = `
    <table>
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Age</strong></td><td>${age}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Assigned Hall</strong></td><td>${hall}</td></tr>
    </table>
  `;

  // Step 7: Display the result
  outputDiv.innerHTML = table;

  // Step 8: Clear the form after displaying the result
  document.getElementById("garbhaForm").reset();
}
