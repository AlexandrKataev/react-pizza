function App() {
  const test = () => {
    return "тест jsx";
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <div>{test()}</div>
    </div>
  );
}

export default App;
