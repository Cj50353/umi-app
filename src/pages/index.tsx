import Link from 'umi/link';
import React from 'react';

import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <h1>Page index</h1>
      <div><Link to="./users">go to /users</Link></div>
      <div><Link to="./graph/index">go to /Graph</Link></div>
    </div>
  );
}

