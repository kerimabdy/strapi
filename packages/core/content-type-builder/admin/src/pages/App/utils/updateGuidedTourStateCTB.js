const updateGuidedTourStateCTB = () => {
  const didAlreadyCreateAContentType = localStorage.getItem('GUIDED_TOUR_DID_CREATE_CT');
  const guidedTourPersistentState = JSON.parse(localStorage.getItem('GUIDED_TOUR_COMPLETED_STEPS'));

  const didCompletedCTBSection =
    guidedTourPersistentState.includes('contentTypeBuilder.create') &&
    guidedTourPersistentState.includes('contentTypeBuilder.create');

  if (didCompletedCTBSection && didAlreadyCreateAContentType) {
    localStorage.removeItem('GUIDED_TOUR_DID_CREATE_CT');
  }

  if (!didAlreadyCreateAContentType) {
    localStorage.setItem('GUIDED_TOUR_DID_CREATE_CT', true);
  }
};

export default updateGuidedTourStateCTB;
