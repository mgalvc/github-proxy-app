import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function Main() {
  const [users, setUsers] = useState([])
  const [next, setNext] = useState('')
  const [current, setCurrent] = useState(`${process.env.PROXY_URL}/api/users`)
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(current)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users)
        setNext(data.next)
      })
  }, [current])

  const goNext = () => {
    setHistory([...history, current])
    setCurrent(next)
  }

  const goPrev = () => {
    setCurrent(history.pop())
  }

  return (
    <div style={{ width: 'fit-content' }}>
      <h1>Users</h1>
      <table style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th style={{ padding: '0px 20px' }}>ID</th>
            <th style={{ padding: '0px 40px' }}>Login</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`user/${user.login}`}>{user.id}</Link>
                </td>
                <td>{user.login}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div style={{ textAlign: 'right' }}>
        <a 
          style={{ padding: '0 10px' }} 
          href='#'
          onClick={goPrev}
        >
          {history.length > 0 && 'Previous'}
        </a>
        <a 
          href='#' 
          onClick={goNext}
        >
          Next
        </a>
      </div>
    </div>
  )
}