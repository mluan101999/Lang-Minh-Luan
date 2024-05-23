import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormContainer, InputGroup, Label, Select, Input, Button, Error } from './styles';

const CurrencySwapForm = () => {
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState({});
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Lấy dữ liệu token và giá
    axios.get('https://interview.switcheo.com/prices.json')
      .then(response => {
        setPrices(response.data);
        setTokens(Object.keys(response.data));
      })
      .catch(err => setError('Không thể tải dữ liệu token và giá.'));
  }, []);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!prices[fromToken] || !prices[toToken]) {
      setError('Token không hợp lệ.');
      return;
    }

    const fromPrice = prices[fromToken];
    const toPrice = prices[toToken];
    const resultAmount = (amount * fromPrice) / toPrice;
    setResult(resultAmount);
    setError('');
  };

  return (
    <FormContainer>
      <h1>Hoán đổi Tiền tệ</h1>
      {error && <Error>{error}</Error>}
      <InputGroup>
        <Label>Từ</Label>
        <Select value={fromToken} onChange={e => setFromToken(e.target.value)}>
          <option value="">Chọn token</option>
          {tokens.map(token => (
            <option key={token} value={token}>{token}</option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup>
        <Label>Đến</Label>
        <Select value={toToken} onChange={e => setToToken(e.target.value)}>
          <option value="">Chọn token</option>
          {tokens.map(token => (
            <option key={token} value={token}>{token}</option>
          ))}
        </Select>
      </InputGroup>
      <InputGroup>
        <Label>Số lượng</Label>
        <Input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </InputGroup>
      <Button onClick={handleSwap}>Hoán đổi</Button>
      {result && (
        <div>
          <h2>Kết quả</h2>
          <p>{amount} {fromToken} = {result.toFixed(6)} {toToken}</p>
        </div>
      )}
    </FormContainer>
  );
};

export default CurrencySwapForm;
