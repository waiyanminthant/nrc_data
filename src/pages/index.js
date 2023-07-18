import Head from 'next/head'
import data from 'data/nrc.json';
import { Center, Container, Table, Pagination, Group, Paper, TextInput, Select, Text, Anchor } from '@mantine/core';
import { useState, useEffect } from 'react';
import { IconSearch } from '@tabler/icons-react';

export default function Home() {

  const nrcData = data.nrc
  const codeList = [
    { label: 'ကချင်', value: '1' },
    { label: 'ကယား', value: '2' },
    { label: 'ကရင်', value: '3' },
    { label: 'ချင်း', value: '4' },
    { label: 'စစ်ကိုင်း', value: '5' },
    { label: 'တနင်္သာရီ', value: '6' },
    { label: 'ပဲခူး', value: '7' },
    { label: 'မ‌ကွေး', value: '8' },
    { label: 'မန္တလေး', value: '9' },
    { label: 'မွန်', value: '10' },
    { label: 'ရခိုင်', value: '11' },
    { label: 'ရန်ကုန်', value: '12' },
    { label: 'ရှမ်း', value: '13' },
    { label: 'ဧရာဝတီ', value: '14' },
  ]

  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [codeSearch, setCodeSearch] = useState('');
  const [paginatedNRC, setPagniatedNRC] = useState(nrcData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPage, setTotalPage] = useState(1);

  function filterNRC(search, codeSearch) {
    const keyword = search.toLowerCase();

    if (codeSearch) {
      var codeFiltered = nrcData.filter((item) => item.nrc_code === codeSearch)
    } else {
      var codeFiltered = nrcData
    }

    const filtered = codeFiltered.filter((item) =>
      item.district_code_mm.includes(keyword) ||
      item.district_code_en.toLowerCase().includes(keyword) ||
      item.state_mm.includes(keyword) ||
      item.state_en.toLowerCase().includes(keyword) ||
      item.nrc_code.toLowerCase().includes(keyword)
    )
    return filtered
  }

  useEffect(() => {
    setIsLoading(true);
    const filtered = filterNRC(search, codeSearch);
    setTotalPage(Math.ceil(filtered.length / pageSize))
    setPagniatedNRC(filtered.slice((page * pageSize) - pageSize, (page * pageSize)))
    setIsLoading(false)
  }, [page, search, codeSearch])

  const rows = paginatedNRC.map((item) => {
    var regex = /\(([^()]+)\)/g;
    return (
      <tr key={item.district_code_mm}>
        <td><Center>{item.nrc_code}</Center></td>
        <td><Center>{item.state_mm}</Center></td>
        <td><Center>{(item.district_code_mm).slice(6)}</Center></td>
        <td><Center>{(item.district_code_en)}</Center></td>
        <td><Center>{regex.exec(item.district_code_mm)[1]}</Center></td>
      </tr>
    )
  })

  return (
    <Container fluid px={50} py={40}>
      <Head>
        <title>NRC Checker</title>
      </Head>
      <Paper withBorder shadow='xl' pb={40} pt={20} px={20}>
        <Group position='center' pb={20}>
          <Select
            data={codeList}
            onChange={(value) => {setCodeSearch(value); setPage(1)} }
            placeholder='တိုင်း/ပြည်နယ် ရွေးရန်'
            clearable
          />
          <TextInput
            placeholder='စာဖြင့်ရှာရန်'
            icon={<IconSearch size={16} />}
            onChange={(event) => {setSearch(event.currentTarget.value), setPage(1)}}
          />
        </Group>
        <Table withColumnBorders withBorder highlightOnHover verticalSpacing='md'>
          <thead>
            <tr>
              <th><Center>NRC Code</Center></th>
              <th><Center>State</Center></th>
              <th><Center>Region (မြန်မာ)</Center></th>
              <th><Center>Region Code (English)</Center></th>
              <th><Center>Region Code (မြန်မာ)</Center></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
        <Pagination total={totalPage} position='center' pt={30} page={page} onChange={setPage} disabled={totalPage < 1} />
      </Paper>
      <Center py={20}>
        <Text fz={12}>Coded by <Anchor href={'https://github.com/waiyanminthant'} target='_blank'>Waiyan Min Thant</Anchor></Text>
      </Center>
    </Container>
  )
}
