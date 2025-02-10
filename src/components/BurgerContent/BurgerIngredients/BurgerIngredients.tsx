import React, { useRef, useState, useEffect } from "react";
import ingridient from "./ingridient.module.css";
import { Product } from "../../../types/productTypes";
import { IngredientsList } from "./IngredientsList";
import { IngredientModal } from "./IngredientModal";
import TabNavigation from "./TabNavigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../store/";
import { fetchIngredients } from "../../../store/slices/ingredientsSlice";
import { addProduct } from "../../../store/slices/orderSlice";

const BurgerIngredients: React.FC = ({}) => {
  const [current, setCurrent] = useState("bun"); // Первая вкладка bun
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Отвечает за открытие модального окна. Выбранный ингредиент
  const [isModalActive, setIsModalActive] = useState(false); // Состояние модального окна

  const dispatch = useDispatch<AppDispatch>();
  const { ingredients, isLoading, hasError } = useSelector(
    (state: RootState) => state.ingredients
  );
  useEffect(() => {
    dispatch(fetchIngredients()); // Подключаем ингредиенты из состояния
  }, [dispatch]);

  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null); // sauceRef отвечает за прокрутку к нужному элементу
  const mainRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (value: string) => {
    setCurrent(value); // value - это строка которая передается при клике на value
    switch (
      value // Switch проверяет и прокручивает на выбранный раздел
    ) {
      case "bun":
        bunRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauce":
        sauceRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "main":
        mainRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalActive(true);
  };

  // Добавляем товар в Redux
  const handleAddProduct = (product: Product) => {
    dispatch(addProduct(product));
    // console.log(dispatch(addProduct(product))); // Провека
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };

  return (
    <>
      <h1
        className={`mt-9 mb-6 text text_type_main-large ${ingridient.ingridientTitle}`}
      >
        Список продуктов
      </h1>
      <TabNavigation current={current} onTabClick={handleTabClick} />
      {/* Навигация по разделу */}

      {isLoading && <p>Загрузка...</p>}
      {hasError && <p>Произошла ошибка при загрузке ингредиентов</p>}

      <IngredientsList
        sortedProducts={ingredients}
        onProductClick={handleProductClick}
        onAddProduct={handleAddProduct} // Передаем функцию добавления заказа
        bunRef={bunRef}
        sauceRef={sauceRef}
        mainRef={mainRef}
      />

      {selectedProduct && (
        <IngredientModal
          product={selectedProduct}
          isActive={isModalActive}
          onClose={handleModalClose} // Закрыть модальное окно
        />
      )}
    </>
  );
};

export default BurgerIngredients;
