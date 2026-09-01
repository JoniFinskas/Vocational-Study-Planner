/** Passes each selected list item's data value to the supplied action. */

import { useState } from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

export default function DropdownMenu (props) {

    const [toggleState, setShowState] = useState('hide')

    const toggle = () => {
        setShowState(toggleValue => {
            return toggleValue === 'hide' ? 'show' : 'hide';
        })
    }

    const createList = () => {
        return props.list.map((item, i) => (
            <li key={'li'+i}>
                <button
                    key={'btn'+i}
                    onClick={() => {props.func(item.data);toggle()}}>
                        {item.icon} {item.text}
                </button>
            </li>
        ))
    }

    return (
        <div className={"toggleMenu "+toggleState+" "+props.menuClass}>
            <button className={props.toggleClass} onClick={() => toggle()}>{props.name} {toggleState === 'hide' ? <RiArrowDownSLine /> : <RiArrowUpSLine /> }</button>
            <div className={"slideBox "+props.slideClass}>
                <ul>
                    {createList()}
                </ul>
            </div>
        </div>
    )

}
