import * as React from 'react';
import styles from './index.css';
import TransferTree from "./components/transferTree"
import { data } from './data'

export default ()=>{
  return <div className={styles.normal}>
    <TransferTree data={data} />
  </div>
}
