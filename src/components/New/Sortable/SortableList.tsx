import { FC } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

export type SortableItemProps = {
  id: string | number;
};

export type SortableListProps<T extends SortableItemProps> = {
  items: T[];
  onChange: (props: T[]) => void;
  children: ({ item, items, index }: { item: T; items: T[]; index: number }) => JSX.Element;
  horizontal?: boolean;
  disabled?: boolean;
  itemProps?: {
    DragHandler?: FC;
    className?: string;
  };
};

export const SortableList = <T extends SortableItemProps>(props: SortableListProps<T>) => {
  const { items, onChange, children, horizontal, disabled = false, itemProps = {} } = props;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;

    if (active.id !== over.id) {
      const ids = items.map(item => item.id);
      const oldIndex = ids.indexOf(active.id);
      const newIndex = ids.indexOf(over.id);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  if (disabled) {
    return <>{items.map((item, index) => children({ item, items, index }))}</>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items}
        strategy={horizontal ? horizontalListSortingStrategy : verticalListSortingStrategy}
      >
        {items.map((item, index) => {
          return (
            <SortableItem key={item.id} id={item.id} {...itemProps}>
              {children({ item, items, index })}
            </SortableItem>
          );
        })}
      </SortableContext>
    </DndContext>
  );
};
