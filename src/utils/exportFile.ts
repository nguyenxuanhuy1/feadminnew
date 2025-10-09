export const exportFileBlob = (
  data: BlobPart,
  filenamePrefix: string = "export"
) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.href = url;

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}`;

  const filename = `${filenamePrefix}_${dateStr}.xlsx`;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
