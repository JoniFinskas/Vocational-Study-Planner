import { useRef } from 'react'
import { AiFillMinusCircle } from 'react-icons/ai';
import { MdDragIndicator } from 'react-icons/md'
import { classes } from '../../../../../functions/classWrapper'
import CalendarPeriodStyle from '../CalendarPeriodStyle.module.css';
import { yhteisetTutkinnonosatIDs, isIDInTheList} from '../../../../../functions/yhteisetTutkinnonOsat'

export default function DraggablePeriodItem(props) {

    const dragItem = useRef(null)

    return (
        <div
            ref={dragItem}
            onMouseDown={(e) => {
                props.setMouseState(true)
                props.setOffsetPos({
                    x:e.clientX-dragItem.current.offsetLeft,
                    y:e.clientY-dragItem.current.offsetTop})
                props.setElem({
                    w:dragItem.current.offsetWidth,
                    h:dragItem.current.offsetHeight,
                    scrollY: 0,
                    id: props.item.id})
                props.setDragItem(dragItem)
                props.setTargetElementName('')
                props.setParentElementName()
            }}
            className={CalendarPeriodStyle.menuItem}>
                <MdDragIndicator style={{color: '#0000008e'}}/>
                <div className={classes(CalendarPeriodStyle.rowItem, CalendarPeriodStyle.requiredColor,(props.item.required ? CalendarPeriodStyle.pakollinen : CalendarPeriodStyle.valinnainen))}></div>
                <div
                    className={classes(
                        CalendarPeriodStyle.sqr,
                        isIDInTheList(yhteisetTutkinnonosatIDs, props.item.id) ? CalendarPeriodStyle.yto : CalendarPeriodStyle.amm
                    )}></div>
                <div className={CalendarPeriodStyle.rowItem}>
                    <p>{props.item.name}</p>
                </div>
                <div className={classes(CalendarPeriodStyle.rowItem, CalendarPeriodStyle.op)}>
                    <span>{props.item.points}</span>
                </div>
                <button
                    onClick={() => props.removeItem()}
                    title={'poista ' + props.item.name}
                    className={CalendarPeriodStyle.removeItemBtn}>
                    <AiFillMinusCircle />
                </button>
        </div>
    )
}
