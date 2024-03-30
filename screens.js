const screenKits = {
  'main-menu': {
    prep(scr) {

    },

    update(scr) {
      const [addEndeavorBtn, endeavorsBtn, addActivityBtn, activitiesBtn, takeQuestBtn, questsBtn, confidenceBtn] = scr.querySelectorAll('.buttons button');
      
      const endeavorsExist = endeavors.length > 0;
      const activitiesExist = activities.length > 0;
      const questsExist = quests.length > 0;
      
      addEndeavorBtn.hidden = endeavorsExist;
      endeavorsBtn.hidden = !endeavorsExist;
      addActivityBtn.hidden = activitiesExist;
      activitiesBtn.hidden = !activitiesExist;
      takeQuestBtn.hidden = questsExist || !activitiesExist;
      questsBtn.hidden = !questsExist || !activitiesExist;
      confidenceBtn.hidden = !activitiesExist;
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
