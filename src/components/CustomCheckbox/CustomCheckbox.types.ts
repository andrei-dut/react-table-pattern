export type fcStateCheckbox = (
  currentState?: boolean | string | true | null | false,
) => true | string | false;

export type CheckedCb = (a?: boolean | string, id?: string | number) => void;

export interface CheckboxContainerProps {
  onCheckedCb?: CheckedCb;
  _isChecked?: boolean;
  defChecked?: boolean;
  treeState?: boolean;
  id?: string | number;
  isChecked?: boolean | string | null;
}

export interface CheckboxStyleProps {
  isChecked?: boolean | string | null;
}
