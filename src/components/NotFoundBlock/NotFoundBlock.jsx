import React from 'react';
import styles from './NotFoundBlock.module.css';

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br></br>
        Ничего не найдено{' '}
      </h1>
      <p>К сожалению, данная страница отсутствует в нашем интернет-магазине.</p>
    </div>
  );
}
