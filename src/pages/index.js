import Head from 'next/head'
import data from 'data/nrc.json';
import { Center, Container, Table, Pagination, Text, Title, Divider } from '@mantine/core';
import { useState, useEffect } from 'react';

export default function Home() {

  const nrcData = data.nrc

  const [isLoading, setIsLoading] = useState(false);
  const [paginatedNRC, setPagniatedNRC] = useState(nrcData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setTotalPage(Math.ceil(nrcData.length / pageSize))
    setPagniatedNRC(nrcData.slice((page * pageSize) - pageSize, (page * pageSize)))
    setIsLoading(false)
  }, [page])

  const rows = paginatedNRC.map((item, index) => {
    var regex = /\(([^()]+)\)/g;
    return (
      <tr key={item.district_code_mm}>
        <td><Center>{item.state_mm}</Center></td>
        <td><Center>{(item.district_code_mm).slice(6)}</Center></td>
        <td><Center>{(item.district_code_en)}</Center></td>
        <td><Center>{regex.exec(item.district_code_mm)[1]}</Center></td>
      </tr>
    )
  })

  return (
    <>
      <Head>
        <title>NRC Checker</title>
      </Head>
      <Container pb={30}>
        <Center><Title order={2}>Myanmar NRC List</Title></Center>
      </Container>
      <Divider pb={20} />
      <Container fluid>
        <Table withColumnBorders highlightOnHover verticalSpacing='md'>
          <thead>
            <tr>
              <th><Center>No.</Center></th>
              <th><Center>State</Center></th>
              <th><Center>Region (မြန်မာ)</Center></th>
              <th><Center>Region Code (English)</Center></th>
              <th><Center>Region Code (မြန်မာ)</Center></th>
            </tr>
          </thead>
          <tbody>
            {paginatedNRC.map((item, index) => {
              var regex = /\(([^()]+)\)/g;

              return (

                <tr key={index + item.id}>
                  <td><Center>{((page - 1) * pageSize) + index + 1}</Center></td>
                  <td><Center>{item.state_mm}</Center></td>
                  <td><Center>{(item.district_code_mm).slice(6)}</Center></td>
                  <td><Center>{(item.district_code_en)}</Center></td>
                  <td><Center>{regex.exec(item.district_code_mm)[1]}</Center></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Pagination total={totalPage} position='center' pt={30} defaultValue={page} onChange={setPage} disabled={totalPage < 1} />
      </Container>
    </>
  )
}
