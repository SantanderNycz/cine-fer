// Ano no footer
document.getElementById("year").textContent = new Date().getFullYear();

const video = document.getElementById("player");
const titleEl = document.getElementById("movie-title");

// Lê o id do filme na URL (player.html?id=filme1)
const id = new URLSearchParams(location.search).get("id");
const movie = MOVIES[id];

if (!movie) {
  titleEl.textContent = "Filme não encontrado";
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
