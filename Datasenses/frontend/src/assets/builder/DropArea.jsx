import React from "react";
import {
  DndContext,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  KeyboardSensor,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import {cn} from "@/lib/utils";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import ElementWrapper from "./dragelement/ElementWrapper";

export default function DropArea({children}) {
  const {setNodeRef, over} = useDroppable({
    id: "FormElement-DropArea",
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const {formElements, dispatch} = useFormBuilder();
  const [isDragItem, setIsDragItem] = React.useState(null);
  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "h-full w-3/4 flex flex-col items-center gap-1 bg-background p-3",
        over && "ring-4 ring-primary"
      )}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        modifiers={[restrictToWindowEdges]}
        onDragEnd={(event) => {
          const {active, over} = event;
          if (active.id !== over.id) {
            const oldIndex = formElements.findIndex(({id}) => id === active.id);
            const newIndex = formElements.findIndex(({id}) => id === over.id);
            dispatch({type: "swapElement", payload: {oldIndex, newIndex}});
          }
        }}
        onDragStart={(e) => {
          const item = formElements.find((ele) => ele.id === e.active.id);
          setIsDragItem(item);
        }}
      >
        <ScrollArea className="h-full w-full">
          <SortableContext
            items={formElements}
            strategy={verticalListSortingStrategy}
          >
            {children}
          </SortableContext>
        </ScrollArea>
      </DndContext>
    </Card>
  );
}
