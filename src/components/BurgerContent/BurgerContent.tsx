import BurgerConstructor from "./BurgerConstructor";
import BurgerIngridients from "./BurgerIngredients";
import styles from "./styles.module.css";
// import React, { useState } from "react";
// import { Product } from "../../types/productTypes";

const BurgerContent = () => {
  //  const [order, setOrder] = useState<Product[]>([]); //  Подняли состояние заказа

  // // 🆕 Функция для добавления ингредиентов
  // const handleAddProduct = (product: Product) => {
  //   setOrder((prevOrder) => [...prevOrder, product]);
  // };

  // const handleRemoveProduct = (indexToRemove: number) => {
  //   setOrder((prevOrder) =>
  //     prevOrder.filter((_, index) => index !== indexToRemove)
  //   );
  // };
  return (
    <div className={styles.burgerContent}>
      <div>
        <BurgerIngridients />
      </div>
      <div>
        <BurgerConstructor />
      </div>
    </div>
  );
};
export default BurgerContent;
