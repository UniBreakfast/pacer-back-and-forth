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

function addEndeavor({ title, description, type }) {
  const id = getNextId();
  const endeavor = { id, title, description, type };

  endeavors.unshift(endeavor);
}

function addActivity({ title, amount, unit, difficulty }) {
  const id = getNextId();

  difficulty = Number(difficulty);
  
  const activity = { id, title, amount, unit, difficulty };

  activities.unshift(activity);
}

function addQuest({ activity, duration, cost, start, end }) {
  const id = getNextId();
  const status = 'pending';
  const year = new Date().getFullYear();

  duration = Number(duration);
  cost = Number(cost);
  start = new Date(`${start} ${year}`);
  end = new Date(`${end} ${year}`);

  confidence -= cost;

  const quest = { id, activity, duration, cost, start, end, status };

  quests.unshift(quest);
}

function updateEndeavor(endeavor) {
  const index = endeavors.findIndex(({ id }) => id == endeavor.id);

  endeavors.splice(index, 1);
  endeavors.unshift(endeavor);
}

function updateActivity(activity) {
  const index = activities.findIndex(({ id }) => id == activity.id);

  activities.splice(index, 1);
  activities.unshift(activity);
}

function removeEndeavor(id) {
  const index = endeavors.findIndex(end => end.id == id);

  endeavors.splice(index, 1);
}

function removeActivity(id) {
  const index = activities.findIndex(act => act.id == id);

  activities.splice(index, 1);
}

function removeQuest(id) {
  const index = quests.findIndex(q => q.id == id);

  quests.splice(index, 1);
}
