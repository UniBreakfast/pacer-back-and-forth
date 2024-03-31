const screenKits = {
  'main-menu': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();

      scr.onsubmit = handleEstimateConfidence;
    },

    update(scr) {
      const select = scr.querySelector('select');
      const output = scr.querySelector('output');
      const startBtn = scr.querySelector('button');
      const [addEndeavorBtn, endeavorsBtn, addActivityBtn, activitiesBtn, takeQuestBtn, questsBtn, confidenceBtn] = scr.querySelectorAll('.buttons button');

      const gameStarted = confidence !== null;
      const endeavorsExist = endeavors.length > 0;
      const activitiesExist = activities.length > 0;
      const questsExist = quests.length > 0;

      output.innerHTML = fill(this.template)({ confidence });

      select.hidden = gameStarted;
      startBtn.hidden = gameStarted;
      output.hidden = !gameStarted;
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
      scr.querySelector('form').reset();
    },
  },

  'endeavors': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
    },

    update(scr) {
      const buildRow = fill(this.template);
      const html = endeavors.map(buildRow).join('');

      scr.querySelector('tbody').innerHTML = html;
    },
  },

  'endeavor': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();

      scr.onsubmit = handleUpdateEndeavor;
    },

    update(scr, data) {
      const form = scr.querySelector('form');
      const html = fill(this.template)(data);

      form.innerHTML = html;
    },
  },

  'add-activity': {
    prep(scr) {
      scr.onsubmit = handleAddActivity;
    },

    update(scr) {
      scr.querySelector('form').reset();
    },
  },

  'activities': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
    },

    update(scr) {
      const buildRow = fill(this.template);
      const html = activities.map(buildRow).join('');

      scr.querySelector('tbody').innerHTML = html;
    },
  },

  'activity': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
      
      scr.onsubmit = handleUpdateActivity;
    },

    update(scr, data) {
      const form = scr.querySelector('form');
      const html = fill(this.template)(data);

      form.innerHTML = html;      
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
