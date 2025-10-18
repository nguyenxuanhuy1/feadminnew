export const convertYoutubeLink = (url: string): string => {
  if (!url) return "";

  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    const list = urlObj.searchParams.get("list");
    const startRadio = urlObj.searchParams.get("start_radio");
    if (!videoId && urlObj.hostname.includes("youtu.be")) {
      const id = urlObj.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    if (videoId) {
      let embed = `https://www.youtube.com/embed/${videoId}`;
      if (list) embed += `?list=${list}`;
      if (startRadio) embed += `${list ? "&" : "?"}start_radio=${startRadio}`;
      return embed;
    }

    return "";
  } catch (err) {
    return url;
  }
};
