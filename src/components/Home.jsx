import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import "./Home.css"

const initialColumns = [
  { id: 1, title: "To do", tasks: [{ id: 34, content: "task 1" }, { id: 56, content: "task 2" }, { id: 78, content: "task 3" }]},

  { id: 2, title: "Doing", tasks: [{ id: 12, content: "Almost done" }] },
  { id: 3, title: "Done", tasks: [] },
]

export default function Home() {

    const [columns, setColumns] = useState(initialColumns)

    
    function onDragEnd(result) {
        const columnsDeepCopy = JSON.parse(JSON.stringify(columns))
        console.log(result)

        for(let i = 0; i < columnsDeepCopy.length; i++) {
            if (+result.source.droppableId === columnsDeepCopy[i].id &&
               +result.source.droppableId === +result.destination.droppableId) {
                
                const spliced = columnsDeepCopy[i].tasks.splice(result.source.index, 1)
                columnsDeepCopy[i].tasks.splice(result.destination.index, 0, ...spliced)
            }
            if (+result.source.droppableId === columnsDeepCopy[i].id &&
               +result.source.droppableId !== +result.destination.droppableId) {

                const spliced = columnsDeepCopy[i].tasks.splice(result.source.index, 1)

                columnsDeepCopy[+result.destination.droppableId - 1].tasks.splice(result.destination.index, 0, ...spliced)
            }
        }

        setColumns(columnsDeepCopy)
    }

  return (
    <div className="wrapper">
      <div className="headings">
            {columns.map(column => (<h2>{column.title}</h2>))}
      </div>
        <div className="container">
          <DragDropContext onDragEnd={onDragEnd}>
          {columns.map(column => (
            <Droppable droppableId={column.id.toString()} key={column.id} >
              {(provided) => (
                <div 
                ref={provided.innerRef}
                >
                {/* <h2 className="headings" >{column.title}</h2> */}
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
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          </DragDropContext>
        </div>
    </div>
  )
}
