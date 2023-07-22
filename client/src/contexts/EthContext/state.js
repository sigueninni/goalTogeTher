const actions = {
  init: "INIT",
};

const initialState = {
  artifactSBT: null,
  artifactCHL: null, 
  artifactChlDex: null,
  artifactChlChainChallengeNFT: null,
  artifactMarketPlace : null,
  web3: null,
  accounts: null,
  networkID: null,
  contractSBT: null,
  contractCHL: null, 
  contractChlDex: null,
  contractChlChainChallengeNFT :null,
  contractMarketPlace :null,
  owner: null,
  sounder: null,
  Challengeed: null
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
