import React, { useEffect, useState } from 'react';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { useGuidedTour } from '@strapi/helper-plugin';

const GuidedTourModal = () => {
  const { currentStep, guidedTourState } = useGuidedTour();
  const [isVisible, setIsVisible] = useState(currentStep);

  useEffect(() => {
    if(!currentStep) {
      return;
    }

    const [section, step] = currentStep.split('.');
    const isStepDone = guidedTourState[section][step];

    if(!isStepDone) {
      setIsVisible(true);
    }
  }, [currentStep, guidedTourState]);

  return (
    isVisible && (
      <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
        <ModalHeader>
          <Typography fontWeight="bold" textColor="neutral800" as="h3" id="title">
            Title
          </Typography>
        </ModalHeader>
        <ModalBody>yolo</ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={() => setIsVisible(prev => !prev)} variant="tertiary">
              Cancel
            </Button>
          }
          endActions={<Button onClick={() => setIsVisible(prev => !prev)}>Finish</Button>}
        />
      </ModalLayout>
    )
  );
};

export default GuidedTourModal;
