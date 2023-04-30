import { useState } from "react"
import cn from "classnames";
import s from './index.module.css';

export const Accordion = ({children, title}) => {
    const [selected, setSelected] = useState(false);

    function toggleState () {
        setSelected((state) => !state);
    }

    return (
        <div className={cn(s.accordion, {[s.active]: selected})}>
            <button className={s.accordionButton} onClick={() => toggleState()}>
                <p className={s.title}>{title}</p>
            </button>
            <div className={s.content}>
                <p className={s.text}>{children}</p>
            </div>
        </div>
    )
}