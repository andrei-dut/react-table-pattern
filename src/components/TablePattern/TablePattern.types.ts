import { MutableRefObject } from 'react';

interface Row {
  id: string;
  [key: string]: string | number | boolean;
}

interface Cell {
  key: string;
  name?: string;
  className?: string;
  // [key: string]: string | number | boolean | undefined;
}

type Rows = Array<Row>;
type Cells = Array<Cell>;

type tableConfig = {
  rows: Rows;
  cells: Cells;
  isCell?: Record<string, boolean>;
  onClickRow?: (id: string | number) => void;
  updateCheckboxes?: (checkboxes: Array<string | number | undefined>) => void;
  onClearSelectCheckboxesRef?: MutableRefObject<() => void>;
};

export interface TablePatternProps {
  tableConfig: tableConfig;
}
