const screenKits = {
  'main-menu': {
    prep(scr) {

    },

    update(scr) {

    },
  },

  'add-endeavor': {
    prep(scr) {
      scr.onsubmit = handleAddEndeavor;
    },

    update(scr) {

    },
  },

  'endeavors': {
    prep(scr) {

    },

    update(scr) {

    },
  },

  'endeavor': {
    prep(scr) {
      scr.onsubmit = handleUpdateEndeavor;
    },

    update(scr) {

    },
  },

  'add-activity': {
    prep(scr) {
      scr.onsubmit = handleAddActivity;
    },

    update(scr) {

    },
  },

  'activities': {
    prep(scr) {

    },

    update(scr) {

    },
  },

  'activity': {
    prep(scr) {
      scr.onsubmit = handleUpdateActivity;
    },

    update(scr) {

    },
  },

  'new-quest': {
    prep(scr) {
      scr.onsubmit = handleAddQuest;
    },

    update(scr) {

    },
  },

  'quests': {
    prep(scr) {

    },

    update(scr) {

    },
  },

  'quest': {
    prep(scr) {

    },

    update(scr) {

    },
  },

  'confidence': {
    prep(scr) {
      scr.onsubmit = handleUpdateConfidence;
    },

    update(scr) {

    },
  },
};
