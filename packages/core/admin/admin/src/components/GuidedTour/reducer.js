/* eslint-disable consistent-return */
import produce from 'immer';

export const initialState = {
  currentStep: 'wdjfh',
  guidedTourState: {
    contentTypeBuilder: {
      create: false,
      success: false,
    },
    contentManager: {
      create: false,
      success: false,
    },
    apiTokens: {
      create: false,
      success: false,
    },
  },
  isActive: true,
  isGuidedTourVisible: false,
};

const reducer = (state = initialState, action) =>
  produce(state, draftState => {
    switch (action.type) {
      case 'SET_CURRENT_STEP': {
        draftState.currentStep = action.step;
        break;
      }
      case 'SET_GUIDED_TOUR_VISIBILITY': {
        draftState.isGuidedTourVisible = action.value;
        break;
      }
      case 'SET_IS_ACTIVE': {
        draftState.isActive = action.value;
        break;
      }
      default: {
        return draftState;
      }
    }
  });

export default reducer;
