import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fields: [],
  },
  getters: {},
  mutations: {
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
    // Field
    addField(context, field) {
      context.commit('addField', field);
    },

    removeField(context, fieldId) {
      context.commit('removeField', fieldId);
    },

    changeField(context, field) {
      context.commit('changeField', field);
    },
    //Select Option

    addOption(context, { id, option }) {
      context.commit('addOption', { id, option });
    },
  },
  modules: {},
});
