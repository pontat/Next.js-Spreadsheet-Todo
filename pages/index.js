import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>TODO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-indigo-600 shadow">
        <div className="mx-auto p-4">
          <h2 className="font-semibold text-xl text-white">TODO</h2>
        </div>
      </header>

      <main className="px-4 pb-6">
        <div className="mt-6 shadow rounded overflow-hidden bg-gray-100">
          <div className="p-4 flex">
            <input class="w-full px-3 py-2 rounded shadow" type="text" />
            <button className="ml-2 min-w-max px-4 py-2 bg-indigo-600 text-white rounded">登録</button>
          </div>
        </div>
        <div className="mt-6 shadow rounded overflow-hidden bg-gray-100">
          <div className="p-4 flex items-center justify-between">
            <input class="w-full px-3 py-2 rounded shadow" type="text" />
            <button className="ml-2 min-w-max px-4 py-2 bg-indigo-600 text-white rounded">更新</button>
          </div>
        </div>
        <div className="mt-6 shadow rounded overflow-hidden bg-gray-100">
          <div className="p-4 flex items-center justify-end">
            <h3 className="w-full text-lg font-bold">テスト</h3>
            <button className="px-4 min-w-max py-2 bg-indigo-600 text-white rounded">編集</button>
            <button className="ml-2 min-w-max px-4 py-2 bg-red-600 text-white rounded">削除</button>
          </div>
        </div>
      </main>
    </div>
  )
}
