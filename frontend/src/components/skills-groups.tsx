import { skills } from "@/data/site";
import { TechnologyLogo } from "@/components/technology-logo";

export function SkillsGroups() {
  return (
    <div className="skills-groups">
      {skills.map((group) => (
        <section className="skills-group" key={group.title} aria-label={group.title}>
          <div className="skills-group-head">
            <h2>{group.title}</h2>
            <span>{String(group.items.length).padStart(2, "0")}</span>
          </div>
          <ul>
            {group.items.map((name) => (
              <li key={name}>
                <TechnologyLogo name={name} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}