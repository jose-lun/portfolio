import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import "../styles/Experience.css";

function Experience() {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#3e497a">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2022 - Present"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element--title">
            Tutor - Vault Prep, Inc.
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Los Angeles, CA
          </h4>
          <ul>
            <li>
            Instruct high school students in topics including Calculus, Computer Science, Languages and Test preparation
            </li>
            <li>
            Infuse teaching with enthusiasm, novel perspectives, and a focus on fundamental learning skills
            </li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2019 - 2021"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element--title">Data Engineer - Facebook, Inc.</h3>
          <h4 className="vertical-timeline-element-subtitle">
            Menlo Park, CA
          </h4>
          <ul>
            <li>
            Developed efficient and scalable pipelines to transform terabytes of raw logs into useful core datasets
            </li>
            <li>
            Designed and built STAR schema data models for the Supply Chain Engineering team
            </li>
            <li>
            Built real-time interactive dashboards to track and analyze key metrics
            </li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="June 2017 - Aug. 2017"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element--title">
            Data Science Intern - Fox Networks Group
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Los Angeles, CA
          </h4>
          <ul>
            <li>
            Performed analysis and visualization of large datasets to improve and streamline business decisions
            </li>
            <li>
            Designed and built STAR schema data models for the Supply Chain Engineering team
            </li>
            <li>
            Built a mathematical model in Python to predict future IT project costs
            </li>
          </ul>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2015 - 2019"
          iconStyle={{ background: "#e9d35b", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element--title">
            University of California, Berkeley
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Bachelor of Arts
          </h4>
          <p>
            Computer Science
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
