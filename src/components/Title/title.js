import React, { useEffect } from 'react';
import styles from './title.module.css'

function Title() {
  const GuideTitle = 'P-bank';

  useEffect(() => {
    document.title = GuideTitle;

    return () => {
      document.title = 'P-bank';
    };
  }, []);

  return (
    <main>
      <div className={styles.Title}>
        {GuideTitle}
      </div>
    </main>
    
  );
}

export default Title;
