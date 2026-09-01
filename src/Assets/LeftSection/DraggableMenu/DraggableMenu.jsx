import DraggableMenuItem from './DraggableMenuItem'

export default function DraggableMenu(props) {

    const createList = () => {
        return props.list.map((item, i) => {

            if(item.to_children && item.to_children.length > 0) {
                const list_of_menuitems = [
                <b key={i+'-'} className={props.itemClass.subTitle}>
                    <span>{item.name}</span>
                    <span>{item.points}</span>
                </b>
            ]
                return [...list_of_menuitems, ...item.to_children.map((child, b) => (
                    <DraggableMenuItem
                        valitutOpinnot={props.valitutOpinnot}
                        key={i+'-'+b}
                        setMouseState={props.setMouseState}
                        setDragItem={props.setDragItem}
                        setOffsetPos={props.setOffsetPos}
                        setElem={props.setElem}
                        item={child}
                        itemClass={props.itemClass}
                        setTargetElementName={props.setTargetElementName}
                    />
                ))]

            }
            else
                return <DraggableMenuItem
                    valitutOpinnot={props.valitutOpinnot}
                    key={i}
                    setMouseState={props.setMouseState}
                    setDragItem={props.setDragItem}
                    setOffsetPos={props.setOffsetPos}
                    setElem={props.setElem}
                    item={item}
                    itemClass={props.itemClass}
                    setTargetElementName={props.setTargetElementName}
                />
        })
    }

    return(
        <div className={props.menuClass.container}>
            <div className={props.menuClass.dragHeader}>
                <p>{props.name}</p>
            </div>

            <div className={props.menuClass.list}>
                {createList()}
            </div>
        </div>
    )
}