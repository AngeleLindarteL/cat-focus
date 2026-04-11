function Popup() {
  return (
    <div className="p-10 bg-white rounded shadow-md w-80">
      <h1 className="text-2xl font-bold mb-4">Welcome to Cat Focus!</h1>
      <p className="mb-2">
        Keep your virtual cat happy while browsing the web.
      </p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          chrome.runtime.openOptionsPage();
        }}
      >
        Start Focusing
      </button>
    </div>
  );
}

export default Popup;
