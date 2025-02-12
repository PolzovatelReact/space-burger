import { useState } from "react";

const content = [
  { title: "1An update", text: "It's been a while since I posted..." },
  { title: "2My new blog", text: "I am starting a new blog!" },
  { title: "Question 2", text: "Answer 2" },
  { title: "Question 3", text: "Answer 3" },
];

const Question: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <ul>
        {content.map((item, index) => (
          <li
            key={item.title}
            onClick={() => setActive(active === index ? null : index)}
          >
            <h3> {item.title}</h3>
            {index === active && <div> {item.text}</div>}
            {/* Показывать только при активности*/}
          </li>
        ))}
      </ul>
    </>
  );
};
export default Question;
