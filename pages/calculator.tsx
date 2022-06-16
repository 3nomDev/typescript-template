import React, { FC, useState } from 'react';
import styles from './index.module.css';

enum modeEnum {
  setFirstValue = '[mode.setFirstValue]',
  setSecondValue = '[mode.setSecondValue]',
  displayResult = '[mode.displayResult]',
}

const Calculator: FC = () => {
  const [firstValue, setFirstValue] = useState<string>();
  const [secondValue, setSecondValue] = useState<string>();
  const [result, setResult] = useState<number>();
  const [sign, setSign] = useState<string>();
  const [mode, setMode] = useState<modeEnum>(modeEnum.setFirstValue);

  const handleInputValueChange = (value) => () => {
    if (mode === modeEnum.setFirstValue)
      setFirstValue(`${firstValue ?? ''}${value}`);
    if (mode === modeEnum.setSecondValue)
      setSecondValue(`${secondValue ?? ''}${value}`);
  };
  // const handleSign;
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputValue}>{firstValue}</div>
      <div className={styles.cellWrapper}>
        <div className={styles.cell} onClick={handleInputValueChange(1)}>
          1
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(2)}>
          2
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(3)}>
          3
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(4)}>
          4
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(5)}>
          5
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(6)}>
          6
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(7)}>
          7
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(8)}>
          8
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(9)}>
          9
        </div>
        <div className={styles.cell} onClick={handleInputValueChange(0)}>
          0
        </div>
      </div>
    </div>
  );
};

export default Calculator;
