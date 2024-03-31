const endeavors = [];
const activities = [];
const quests = [];
const data = { endeavors, activities, quests };

let confidence = 0;
let prevId = 1;

function getNextId() {
  return prevId++;
}

function addEndeavor(data) {
  const id = getNextId();
  const { title, description, type } = data;
  const endeavor = { id, title, description, type };

  endeavors.unshift(endeavor);
}
