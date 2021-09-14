// Variables
let dataJSON;
let btn;
const output = document.querySelector('#output');
const taskList = document.querySelector('.taskList');

// Initial state
if (
  localStorage.getItem('yourTasks') === null ||
  localStorage.getItem('yourTasks').length === 2
) {
  const data = [
    {
      info: 'Add Your Tasks',
      status: false,
    },
  ];

  dataJSON = data;
} else {
  dataJSON = JSON.parse(localStorage.getItem('yourTasks'));
}
// Save Data at Local Storage
function saveData() {
  localStorage.setItem('yourTasks', JSON.stringify(dataJSON));
}

//  Checked Unchecked Boxes
function checkBox() {
  document
    .querySelectorAll('.taskList input[type="checkbox"]')
    .forEach((val, i) => {
      val.addEventListener('change', () => {
        dataJSON[i].status = val.checked;

        saveData();
      });
    });
}
// Remove functionality
function removeItems() {
  btn = document.querySelectorAll('.btn');
  btn.forEach((val, i) => {
    val.addEventListener('click', () => {
      val.parentElement.remove();
      dataJSON.splice(i, 1);
      saveData();
    });
  });
}

// Update UI
function updateUI(dataJSON) {
  dataJSON.forEach(val => {
    let html = `<li>${val.info}<input type="checkbox" value="${val.info}" ${
      val.status ? 'checked' : ''
    } /><span class="btn"
    >X</span
  ></li>`;
    taskList.insertAdjacentHTML('beforeend', html);

    removeItems();
  });
  checkBox();
}

updateUI(dataJSON);

// Take Input
document.getElementById('myForm').addEventListener('submit', e => {
  e.preventDefault();
  const getValue = document.querySelector('#myForm input[type="text"]').value;

  addNewItem({ info: getValue, status: false });
});

// Push new item and update UI
function addNewItem(val) {
  dataJSON.push(val);
  saveData();
  updateUI([dataJSON[dataJSON.length - 1]]);
}
