import React from "react";
import styles from "./Section.module.css"

interface SectionProps {
    title: string;
    children?: React.ReactNode;
}

const Section = (props: SectionProps) => {
    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.title} ${styles.line}`}>{props.title}</h2>
            <div>{props.children}</div>
        </div>
    );
};

export default Section;
