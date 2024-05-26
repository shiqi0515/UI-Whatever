import React from "react";
import "./style/selectionLevels.css";
import { useLanguage } from "./LanguageProvider";
import Header from "./Header";
import image from "./images/level_image.webp";

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
    name: "tutorial",
    difficulty: "0",
    image: image,
  },
  {
    id: 1,
    name: "if",
    difficulty: "1",
    image: image,
  },
  {
    id: 2,
    name: "while",
    difficulty: "1",
    image: image,
  },
  {
    id: 3,
    name: "for_loop",
    difficulty: "2",
    image: image,
  },
  {
    id: 4,
    name: "switch",
    difficulty: "2",
    image: image,
  },
  {
    id: 5,
    name: "linear_list",
    difficulty: "3",
    image: image,
  },
  {
    id: 6,
    name: "array",
    difficulty: "3",
    image: image,
  },
  {
    id: 7,
    name: "linked_list",
    difficulty: "4",
    image: image,
  },
  {
    id: 8,
    name: "stack",
    difficulty: "4",
    image: image,
  },
  {
    id: 9,
    name: "queue",
    difficulty: "4",
    image: image,
  },
  {
    id: 10,
    name: "tree",
    difficulty: "5",
    image: image,
  },
  {
    id: 11,
    name: "graph",
    difficulty: "5",
    image: image,
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

  const translatedLevels = levels.map((level) => ({
    ...level,
    name: translate(level.name),
  }));
  return (
    <div className="main_container">
      <Header title={translate("levels")} />

      <div className="levels-container">
        {translatedLevels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

export default SelectionLevels;
