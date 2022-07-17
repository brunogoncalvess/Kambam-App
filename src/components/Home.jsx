import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import "./Home.css"

const initialColumns = [
  {
    id: 12,
    title: "To do",
    tasks: [
      { id: 34, content: "task 1" },
      { id: 56, content: "task 2" },
      { id: 78, content: "task 3" },
    ],
  },
  { id: 34, title: "Doing", tasks: [{ id: 12, content: "Almost done" }] },
  { id: 56, title: "Done", tasks: [] },
]

export default function Home() {

  const [columns, setColumns] = useState(initialColumns)

  return (
    <div className="wrapper">
      <DragDropContext>
        <div className="container">
          {columns.map(column => (
            <Droppable droppableId={column.id.toString()} key={column.id} >
              {(provided) => (
                <div 
                ref={provided.innerRef}
                >
                  <h2 className="headings">{column.title}</h2>
                  <div className="column">
                    {column.tasks.map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            style={{ ...provided.draggableProps.style }}                            
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
