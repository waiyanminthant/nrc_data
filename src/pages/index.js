import Head from "next/head";
import data from "data/nrc.json";
import code from "data/code.json";
import {
  Center,
  Container,
  Table,
  Pagination,
  Group,
  Paper,
  TextInput,
  Select,
  Text,
  Anchor,
  Skeleton,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

export default function Home() {

  //import data from json file
  const nrcData = data.nrc;
  const codeList = code;

  //init state
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");

  //init pagination
  const [paginatedNRC, setPagniatedNRC] = useState(nrcData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPage, setTotalPage] = useState(1);

  //filter the result according to input
  function filterNRC(search, codeSearch) {
    const keyword = search.toLowerCase();

    if (codeSearch) {
      var codeFiltered = nrcData.filter((item) => item.nrc_code === codeSearch);
    } else {
      var codeFiltered = nrcData;
    }

    const filtered = codeFiltered.filter(
      (item) =>
        item.district_code_mm.includes(keyword) ||
        item.district_code_en.toLowerCase().includes(keyword) ||
        item.state_mm.includes(keyword) ||
        item.state_en.toLowerCase().includes(keyword) ||
        item.nrc_code.toLowerCase().includes(keyword)
    );
    return filtered;
  }

  //reload according to the filtered data
  useEffect(() => {
    setIsLoading(true);
    const filtered = filterNRC(search, codeSearch);
    setTotalPage(Math.ceil(filtered.length / pageSize));
    setPagniatedNRC(
      filtered.slice(page * pageSize - pageSize, page * pageSize)
    );
    setIsLoading(false);
  }, [page, search, codeSearch]);

  //map the filtered data to rows
  const rows = paginatedNRC.map((item) => {
    var regex = /\(([^()]+)\)/g;
    return (
      <tr key={item.district_code_mm}>
        <td>
          <Center>{item.nrc_code}</Center>
        </td>
        <td>
          <Center>{item.state_mm}</Center>
        </td>
        <td>
          <Center>{item.district_code_mm.slice(6)}</Center>
        </td>
        <td>
          <Center>{item.district_code_en}</Center>
        </td>
        <td>
          <Center>{regex.exec(item.district_code_mm)[1]}</Center>
        </td>
      </tr>
    );
  });

  //render
  return (
    <Container fluid px={50} py={40}>
      {isLoading ? (
        <Skeleton h={1000} />
      ) : (
        <div>
          <Head>
            <title>NRC Checker</title>
          </Head>
          <Paper withBorder shadow="xl" pb={40} pt={20} px={20}>
            <Group position="center" pb={20}>
              <Select
                data={codeList}
                onChange={(value) => {
                  setCodeSearch(value);
                  setPage(1);
                }}
                placeholder="တိုင်း/ပြည်နယ် ရွေးရန်"
                clearable
              />
              <TextInput
                placeholder="စာဖြင့်ရှာရန်"
                icon={<IconSearch size={16} />}
                onChange={(event) => {
                  setSearch(event.currentTarget.value), setPage(1);
                }}
              />
            </Group>
            <Table
              withColumnBorders
              withBorder
              highlightOnHover
              verticalSpacing="md"
            >
              <thead>
                <tr>
                  <th>
                    <Center>NRC Code</Center>
                  </th>
                  <th>
                    <Center>State</Center>
                  </th>
                  <th>
                    <Center>Region (မြန်မာ)</Center>
                  </th>
                  <th>
                    <Center>Region Code (English)</Center>
                  </th>
                  <th>
                    <Center>Region Code (မြန်မာ)</Center>
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Pagination
              total={totalPage}
              position="center"
              pt={30}
              page={page}
              onChange={setPage}
              disabled={totalPage < 1}
            />
          </Paper>
          <Center py={20}>
            <Text fz={12}>
              Coded by{" "}
              <Anchor
                href={"https://github.com/waiyanminthant"}
                target="_blank"
              >
                Waiyan Min Thant
              </Anchor>
            </Text>
          </Center>
        </div>
      )}
    </Container>
  );
}
