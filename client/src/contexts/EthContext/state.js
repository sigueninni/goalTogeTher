const actions = {
  init: "INIT",
};

const initialState = {
  artifactSBT: null,
  web3: null,
  accounts: null,
  networkID: null,
  contractSBT: null
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
