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
      takeQuestBtn.hidden = !gameStarted || questsExist || !activitiesExist;
      questsBtn.hidden = !gameStarted || !questsExist || !activitiesExist;
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
      if (!endeavors.length) {
        return goTo.call(goBack, screens['main-menu']);
      }
      
      const buildRow = fill(this.template);
      const html = endeavors.map(buildRow).join('');

      scr.querySelector('tbody').innerHTML = html;
    },
  },

  'endeavor': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();

      scr.onclick = handleRemoveEndeavor;
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
      if (!activities.length) {
        return goTo.call(goBack, screens['main-menu']); /* mention */
      }
      
      const buildRow = fill(this.template);
      const html = activities.map(buildRow).join('');

      scr.querySelector('tbody').innerHTML = html;
    },
  },

  'activity': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
      
      scr.onclick = handleRemoveActivity;
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
      const form = scr.querySelector('form');

      this.template = scr.querySelector('template');
      this.template.remove();
      
      scr.onchange = handleNewQuestSelect;
      scr.onsubmit = handleAddQuest;
    },

    update(scr) {
      const form = scr.querySelector('form');
      const {activity, duration, start} = form;
      const availableActivities = activities.filter(act => act.difficulty <= confidence).sort((a, b) => a.difficulty - b.difficulty);
      const html = availableActivities.map(fill(this.template)).join('');
      
      scr.querySelector('form').reset();
      
      activity.innerHTML = activity.firstElementChild.outerHTML + html;
      duration.disabled = true;
      duration.innerHTML = duration.firstElementChild.outerHTML;
      start.disabled = true;
      start.innerHTML = start.firstElementChild.outerHTML;
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
