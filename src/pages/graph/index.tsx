/*
 * @Date: 2021-12-06 11:31:51
 * @LastEditors: jcl
 * @LastEditTime: 2021-12-07 10:39:53
 * @FilePath: /umi-app/src/pages/graph/index.tsx
 */
import * as React from 'react';
import styles from './index.css';
import TransferTree from "./components/transferTree"
//@ts-ignore
import { data } from './data'

export default () => {
  return <div className={styles.normal}>
    <TransferTree data={data} />
  </div>
}
