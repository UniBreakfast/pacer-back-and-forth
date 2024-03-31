const endeavors = [];
const activities = [];
const quests = [];
const data = { endeavors, activities, quests };

let confidence = null;
let prevId = 1;

function getNextId() {
  return String(prevId++);
}

function setConfidence(value) {
  confidence = value;
}

function addEndeavor(data) {
  const id = getNextId();
  const { title, description, type } = data;
  const endeavor = { id, title, description, type };

  endeavors.unshift(endeavor);
}

function addActivity(data) {
  const id = getNextId();
  const { title, amount, unit, difficulty } = data;
  const activity = { id, title, amount, unit, difficulty };

  activities.unshift(activity);
}
