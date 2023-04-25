import confiugureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const initState = {};
export const mockStore = confiugureStore(middlewares);
export let store = mockStore(initState);

export let storeNabvar = mockStore({ auth: { name: 'testing' } });
export let storeModal = mockStore({
  auth: {
    checking: true,
    uid: null
  },
  calendar: {
    event: [],
    activeEvent: {
      title: "Testing",
      notes:"This test should run correctly",
      start:"2022-06-02T12:45:00.000Z",
      end: "2022-06-02T13:00:00.000Z",
      user: {
        _id:"6285455405b1fddeb0b5a999",
        name:"Tester Pro"

      },
      id:"62978ddd74ecd43d8c87ea48",}
  },
  ui: {
    modalOpen: true
  }
})
export let storeAppRouter = mockStore({    
  auth: {
    checking: true,
    uid: null
  },
  calendar: {
    event: [],
    activeEvent: null
  },
  ui: {
    modalOpen: false
  }
});

export let storeAuth = mockStore({
  auth: {
    uid: null
  }
});

