import React, { useEffect, useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import Modal from "react-modal"
import { v4 as uuidv4 } from "uuid"

import { BsPencilSquare, BsTrash, BsX, BsGithub, BsLinkedin } from "react-icons/bs"

import ParticlesBackground from "./ParticlesBackground/ParticlesBackground"

import "./Home.css"

const initialColumns = [
  {
    id: 1,
    title: "To do",
    tasks: [
      { id: 34, content: "Example task 1" },
      { id: 56, content: "Example task 2" },
      { id: 78, content: "Example task 3" },
    ],
  },

  { id: 2, title: "Doing", tasks: [{ id: 12, content: "Example task 4" }] },
  { id: 3, title: "Done", tasks: [] },
]

export default function Home() {  
  const [columns, setColumns] = useState(initialColumns)

  useEffect(() => {
    localStorage.columns
      ? setColumns(JSON.parse(localStorage.columns))
      : setColumns(initialColumns)
  }, [])

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns))
  }, [columns])

  function onDragEnd(result) {
    const columnsDeepCopy = JSON.parse(JSON.stringify(columns))

    for (let i = 0; i < columnsDeepCopy.length; i++) {
      if (
        +result.source.droppableId === columnsDeepCopy[i].id &&
        +result.source.droppableId === +result.destination.droppableId
      ) {
        const spliced = columnsDeepCopy[i].tasks.splice(result.source.index, 1)
        columnsDeepCopy[i].tasks.splice(result.destination.index, 0, ...spliced)
      }
      if (
        +result.source.droppableId === columnsDeepCopy[i].id &&
        +result.source.droppableId !== +result.destination.droppableId
      ) {
        const spliced = columnsDeepCopy[i].tasks.splice(result.source.index, 1)

        columnsDeepCopy[+result.destination.droppableId - 1].tasks.splice(
          result.destination.index,
          0,
          ...spliced
        )
      }
    }

    setColumns(columnsDeepCopy)
  }

  const handleKey = (e) => e.key === 'Enter' ? handleSendClick() : null

  // MODAL
  const [modalContent, setModalContent] = useState("")
  const [task, setTask] = useState("")
  const [column, setColumn] = useState("")
  const [clickHandler, setClickHandler] = useState(true)

  const handleModalAdd = column => {
    setClickHandler(true)
    setModalContent("")
    openModal()
    setColumn(column)
  }

  const handleAdd = () => {
    const columnsDeepCopy = JSON.parse(JSON.stringify(columns))

    if (modalContent) {
      columnsDeepCopy.filter(columnCopy => {
        if (columnCopy.id === column.id) {
          columnCopy.tasks.push({ id: uuidv4(), content: modalContent })
        }
      })
      setColumns(columnsDeepCopy)
    }
    closeModal()
  }

  const handleUpdate = () => {
    const columnsDeepCopy = JSON.parse(JSON.stringify(columns))

    for (let i = 0; i < columnsDeepCopy.length; i++) {
      for (let j = 0; j < columnsDeepCopy[i].tasks.length; j++) {
        if (columnsDeepCopy[i].tasks[j].id === task.id) {
          columnsDeepCopy[i].tasks[j].content = modalContent
        }
      }
    }
    setColumns(columnsDeepCopy)
    closeModal()
  }

  const handleDelete = task => {
    const columnsDeepCopy = JSON.parse(JSON.stringify(columns))
    setTask(task)

    for (let i = 0; i < columnsDeepCopy.length; i++) {
      for (let j = 0; j < columnsDeepCopy[i].tasks.length; j++) {
        if (columnsDeepCopy[i].tasks[j].id === task.id) {
          columnsDeepCopy[i].tasks.splice(j, 1)
          setColumns(columnsDeepCopy)
        }
      }
    }
  }

  const inputChange = e => {
    setModalContent(e.target.value)
  }

  const handleModalEdit = task => {
    setClickHandler(false)
    setModalContent(task.content)
    setTask(task)
    openModal()
  }

  const handleSendClick = () => (clickHandler ? handleAdd() : handleUpdate())

  Modal.setAppElement("#root")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  return (
    <div className="wrapper">
      <ParticlesBackground/>
        <div className="container" style={{zIndex: 0}}>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map(column => (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h2 className="headings">{column.title}</h2>
                  <Droppable droppableId={column.id.toString()} key={column.id}>
                    {provided => (
                      <div className='column-wrapper' ref={provided.innerRef}>
                          <div className="column">
                            {column.tasks.map((task, index) => (
                              <>
                                <Draggable
                                  draggableId={task.id.toString()}
                                  index={index}
                                  key={task.id}
                                >
                                  {provided => (                                    
                                        <div
                                          className="taks"
                                          {...provided.dragHandleProps}
                                          {...provided.draggableProps}
                                          ref={provided.innerRef}
                                          style={{ ...provided.draggableProps.style }}
                                        >
                                          <span>
                                          {task.content}
                                          </span>
                                          <div className="button-container">
                                            <button className="task-button" onClick={() => handleModalEdit(task)}>
                                              <BsPencilSquare className="task-icon" />
                                            </button>
                                            
                                            <button className="task-button" onClick={() => handleDelete(task)}>
                                              <BsTrash className="task-icon" />
                                            </button>
                                          </div>                                        
                                        </div>
                                  )}
                                </Draggable>
                              </>
                            ))}
                            <div className="card-spacing"></div>
                          </div>                        
                        <span className="add-task-button" onClick={() => handleModalAdd(column)}>
                          + Add Task
                        </span>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </>
            ))}
          </DragDropContext>          
        </div>
        
          <Modal className='modal' isOpen={modalIsOpen} onRequestClose={closeModal} style={{}}>
            <BsX className="modal-x" onClick={closeModal}/>
            <textarea
              type="search"
              autoFocus
              defaultValue={modalContent}
              onChange={e => inputChange(e)}
              onKeyPress={e => handleKey(e)}
              
              />
            <button onClick={handleSendClick}>Send</button>
          </Modal>

          <footer>
            <div>
              {`</> by`} <strong>Bruno</strong>
            </div>
            <div className="footer-links">
              <a href="https://github.com/brunogoncalvess" target="_blank" rel="noreferrer"><BsGithub /></a> 
              <a href="https://www.linkedin.com/in/brunrsg/" target="_blank" rel="noreferrer"><BsLinkedin/></a>
            </div>

          </footer>
    </div>
    
  )
}
