import React, { useEffect, useState } from "react";

interface Ingredient {
  _id: string;
  name: string;
  image: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

const FetchData = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true); // Включить состояние загрузки
    fetch("https://norma.nomoreparties.space/api/ingredients") //Отправляем Http  запрос на сервер
      .then((responses) => {
        if (!responses.ok) {
          // Проверяет успешен ли ответ от сервера. Если ошибка
          throw new Error(`Ошибка`); // Выбрасывает ошибку
        }
        return responses.json();
      })
      .then((datas) => {
        if (datas.success) {
          setIngredients(datas.data); // Запись данных
        } else {
          throw new Error(`Ошибка при получении данных`); // Выбрасывает ошибку
        }
      })
      .catch((error) => setError(error.message)) // Ловит ошибку
      .finally(() => setLoading(false)); // Снимает состояние загрузки
  }, []);

  if (loading) return <p>загрузка ингредиентов...</p>;
  if (error) return <p> Ошибка {error}</p>;
  return (
    <>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {ingredients.map(
          (
            ingredients // используем метод map для вывода значений
          ) => (
            <li
              key={ingredients._id}
              style={{
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={ingredients.image}
                alt={ingredients.name}
                width="50"
                height="50"
                style={{ marginRight: "10px" }}
              />
              <strong>{ingredients.name}</strong> - {ingredients.calories} ккал
            </li>
          )
        )}
      </ul>
    </>
  );
};
export default FetchData;
