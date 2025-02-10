import React, { useState, useEffect } from "react";
import { Product } from "../../../types/productTypes";
import {
  ConstructorElement,
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalWindow from "../../../utils/ModalWindow/ModalWindow";
import styles from "./burgerStyles.module.css";
import CheckMark from "./SVG/CheckMark";
import {
  createOrder,
  removeProduct,
  clearOrder,
} from "../../../store/slices/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

const BurgerConstructor: React.FC = ({}) => {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order.order);
  const totalPrice = useSelector((state: RootState) => state.order.totalPrice);
  const totalCalories = useSelector(
    (state: RootState) => state.order.totalCalories
  ); // Считаем калории
  const orderNumber = useSelector(
    (state: RootState) => state.order.orderNumber
  );
  const [modalActive, setIsModalActive] = useState(false);

  const handleCreateOrder = () => {
    dispatch(createOrder()); // Генерация номера заказа
    setIsModalActive(true);
  };
  // Функция для закрытия модального окна
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  const handleModalKeyClose = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleModalKeyClose);
    return () => {
      document.removeEventListener("keydown", handleModalKeyClose);
    };
  });

  return (
    <>
      <section className={styles.contentConstructor}>
        <div>
          <h2 className="text text_type_main-medium">
            Ваш бургер: {totalCalories > 0 ? ` Калории: ${totalCalories}` : ""}
            {/* Если totalCalories  больше 0 то показываем  Калории: ${totalCalories} */}
          </h2>
          {order.length > 0 ? (
            <div className={styles.orderList}>
              {order.map((item, index) => (
                <div
                  key={index}
                  className={styles.orderItem}
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => dispatch(removeProduct(index))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text text_type_main-default">Выберите ингредиенты</p>
          )}
        </div>
      </section>
      <section className={`ml-1 mr-1 mb-1 mt-9 ${styles.boxForButton}`}>
        <div className={styles.footerOrder}>
          <div>
            <p className="text text_type_digits-medium">{totalPrice}</p>
          </div>
          <div>
            <CurrencyIcon type="primary" />
          </div>

          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleCreateOrder}
          >
            Оформить заказ
          </Button>

          {order.length > 0 && (
            <Button
              type="primary"
              size="large"
              onClick={() => dispatch(clearOrder())}
              htmlType={"reset"}
            >
              Очистить заказ
            </Button>
          )}
        </div>
      </section>

      {/* Модальное окно */}
      <ModalWindow active={modalActive} setActive={setIsModalActive}>
        <div className={styles.boxModalClose}>
          {/* <div className={`p-2`} style={{ cursor: "pointer" }}>
            <CloseIcon type="primary" onClick={() => handleModalClose()} />
          </div> */}
        </div>
        <p className="mt-8 text text_type_digits-large"> {orderNumber}</p>
        <p className="mb-10 text text_type_main-medium">Идентификатор заказа</p>
        <div>
          <CheckMark />
        </div>

        <p className="mt-10 text text_type_main-small">
          {" "}
          {totalCalories > 0 && (
            <p className="mt-10 text text_type_main-small">
              {totalCalories} калорий
            </p>
          )}
          Ваш заказ начали готовить
        </p>
        <p className=" mt-2 text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </ModalWindow>
    </>
  );
};
export default BurgerConstructor;
