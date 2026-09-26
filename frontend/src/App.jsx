import { useState } from "react";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [quantity, setQuantity] = useState(5);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==============================
  // GET YOUTUBE VIDEO ID
  // ==============================
  const getYouTubeId = (url) => {
    try {
      const parsedUrl = new URL(url);

      const hostname = parsedUrl.hostname.replace("www.", "");

      // youtu.be/VIDEO_ID
      if (hostname === "youtu.be") {
        return parsedUrl.pathname.slice(1).split("/")[0];
      }

      // youtube.com
      if (
        hostname === "youtube.com" ||
        hostname === "m.youtube.com"
      ) {
        // youtube.com/watch?v=VIDEO_ID
        const videoId = parsedUrl.searchParams.get("v");

        if (videoId) {
          return videoId;
        }

        // youtube.com/shorts/VIDEO_ID
        if (parsedUrl.pathname.startsWith("/shorts/")) {
          return parsedUrl.pathname
            .split("/shorts/")[1]
            .split("/")[0];
        }

        // youtube.com/embed/VIDEO_ID
        if (parsedUrl.pathname.startsWith("/embed/")) {
          return parsedUrl.pathname
            .split("/embed/")[1]
            .split("/")[0];
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  // ==============================
  // GENERATE VIDEOS
  // ==============================
  const generateVideos = () => {
    if (!videoUrl.trim()) {
      alert("Please paste a YouTube video or Shorts link.");
      return;
    }

    const youtubeId = getYouTubeId(videoUrl);

    if (!youtubeId) {
      alert("Please enter a valid YouTube or Shorts link.");
      return;
    }

    setLoading(true);

    // Small delay for smooth loading UI
    setTimeout(() => {
      const newVideos = Array.from(
        { length: Number(quantity) },
        (_, index) => ({
          id: index + 1,
          youtubeId: youtubeId,
        })
      );

      setVideos(newVideos);
      setLoading(false);
    }, 300);
  };

  // ==============================
  // CLEAR ALL
  // ==============================
  const clearVideos = () => {
    setVideos([]);
    setVideoUrl("");
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="header-content">
          <h1>Video Viewer</h1>

          <p>
            Paste a YouTube or Shorts link and generate
            multiple video players.
          </p>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="container">

        {/* ================= GENERATOR ================= */}
        <section className="generator-card">

          <div className="form-row">

            {/* URL */}
            <div className="input-box url-box">
              <label>Video Link</label>

              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            {/* QUANTITY */}
            <div className="input-box quantity-box">
              <label>Quantity</label>

              <select
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
              >
                <option value={1}>1 Video</option>
                <option value={5}>5 Videos</option>
                <option value={10}>10 Videos</option>
                <option value={20}>20 Videos</option>
                <option value={30}>30 Videos</option>
                <option value={50}>50 Videos</option>
                <option value={100}>100 Videos</option>
              </select>
            </div>

            {/* GENERATE */}
            <button
              className="generate-btn"
              onClick={generateVideos}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Videos"}
            </button>

          </div>

        </section>

        {/* ================= VIDEO SECTION ================= */}
        <section className="videos-section">

          {/* HEADING */}
          <div className="section-heading">

            <div>
              <h2>Your Videos</h2>

              <p>
                {videos.length > 0
                  ? `${videos.length} video players generated`
                  : "Generated videos will appear here"}
              </p>
            </div>

            {videos.length > 0 && (
              <div className="heading-actions">

                <span className="video-count">
                  {videos.length} Videos
                </span>

                <button
                  className="clear-btn"
                  onClick={clearVideos}
                >
                  Clear
                </button>

              </div>
            )}

          </div>

          {/* ================= LOADING ================= */}
          {loading && (
            <div className="loading-grid">

              {Array.from(
                { length: Math.min(quantity, 8) },
                (_, index) => (
                  <div
                    className="skeleton-card"
                    key={index}
                  >
                    <div className="skeleton-video"></div>

                    <div className="skeleton-info"></div>
                  </div>
                )
              )}

            </div>
          )}

          {/* ================= VIDEOS ================= */}
          {!loading && videos.length > 0 && (
            <div className="video-grid">

              {videos.map((video) => (

                <div
                  className="video-card"
                  key={video.id}
                >

                  {/* NUMBER */}
                  <div className="video-number">
                    #{video.id}
                  </div>

                  {/* YOUTUBE IFRAME */}
                  <div className="iframe-wrapper">

                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&playsinline=1&rel=0`}
                      title={`YouTube Video ${video.id}`}
                      loading="lazy"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />

                  </div>

                  {/* CARD INFO */}
                  <div className="card-info">

                    <span>
                      Video #{video.id}
                    </span>

                    <span className="playing">
                      Auto Play
                    </span>

                  </div>

                </div>

              ))}

            </div>
          )}

          {/* ================= EMPTY ================= */}
          {!loading && videos.length === 0 && (
            <div className="empty-state">

              <div className="empty-icon">
                ▶
              </div>

              <h3>No Videos Yet</h3>

              <p>
                Paste a YouTube link, select quantity,
                and click Generate Videos.
              </p>

            </div>
          )}

        </section>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <p>
          Video Viewer • React Application
        </p>
      </footer>

    </div>
  );
}

export default App;