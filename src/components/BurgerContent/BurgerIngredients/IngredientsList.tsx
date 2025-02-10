import React from "react";
import { Product } from "../../../types/productTypes";
import ingridient from "./ingridient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IngredientListProps {
  sortedProducts: Product[];
  onProductClick: (product: Product) => void;
  onAddProduct: (product: Product) => void; //Обработчик добавления
  bunRef: React.RefObject<HTMLDivElement>;
  sauceRef: React.RefObject<HTMLDivElement>;
  mainRef: React.RefObject<HTMLDivElement>;
}

export const IngredientsList: React.FC<IngredientListProps> = ({
  sortedProducts,
  onProductClick,
  onAddProduct,
  bunRef,
  sauceRef,
  mainRef,
}) => {
  return (
    <section className={ingridient.ingridients}>
      <div className="mt-9 mb-9" ref={bunRef}>
        <h2
          className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
        >
          Булки
        </h2>
        <ul className={ingridient.ingridientsContainer}>
          {sortedProducts
            .filter((product) => product.type === "bun")
            .map((product) => (
              <li className={ingridient.ingridientsItem} key={product._id}>
                <img
                  className="ml-2 mr-2"
                  src={product.image}
                  alt={product.name}
                />
                <div className={ingridient.priceBox}>
                  <p className="text text_type_main-default">{product.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
                <h3 className="text text_type_main-default">{product.name}</h3>
                <div className={ingridient.buttonGroup}>
                  <button onClick={() => onProductClick(product)}>
                    Подробнее
                  </button>
                  <button onClick={() => onAddProduct(product)}>
                    Добавить
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div ref={sauceRef}>
        <h2
          className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
        >
          Соусы
        </h2>
        <ul className={ingridient.ingridientsContainer}>
          {sortedProducts
            .filter((product) => product.type === "sauce")
            .map((product) => (
              <li className={ingridient.ingridientsItem} key={product._id}>
                <img
                  className="ml-2 mr-2"
                  src={product.image}
                  alt={product.name}
                />
                <div className={ingridient.priceBox}>
                  <p className="text text_type_main-default">{product.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
                <h3 className="text text_type_main-default">{product.name}</h3>
                <div className={ingridient.buttonGroup}>
                  <button onClick={() => onProductClick(product)}>
                    Подробнее
                  </button>
                  <button onClick={() => onAddProduct(product)}>
                    Добавить
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div ref={mainRef}>
        <h2
          className={`text text_type_main-medium ${ingridient.ingridientTitle}`}
        >
          Начинки
        </h2>
        <ul className={ingridient.ingridientsContainer}>
          {sortedProducts
            .filter((product) => product.type === "main")
            .map((product) => (
              <li className={ingridient.ingridientsItem} key={product._id}>
                <img
                  className="ml-2 mr-2"
                  src={product.image}
                  alt={product.name}
                />
                <div className={ingridient.priceBox}>
                  <p className="text text_type_main-default">{product.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
                <h3 className="text text_type_main-default">{product.name}</h3>
                <div className={ingridient.buttonGroup}>
                  <button onClick={() => onProductClick(product)}>
                    Подробнее
                  </button>
                  <button onClick={() => onAddProduct(product)}>
                    Добавить
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
