import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import './UpButton.css';

function UpButton() {
  const [isShowButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {isShowButton && (
        <button onClick={handleClick} className="upBtn">
          <FontAwesomeIcon icon={faChevronUp as IconProp} />
        </button>
      )}
    </>
  );
}

export default UpButton;
