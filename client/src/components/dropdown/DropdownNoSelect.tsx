import * as React from 'react';
import './DropdownNoSelect.css';

export interface IDropdownNoSelectProps<T> {
    itemList: T[];
    renderItem: (item: T) => JSX.Element;
}

/**
 * Displays a dropdown list on hover. First element is always shown. When hovering over it, the other items in the
 * list will also show.
 * @param itemList list of items you want to show
 * @param renderItem function how each item should be rendered.
 */
export function DropdownNoSelect<T>({
    itemList,
    renderItem,
}: IDropdownNoSelectProps<T>): JSX.Element {
    return (
        <div className="dropdown-container">
            <div className="dropdown">
                <DropdownItem
                    item={itemList[0]}
                    renderItem={renderItem}
                    className="render-item first"
                />
                <div className="dropdown-content">
                    {itemList.slice(1, itemList.length).map((item) => (
                        <DropdownItem
                            key={JSON.stringify(item)}
                            renderItem={renderItem}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DropdownItem<T>({
    renderItem,
    item,
    className = 'render-item',
}: {
    renderItem: (item: T) => JSX.Element;
    item: T;
    className?: string;
}): JSX.Element {
    return <div className={className}>{renderItem(item)}</div>;
}
