import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function User({ params }) {
  const { username } = useParams()
  const [details, setDetails] = useState({})
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PROXY_URL}/api/users/${username}/details`)
      .then(res => res.json())
      .then(setDetails)
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_PROXY_URL}/api/users/${username}/repos?page=${page}`)
      .then(res => res.json())
      .then(setRepos)
  }, [page])

  const goNext = () => {
    setPage(page + 1)
  }

  const goPrev = () => {
    setPage(page - 1)
  }

  return (
    <div>
      <h1>{username}</h1>
      <p><b>ID:</b> {details.id}</p>
      <p><b>Profile URL:</b> <a href={details.html_url} target='_blank'>{details.html_url}</a></p>
      <p><b>Created At:</b> {details.created_at}</p>

      <div style={{ width: 'fit-content' }}>
        <table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={{ padding: '0px 45px' }}>ID</th>
              <th style={{ padding: '0px 90px' }}>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {
              repos.map(repo => (
                <tr key={repo.id}>
                  <td>{repo.id}</td>
                  <td>{repo.name}</td>
                  <td><a href={repo.html_url} target='_blank'>{repo.html_url}</a></td>
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
            {page > 1 && 'Previous'}
          </a>
          <a 
            href='#' 
            onClick={goNext}
          >
            {repos.length > 0 && 'Next'}
          </a>
        </div>
      </div>
    </div>
  )
}