import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Chart from './components/Chart/Chart';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Table from './components/Table/Table';
import TableHead from './components/TableHead/TableHead';
import TableHeadRow from './components/TableHeadRow/TableHeadRow';
import TableHeadCell from './components/TableHeadCell/TableHeadCell';
import TableBody from './components/TableBody/TableBody';
import TableBodyRow from './components/TableBodyRow/TableBodyRow';
import TableBodyCell from './components/TableBodyCell/TableBodyCell';
import Dialog from './components/Dialog/Dialog';
import Alert from './components/Alert/Alert';
import './App.css';
import trash from './assets/trash.svg';

function App() {
  const [page, setPage] = useState(0);
  const [all, setAll] = useState(false);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [alertOpened, setAlertOpened] = useState(false);
  const [newDealValue, setNewDealValue] = useState(0);
  const [newDealDate, setNewDealDate] = useState<Date>(new Date());
  const [data, setData] = useState<{ date: Date; value: number; id: number }[]>(
    []
  );
  useEffect(() => {
    fetchDeals();
    const updateTime = () => {
      setNewDealDate(new Date());
    };
    const timerId = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchDeals = (firstPage = false) => {
    fetch(`/deals/${firstPage ? 0 : page}`)
      .then((res) => {
        return res.json();
      })
      .then((fetchedData) => {
        setData(firstPage ? fetchedData : [...data, ...fetchedData]);
        if (data.length || (!data.length && fetchedData.length)) {
          setNewDealValue(
            (!data.length && fetchedData.length) || firstPage
              ? fetchedData[0].value
              : data[0].value
          );
        }
        checkAll((firstPage ? 0 : page) + 1);
        setPage((firstPage ? 0 : page) + 1);
      });
  };
  const createNewDeal = () => {
    const newDeal = {
      id: Math.round(newDealDate.getTime() / 100),
      date: newDealDate,
      value: newDealValue,
    };
    fetch('/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeal),
    }).then((res) => {
      fetchDeals(true);
      setAlertOpened(true);
      setDialogOpened(false);
      setTimeout(() => {
        setAlertOpened(false);
      }, 3000);
    });
  };
  const checkAll = (nextPage: number) => {
    fetch(`/deals/${nextPage}`)
      .then((res) => {
        return res.json();
      })
      .then((fetchedData) => {
        setAll(!fetchedData.length);
      });
  };
  const removeItem = (id: number) => {
    fetch(`/delete/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      fetchDeals(true);
    });
  };
  const formatTime = (digits: number) => {
    return (digits < 10 ? '0' : '') + digits;
  };
  const getDate = (date: Date | number, noSeconds = false) => {
    const dateString = new Date(date);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${formatTime(dateString.getDate())} ${
      months[dateString.getMonth()]
    } ${dateString.getFullYear()} ${formatTime(
      dateString.getHours()
    )}:${formatTime(dateString.getMinutes())}${
      !noSeconds ? ':' + formatTime(dateString.getSeconds()) : ''
    }`;
  };
  return (
    <div className="App">
      <Header
        onOpenDialog={() => {
          setDialogOpened(true);
        }}
      />
      <Chart
        unitsPerTickX={20}
        unitsPerTickY={30}
        data={data}
        highlight={highlight}
        onHover={(index) => setHighlight(index)}
      />
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadCell>Value</TableHeadCell>
            <TableHeadCell>Date and time</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableHeadRow>
        </TableHead>
        <TableBody>
          {data.map((deal) => {
            return (
              <TableBodyRow
                className={deal.id === highlight ? 'hovered' : ''}
                index={deal.id}
                key={deal.id}
                onHover={(e) => {
                  setHighlight(e);
                }}
              >
                <TableBodyCell className="bold">{deal.value}</TableBodyCell>
                <TableBodyCell>{getDate(deal.date)}</TableBodyCell>
                <TableBodyCell className="right">
                  <Button className="icon" onClick={() => removeItem(deal.id)}>
                    <img src={trash} className="delete" alt="delete" />
                  </Button>
                </TableBodyCell>
              </TableBodyRow>
            );
          })}
          {!all ? (
            <TableBodyRow className="nohover transparent">
              <TableBodyCell className="center" colspan={3}>
                <Button className="secondary load" onClick={() => fetchDeals()}>
                  Load next page
                </Button>
              </TableBodyCell>
            </TableBodyRow>
          ) : (
            ''
          )}
        </TableBody>
      </Table>
      {dialogOpened ? (
        <Dialog
          title="Make a New Deal"
          onClose={() => setDialogOpened(false)}
          onProceed={() => createNewDeal()}
        >
          <Input
            value={getDate(newDealDate, true)}
            label="Current Date"
            disabled={true}
          />
          <br />
          <Input
            value={newDealValue}
            onChange={(e) =>
              setNewDealValue(+(e.target as HTMLInputElement).value)
            }
            label="Enter value"
            type="number"
          />
        </Dialog>
      ) : (
        ''
      )}
      {alertOpened ? (
        <Alert
          onClose={() => {
            setAlertOpened(false);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
