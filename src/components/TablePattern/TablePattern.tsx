import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SelectSvg } from '../../assets/icons/select.svg';
import { ReactComponent as UnselectSvg } from '../../assets/icons/unselect.svg';
import ScrollContainer from '../ScrollContainer/ScrollContainer';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import { getPropertyByString } from '../../utils';
import { TablePatternProps } from './TablePattern.types';
import { CheckedCb } from '../CustomCheckbox/CustomCheckbox.types';
// example use

const TablePattern = ({ tableConfig }: TablePatternProps) => {
  const {
    rows = [],
    cells = [],
    onClickRow,
    isCell,
    updateCheckboxes,
    onClearSelectCheckboxesRef,
  } = tableConfig;

  const [checkedCheckboxes, setCheckedCheckboxes] = useState<Array<string | number | undefined>>(
    [],
  );
  const handlerCheckbox: CheckedCb = useCallback(
    (isChecked, id) => {
      const allIds = rows.map((row, i) => row.id || i);
      if (id === 'headCheckbox') {
        setCheckedCheckboxes(isChecked ? allIds : []);
        // tableConfig.checked
      } else {
        setCheckedCheckboxes((prevCheckboxes) => {
          if (isChecked) {
            const rowsLength = rows.length;
            const allLengthPrev = prevCheckboxes.length + 1;

            return rowsLength === allLengthPrev ? allIds : [...prevCheckboxes, id];
          } else {
            return prevCheckboxes.filter((checkboxId) => checkboxId !== id);
          }
        });
      }
    },
    [rows],
  );

  const hanlderClickRow = (rowId: string | number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClickRow?.(rowId);
  };

  useEffect(() => {
    if (updateCheckboxes) updateCheckboxes(checkedCheckboxes);
  }, [checkedCheckboxes, updateCheckboxes]);

  useEffect(() => {
    if (onClearSelectCheckboxesRef)
      onClearSelectCheckboxesRef.current = () => setCheckedCheckboxes([]);
  }, [onClearSelectCheckboxesRef, setCheckedCheckboxes]);

  return (
    <WrapTable className="wrap-table">
      <div className="table-head">
        <div className="header-row">
          {cells.map((cell, ind) =>
            cell.name === 'checkbox' ? (
              <div className="header-cell checkbox" key={ind}>
                <CustomCheckbox
                  _isChecked={rows?.length ? checkedCheckboxes?.length === rows?.length : undefined}
                  onCheckedCb={rows?.length ? handlerCheckbox : undefined}
                  id="headCheckbox"
                />
              </div>
            ) : (
              <div key={ind} className={`header-cell ${cell.className || ''}`}>
                {cell.name}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="table-body">
        <ScrollContainer>
          {rows.map((row, i) => (
            <div className="body-row" key={row.id || i} onClick={hanlderClickRow(row.id)}>
              {cells.map((cell, ind) =>
                cell.name === 'checkbox' ? (
                  <div className="body-cell checkbox" key={`${row.id}-${ind}`}>
                    <CustomCheckbox
                      onCheckedCb={handlerCheckbox}
                      id={row.id || i}
                      _isChecked={checkedCheckboxes.some((el) => el === (row.id || i))}
                    />
                  </div>
                ) : (
                  <div
                    key={`${row.id}-${ind}`}
                    className={`body-cell${cell.className ? ' ' + cell.className : ''}`}
                  >
                    {isCell?.[cell.key] ? (
                      row[cell.key] ? (
                        <SelectSvg />
                      ) : (
                        <UnselectSvg />
                      )
                    ) : cell.key === '№' ? (
                      <Fragment>{i + 1}</Fragment>
                    ) : (
                      <Fragment>{getPropertyByString(cell.key, row) || '-'}</Fragment>
                    )}
                  </div>
                ),
              )}
            </div>
          ))}
        </ScrollContainer>
      </div>
    </WrapTable>
  );
};

export default React.memo(TablePattern);

const WrapTable = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  font-weight: 600;
  .table-head,
  .table-body {
    padding: 16px;
  }

  .table-head {
    padding-top: 28px;
    padding-bottom: 0px;
  }
  .table-body {
    border-radius: 8px;
    border: 1px solid #000;
    background: #121212e6;
    position: relative;
    flex: 1;
  }

  .header-row {
    border: 1px solid #00000000;
    user-select: none;
  }

  .header-row,
  .body-row {
    display: flex;
    padding-left: 12px;
    justify-content: space-between;
    align-items: center;
  }

  .body-row {
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: #1e1e1e;
    margin-top: 12px;
    width: 100%;
    &:first-child {
      margin-top: 0;
    }
  }

  .header-cell,
  .body-cell {
    flex: 1;
    padding: 12px 12px 12px 0;
    &.checkbox {
      flex: 0;
    }
    &.flex-0_5 {
      flex: 0.5;
    }
  }
  .body-cell {
    font-size: 12px;
  }
  .header-cell {
    font-size: 11px;
    padding-top: 0;
  }
`;
