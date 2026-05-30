// Ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

const video = document.getElementById("player");
const titleEl = document.getElementById("movie-title");

// Lê o id do filme na URL (player.html?id=filme1)
const id = new URLSearchParams(location.search).get("id");
const movie = MOVIES[id];

if (!movie) {
  titleEl.textContent = "Filme não encontrado";
} else if (movie.drive) {
  // ── Vídeo hospedado no Google Drive: usa o player de preview ──
  titleEl.textContent = movie.title;
  document.title = "Cine Fer - " + movie.title;

  const iframe = document.createElement("iframe");
  iframe.src = "https://drive.google.com/file/d/" + movie.drive + "/preview";
  iframe.title = movie.title;
  iframe.allow = "autoplay; encrypted-media";
  iframe.allowFullscreen = true;
  iframe.className = "yt-frame";

  video.replaceWith(iframe);
} else if (movie.youtube) {
  // ── Vídeo hospedado no YouTube: usa o player embutido ──
  titleEl.textContent = movie.title;
  document.title = "Cine Fer - " + movie.title;

  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.youtube.com/embed/" +
    movie.youtube +
    "?rel=0&modestbranding=1&cc_lang_pref=pt&cc_load_policy=1";
  iframe.title = movie.title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.className = "yt-frame";

  // Substitui o <video> pelo iframe dentro da moldura
  video.replaceWith(iframe);
} else {
  titleEl.textContent = movie.title;
  document.title = "Cine Fer - " + movie.title;

  // Fontes de vídeo (com e sem type, para compatibilidade)
  const s1 = document.createElement("source");
  s1.src = movie.src;
  s1.type = "video/x-matroska";
  const s2 = document.createElement("source");
  s2.src = movie.src;
  video.append(s1, s2);

  // Legenda PT-BR, ativa por padrão
  if (movie.sub) {
    const track = document.createElement("track");
    track.kind = "subtitles";
    track.src = movie.sub;
    track.srclang = "pt-BR";
    track.label = movie.label || "Português (BR)";
    track.default = true;
    video.append(track);
  }

  video.load();

  // Garante a legenda visível assim que carregar
  video.addEventListener(
    "loadedmetadata",
    () => {
      const tracks = Array.from(video.textTracks);
      tracks.forEach((t) => (t.mode = "disabled"));
      const ptbr = tracks.find(
        (t) => t.language === "pt-BR" || t.language === "pt",
      );
      if (ptbr) ptbr.mode = "showing";
    },
    { once: true },
  );
}
