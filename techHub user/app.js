document.getElementById("fetchBtn").addEventListener("click", async () => {
const usernameInput = document.getElementById("username").value.trim();
const output = document.getElementById("userInfo");
output.innerHTML = "";
if (!usernameInput) {
output.innerHTML = "<p class='error'>Please enter a username!</p>";
return;
 }
try {
let data;
if (usernameInput.toLowerCase() === "octocat") {
const res = await fetch("./octocat.json");
if (!res.ok) throw new Error("Network error");
data = await res.json();
 } else {
throw new Error("User not found");
 }
output.innerHTML = `
<h2>${data.name}</h2>
<img src="${data.avatar_url}" alt="avatar" />
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Public Repos:</strong> ${data.public_repos}</p>
`;
 } catch (err) {
if (err.message === "User not found") {
output.innerHTML = "<p class='error'>User not found!</p>";
 } else {
output.innerHTML = "<p class='error'>Network error, please try again later!</p>";
 }
 }
});