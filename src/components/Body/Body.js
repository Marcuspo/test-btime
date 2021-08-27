import { Table, Th, Tr, Td, Busca } from "./styles"

import { medalists } from "../api/medalists"
import { useEffect, useState } from "react"

import { Button, Modal } from "react-bootstrap"

function Body() {
  const [results, setResults] = useState({})
  const [search, setSearch] = useState("")
  const [show, setShow] = useState(false)
  const [details, setDetails] = useState(null)

  const handleClose = () => setShow(false)

  function handleShow(details) {
    setShow(true)
    setDetails(details)
  }

  useEffect(() => {
    const standings = {}

    medalists.forEach((item) => {
      const { country, medal, athlete: name, event, sex } = item
      if (!standings[country]) {
        standings[country] = {
          medals: {
            gold: 0,
            silver: 0,
            bronze: 0,
            total: 0,
          },
          atletes: [],
        }
      }
      standings[country].medals[medal.toLowerCase()]++
      standings[country].medals.total++
      const athlete = { name, event, sex }
      standings[country].atletes.push(athlete)
    })

    const sortedStandings = Object.entries(standings).sort(
      ([_, a], [__, b]) => b.medals.total - a.medals.total
    )

    const filterednames = sortedStandings.filter((names) => {
      return names[0].toLowerCase().includes(search.toLowerCase())
    })
    setResults(filterednames)
  }, [search])

  return (
    <div>
      <Busca>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />
      </Busca>
      <Table>
        <Tr>
          <Th>País</Th>
          <Th>Ouro</Th>
          <Th>Prata</Th>
          <Th>Bronze</Th>
          <Th>Total</Th>
        </Tr>
        {results.length > 0 &&
          results.map(([name, country]) => (
            <Tr key={name}>
              <Td>
                <Button
                  variant="light"
                  onClick={() => {
                    handleShow(country)
                  }}
                >
                  {name}
                </Button>
              </Td>
              <Td>{country.medals.gold}</Td>
              <Td>{country.medals.silver}</Td>
              <Td>{country.medals.bronze}</Td>
              <Td>{country.medals.total}</Td>
            </Tr>
          ))}
        {details && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Atletas:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {details.atletes.map((name) => {
                  return (
                    <p>
                      <strong>Name: {name.name} </strong>
                      <p>
                        Event: {name.event}
                        <p>Sex: {name.sex}</p>
                      </p>
                    </p>
                  )
                })}
                <p>Total medals: {details.medals.total}</p>
              </p>
            </Modal.Body>
          </Modal>
        )}
      </Table>
    </div>
  )
}

export default Body
