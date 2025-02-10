import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ModalOverlay from "./ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalWindowProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  active,
  setActive,
  children,
}) => {
  useEffect(() => {
    // Если модальное окно активно, добавляем обработчик нажатия клавиши Esc
    const handleModalKeyClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("keydown", handleModalKeyClose);
    }

    return () => {
      document.removeEventListener("keydown", handleModalKeyClose);
    };
  }, [active, setActive]);

  return (
    <>
      {active && <ModalOverlay onClick={() => setActive(false)} />}
      <div
        className={active ? `${styles.modal} ${styles.active}` : styles.modal}
        onClick={() => setActive(false)}
      >
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.boxModalClose}>
            <div className={`p-2 ${styles.pointer}`}>
              <CloseIcon type="primary" onClick={() => setActive(false)} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
