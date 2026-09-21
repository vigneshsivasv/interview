import { useState } from "react";
import styled from "styled-components";

const accordionData = [
    {
        id: "react",
        title: "What is React?",
        content: "React is a JavaScript library for building user interfaces."
    },
    {
        id: "state",
        title: "What is state?",
        content: "State is data managed by a component that can change over time."
    },
    {
        id: "props",
        title: "What are props?",
        content: "Props are read-only data passed from parent to child."
    }
];

const AccordionTitle = styled.div`
    width: 100%;
    height: auto;
    padding: 8px 12px;
`;
const AccordionContnet = styled.div`
    padding: 8px 12px;
    border-radius: 12px;
    background: #eee;
`;

const Accordion = () => {
    const [accordionValue, setAccordionValue] = useState(accordionData);
    const [open, setOpen] = useState('');

    console.log(setAccordionValue);
    return (
        <div>
            {accordionValue.map((data) => {
                console.log("data.id === open.id", open)
                return (
                    <>
                        <AccordionTitle onClick={() => setOpen(data.id)}>
                            {data.title}
                        </AccordionTitle>
                        <AccordionContnet style={{
                            display: data.id === open ? 'flex' : 'none'
                        }}>
                            {data.content}
                        </AccordionContnet>
                    </>
                )
            })}
        </div>
    )
}

export default Accordion;