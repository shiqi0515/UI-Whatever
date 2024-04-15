import React from "react";
import "./style/selectionLevels.css";
import { useLanguage } from "./LanguageProvider";
import Header from "./Header";

interface Level {
  id: number;
  name: string;
  difficulty: string;
  image: string;
}

interface LevelCardProps {
  level: Level;
}

const levels: Level[] = [
  {
    id: 0,
    name: "Tutorial",
    difficulty: "0",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 1,
    name: "If",
    difficulty: "1",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "While",
    difficulty: "1",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "For loop",
    difficulty: "2",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    name: "Switch",
    difficulty: "2",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    name: "Linear list",
    difficulty: "3",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    name: "Array",
    difficulty: "3",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 7,
    name: "Linked list",
    difficulty: "4",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 8,
    name: "Stack",
    difficulty: "4",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 9,
    name: "Queue",
    difficulty: "4",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 10,
    name: "Tree",
    difficulty: "5",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 11,
    name: "Graph",
    difficulty: "5",
    image: "https://via.placeholder.com/300",
  },
];

interface StarsProps {
  count: number;
}

const Stars: React.FC<StarsProps> = ({ count }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < count ? "★" : "☆");
  }
  return <p>{stars.join(" ")}</p>;
};

const LevelCard: React.FC<LevelCardProps> = ({ level }) => {
  const handlePlayClick = () => {
    // Handle play button click here
    console.log(`Play button clicked for level ${level.id}`);
  };
  const { translate } = useLanguage(); // Use the hook here

  return (
    <div className="level-card">
      <img src={level.image} alt={level.name} />
      <h2>{level.name}</h2>
      <Stars count={+level.difficulty} />
      <button onClick={handlePlayClick}>{translate("play")}</button>
    </div>
  );
};

function SelectionLevels() {
  const { translate } = useLanguage(); // Use the hook here
  return (
    <div>
      <Header title={translate("levels")} />
      <div className="levels-container">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

export default SelectionLevels;
