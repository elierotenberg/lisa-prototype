export const download = (
  fileName: string,
  contentType: string,
  content: string
): void => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    `data:${contentType};charset=utf-8,${encodeURIComponent(content)}`
  );
  link.setAttribute("download", fileName);
  link.setAttribute("style", "display: none");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
