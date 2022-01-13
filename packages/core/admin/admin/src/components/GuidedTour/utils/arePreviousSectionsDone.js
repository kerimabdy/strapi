export const arePreviousSectionsDone = (sectionStep, guidedTourState) => {
  if (!sectionStep) {
    return false;
  }

  const [section] = sectionStep.split('.');
  const guidedTourArray = Object.entries(guidedTourState);

  // Find current section step position in the guidedTourArray
  // Get only previous sections based on current section step position
  const currentSectionIndex = guidedTourArray.findIndex(([key]) => key === section);
  const previousSections = guidedTourArray.slice(0, currentSectionIndex);

  // Check if every steps from previous section are done
  return previousSections.every(([, sectionValue]) =>
    Object.entries(sectionValue).every(([, stepValue]) => stepValue)
  );
};
