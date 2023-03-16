import React from "react";
import CatCard from "../../components/catCard/CatCard";
import Featured from "../../components/featured/Featured";
import Features from "../../components/features/Features";
import ProjectCard from "../../components/projectCard/ProjectCard";
import Slide from "../../components/slider/Slider";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import { cards, projects } from "../../data";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard items={card} key={card.id} />
        ))}
      </Slide>
      <Features />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((project) => (
          <ProjectCard item={project} key={project.id} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
