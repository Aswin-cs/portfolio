import React from 'react';
import './SkillCard.css';

const renderDots = (proficiency = 5, max = 5) => {
  return Array.from({ length: max }, (_, i) => (
    <span
      key={i}
      className={`skill-card__dot ${i < proficiency ? 'skill-card__dot--filled' : 'skill-card__dot--empty'}`}
    />
  ));
};

export const SkillCard = ({
  title = "Programming skills",
  subtitle = "Languages and databases I use, grouped by where they run.",
  categories = [],
  totalSkills
}) => {
  const calculatedTotal = totalSkills ?? categories.reduce((acc, cat) => acc + (cat.skills?.length ?? 0), 0);

  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <div className="skill-card__header-left">
          <h2 className="skill-card__title">{title}</h2>
          <p className="skill-card__subtitle">{subtitle}</p>
        </div>
        <div className="skill-card__header-right">
          <div className="skill-card__count-number">{calculatedTotal}</div>
          <div className="skill-card__count-label">skills</div>
        </div>
      </div>

      <div className="skill-card__divider" />

      <div className="skill-card__rows">
        {categories.map((category, catIndex) => (
          <div className="skill-card__category-row" key={category.title || catIndex}>
            <div className="skill-card__category-name-wrapper">
              <h3 className="skill-card__category-title">{category.title}</h3>
            </div>
            <div className="skill-card__skills-wrap">
              {category.skills?.map((skill, skillIndex) => {
                const name = typeof skill === 'string' ? skill : skill.name;
                const proficiency = typeof skill === 'object' ? (skill.proficiency ?? 5) : 5;
                return (
                  <span
                    className="skill-card__skill-pill"
                    key={name || skillIndex}
                    tabIndex={0}
                    title={`${name} (Proficiency: ${proficiency}/5)`}
                  >
                    <span className="skill-card__pill-name">{name}</span>
                    <span className="skill-card__pill-dots" aria-hidden="true">
                      {renderDots(proficiency)}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;
