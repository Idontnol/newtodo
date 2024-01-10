import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskGenerator extends Component {
  state = {
    activeTag: 'Health',
    searchQuery: '',
    tasksData: [],
    selectedTag: '',
    showTheseData: [],
    showTag: false,
  }

  handleTag = event => {
    this.setState({activeTag: event.target.value})
  }

  handleSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  addTask = event => {
    event.preventDefault()
    const {activeTag, searchQuery} = this.state
    if (searchQuery !== '' && activeTag !== '') {
      const newTask = {id: uuidv4(), tag: activeTag, task: searchQuery}
      this.setState(prev => ({
        tasksData: [...prev.tasksData, newTask],
        searchQuery: '',
        activeTag: 'Health',
      }))
    }
  }

  showTheseTasks = event => {
    console.log(
      `${event.target.textContent} ..............................................................................evvvv`,
    )
    const {tasksData, selectedTag} = this.state
    const newTag = event.target.textContent
    // const btn = document.getElementById(event.target.textContent)
    // if (btn.classList.contains('removeColor')) {
    //   btn.classList.remove('removeColor')
    //   btn.classList.add('addColor')
    // } else {
    //   btn.classList.remove('addColor')
    //   btn.classList.add('removeColor')
    // }

    console.log(tasksData)
    const newData = tasksData.filter(each => each.tag === newTag)
    console.log(newData)
    console.log('new data')
    if (newTag === selectedTag) {
      this.setState({showTheseData: tasksData, selectedTag: ''})
    } else if (newData.length > 0) {
      this.setState({
        showTheseData: newData,
        selectedTag: event.target.textContent,
      })
    } else {
      this.setState({showTheseData: [], selectedTag: event.target.textContent})
    }
  }

  render() {
    const {searchQuery, activeTag, tasksData, selectedTag, showTheseData} =
      this.state
    // console.log(`${tasksData} all tasksssssssssssssss`)
    console.log(`${selectedTag} seleceted tag isssssssss`)
    // console.log(`${showTheseData} show these dtaaaaaaaaaaa`)
    return (
      <div className="mainContainer">
        <form className="leftContainer" onSubmit={this.addTask}>
          <h1>Create a task!</h1>
          <label htmlFor="Task" className="">
            Task
          </label>
          <input
            type=""
            id="Task"
            className=""
            onChange={this.handleSearch}
            value={searchQuery}
            placeholder="Enter the task here"
          />
          <label htmlFor="Tags" className="">
            Tags
          </label>
          <select onChange={this.handleTag} id="Tags">
            {tagsList.map(tag => (
              <option id={tag.optionId} key={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
          <button className="addTaskBtn" type="submit">
            Add Task
          </button>
        </form>

        <div className="rightContainer">
          <h1>Tags</h1>
          <ul className="allTags">
            {tagsList.map(tag => (
              <li key={tag.optionId}>
                <button
                  className="removeColor"
                  id={tag.displayText}
                  onClick={this.showTheseTasks}
                >
                  {tag.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasksData.length > 0 &&
            showTheseData.length === 0 &&
            selectedTag === '' && (
              <ul className="resultTasks">
                {tasksData.map(task => (
                  <li className="taskItem">
                    <p>{task.task}</p>
                    <p className="addColor">{task.tag}</p>
                  </li>
                ))}
              </ul>
            )}
          {showTheseData.length === 0 ||
            (tasksData.length === 0 && <p>No Tasks Added Yet</p>)}
          {showTheseData.length === 0 && selectedTag !== '' && (
            <p>No Tasks Added Yet</p>
          )}

          {showTheseData.length > 0 && (
            <ul className="resultTasks">
              {showTheseData.map(task => (
                <li className="taskItem">
                  <p>{task.task}</p>
                  <p className="addColor">{task.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default TaskGenerator
