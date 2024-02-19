import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  CheckboxContainerProps,
  CheckboxStyleProps,
  fcStateCheckbox,
} from './CustomCheckbox.types';
import { ReactComponent as TickSvg } from '../../assets/icons/tick.svg';

const CheckboxContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isChecked'].includes(prop),
})<CheckboxStyleProps>`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: ${(props) =>
    `1.5px solid ${
      !props.isChecked ? '#ffffff4d' : props.isChecked === 'intermediate' ? '#FFD700' : '#4F48AA'
    }`};
  background: ${(props) =>
    !props.isChecked ? '#171717' : props.isChecked === 'intermediate' ? '#FFD700' : '#4F48AA'};
  cursor: pointer;
`;

const CustomCheckbox = React.memo(
  ({ onCheckedCb, _isChecked, id, defChecked, treeState }: CheckboxContainerProps) => {
    const [isChecked, setIsChecked] = useState<boolean | string | null>(defChecked || null);
    // console.log('id-'+id, 'value-'+_isChecked);
    const { current: isParentState } = useRef(_isChecked !== undefined);

    const handleCheckboxChange = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const getStateCheckbox: fcStateCheckbox = (currentState) => {
          if (treeState) {
            return !currentState ? true : currentState === true ? 'intermediate' : false;
          } else {
            return !currentState;
          }
        };
        e.stopPropagation();
        if (isParentState) {
          onCheckedCb?.(getStateCheckbox(_isChecked), id);
        } else {
          setIsChecked(getStateCheckbox);
        }
      },
      [_isChecked, id, isParentState, onCheckedCb, treeState],
    );

    useEffect(() => {
      if (isChecked === null || isParentState) return;
      onCheckedCb?.(isChecked, id);
    }, [isChecked, onCheckedCb, id, isParentState]);

    return (
      <CheckboxContainer
        isChecked={isParentState ? _isChecked : isChecked}
        onClick={handleCheckboxChange}
      >
        {((isParentState ? _isChecked : isChecked) && <TickSvg />) || null}
      </CheckboxContainer>
    );
  },
);

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;
