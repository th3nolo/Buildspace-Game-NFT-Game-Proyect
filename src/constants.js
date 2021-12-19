const CONTRACT_ADDRESS = '0xeB65390F221F2e536dbe4869Fba69e7B48C45118';

const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI    
  };
};

export { CONTRACT_ADDRESS, transformCharacterData };