import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    forms: [],
    fields: [],
    currentFormId: null,
  },
  getters: {},
  mutations: {
    // forms

    addFieldsToForms(state, form) {
      if (state.forms.find((item) => item.id === form.id)) {
        state.forms = state.forms.map((item) => {
          if (item.id === form.id) {
            return form;
          }
          return item;
        });
      } else {
        state.forms.push(form);
      }

      state.currentFormId = null;
    },

    deleteForm(state, formId) {
      state.forms = state.forms.filter((form) => form.id !== formId);
    },

    editForm(state, formId) {
      state.fields = state.forms.find((form) => form.id === formId).fields;
      state.currentFormId = formId;
    },

    // Fields
    addField(state, field) {
      state.fields.push(field);
    },
    removeField(state, fieldId) {
      state.fields = state.fields.filter((field) => field.id !== fieldId);
    },
    changeField(state, field) {
      state.fields = state.fields.map((item) => {
        if (item.id === field.id) {
          return field;
        }

        return item;
      });
    },

    clearFields(state) {
      state.fields = [];
      state.currentFormId = null;
    },
    // Select option
    addOption(state, { id, option }) {
      state.fields = state.fields.map((field) => {
        if (field.id === id) {
          return { ...field, options: field.options ? [...field.options, option] : [option] };
        }

        return field;
      });
    },
  },
  actions: {
    // Forms
    addFieldsToForms(context, form) {
      context.commit('addFieldsToForms', form);
    },

    deleteForm(context, formId) {
      context.commit('deleteForm', formId);
    },

    editForm(context, formId) {
      context.commit('editForm', formId);
    },

    // Fields
    addField(context, field) {
      context.commit('addField', field);
    },

    removeField(context, fieldId) {
      context.commit('removeField', fieldId);
    },

    changeField(context, field) {
      context.commit('changeField', field);
    },

    clearFields(context) {
      context.commit('clearFields');
    },
    //Select Option

    addOption(context, { id, option }) {
      context.commit('addOption', { id, option });
    },
  },
  modules: {},
});
