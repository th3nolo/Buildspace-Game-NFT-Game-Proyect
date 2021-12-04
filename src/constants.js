const CONTRACT_ADDRESS = '0xaad135C461961420b9e5198eEe578dA822b848E9';

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI    
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };