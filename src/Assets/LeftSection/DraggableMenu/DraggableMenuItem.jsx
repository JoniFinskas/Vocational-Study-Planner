import { classes } from '../../functions/classWrapper'
import { useRef } from 'react'
import { MdDragIndicator } from 'react-icons/md'
import { yhteisetTutkinnonosatIDs, isIDInTheList} from '../../functions/yhteisetTutkinnonOsat'

export default function DraggableMenuItem(props) {

    const dragItem = useRef(null)

    function selectedItemClassName() {
        return props.valitutOpinnot.indexOf(props.item.id) === -1
            ?
            props.itemClass.menuItem
            :
            classes(props.itemClass.menuItem, props.itemClass.selectedItem)
    }

    return (
        <div
            ref={dragItem}
            onMouseDown={(e) => {
                let scrollAmount = document.getElementById('opMenuHolder').scrollTop
                props.setMouseState(true)
                props.setOffsetPos({
                    x:e.clientX-dragItem.current.offsetLeft,
                    y:e.clientY-dragItem.current.offsetTop})
                props.setElem({
                    w:dragItem.current.offsetWidth,
                    h:dragItem.current.offsetHeight,
                    scrollY: scrollAmount,
                    id: props.item.id})
                props.setDragItem(dragItem)
                props.setTargetElementName('')
            }}
            className={selectedItemClassName()}>
                <div className={classes(props.itemClass.rowItem, props.itemClass.requiredColor,(props.item.required ? props.itemClass.pakollinen : props.itemClass.valinnainen))}></div>
                <div
                    className={classes(
                        props.itemClass.sqr,
                        isIDInTheList(yhteisetTutkinnonosatIDs, props.item.id) ? props.itemClass.yto : props.itemClass.amm
                    )}></div>
                <div className={props.itemClass.rowItem}>
                    <p>{props.item.name}</p>
                </div>
                <div className={classes(props.itemClass.rowItem, props.itemClass.op)}>
                    <span>{props.item.points}</span>
                </div>
                <MdDragIndicator style={{color: '#0000008e'}}/>
        </div>
    )
}
