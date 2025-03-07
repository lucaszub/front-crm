import axios from "axios";
import React from "react";

const baseUrl = "https://webapp-container-lucas.azurewebsites.net/test";

function App() {
  const [post, setPost] = React.useState<any>(null);
  const [showJson, setShowJson] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPost(response.data);
      console.log(response.data);
    });
  }, []);

  if (!post) {
    return null;
  }

  return (
    <>
      <button onClick={() => setShowJson(!showJson)}>
        {showJson ? "Hide" : "Show"} JSON
      </button>
      {showJson && <pre>{JSON.stringify(post, null, 2)}</pre>}
    </>
  );
}

export default App;
