import data from 'data/nrc.json';
import { Table } from '@mantine/core';

export default function nrc_table() {
  const rows = data.nrc.map((element) => (
    <tr key={element.id}>
      <td>{element.nrc_code}</td>
      <td>{element.name_en}</td>
      <td>{element.name_mm}</td>
    </tr>
  )
  )
  return (
    <>
      <Table highlightOnHover>
        <thead>
          <td>တိုင်း/ပြည်နယ် Code</td>
          <td>မြို့နယ် အတိုကောက် (Eng)</td>
          <td>မြို့နယ် အတိုကောက် (MM)</td>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  )
}

