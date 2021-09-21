import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const gasApi = 'https://script.google.com/macros/s/AKfycbyz7b4E1DShfeT2b6VvowplpEqcI_st5QK4ZHF5V-zV_ZRCJqWctHEtAlqGhBI6tgGB/exec'

  useEffect(async () => {
    const tasks = await fetch(gasApi).then((response) => response.json())
    setTasks(tasks)
  }, [])

  const createTask = async () => {
    const task = await fetch(gasApi, {
      method: 'POST',
      body: JSON.stringify({
        method: 'POST',
        params: { title },
      }),
    }).then((response) => response.json())
    setTitle('')
    setTasks([...tasks, task])
  }

  const updateTask = async (id, title) => {
    const task = await fetch(gasApi, {
      method: 'POST',
      body: JSON.stringify({
        method: 'PUT',
        params: { id, title },
      }),
    }).then((response) => response.json())
    const index = tasks.findIndex((task) => task.id === id)
    tasks[index].isEdit = false
    setTasks([...tasks])
  }

  const destroyTask = async (id) => {
    const task = await fetch(gasApi, {
      method: 'POST',
      body: JSON.stringify({
        method: 'DELETE',
        params: { id },
      }),
    }).then((response) => response.json())
    const filterTasks = tasks.filter((task) => task.id !== id)
    setTasks([...filterTasks])
  }

  const toggleForm = (id) => {
    const index = tasks.findIndex((task) => task.id === id)
    tasks[index].isEdit = true
    setTasks([...tasks])
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-indigo-600 shadow">
        <div className="mx-auto p-4">
          <h2 className="font-semibold text-xl text-white">Task</h2>
        </div>
      </header>

      <main className="px-4 pb-6">
        <div className="mt-6 shadow rounded overflow-hidden bg-gray-100">
          <div className="p-4 flex">
            <input className="w-full px-3 py-2 rounded shadow" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="ml-2 min-w-max px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => createTask()}>
              登録
            </button>
          </div>
        </div>
        {tasks.map((task) =>
          task.isEdit ? (
            <div className="mt-6 shadow rounded overflow-hidden bg-gray-100" key={task.id}>
              <div className="p-4 flex items-center justify-between">
                <input
                  className="w-full px-3 py-2 rounded shadow"
                  type="text"
                  value={task.title}
                  onChange={(e) => {
                    const index = tasks.findIndex((item) => item.id === task.id)
                    tasks[index].title = e.target.value
                    setTasks([...tasks])
                  }}
                />
                <button className="ml-2 min-w-max px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => updateTask(task.id, task.title)}>
                  更新
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 shadow rounded overflow-hidden bg-gray-100" key={task.id}>
              <div className="p-4 flex items-center justify-end">
                <h3 className="w-full text-lg font-bold">{task.title}</h3>
                <button className="px-4 min-w-max py-2 bg-indigo-600 text-white rounded" onClick={() => toggleForm(task.id)}>
                  編集
                </button>
                <button className="ml-2 min-w-max px-4 py-2 bg-red-600 text-white rounded" onClick={() => destroyTask(task.id)}>
                  削除
                </button>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  )
}
