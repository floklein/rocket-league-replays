import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { ChangeEventHandler, useCallback, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);

  const changeFiles = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      console.log(event.target.files);
      if (!event.target.files) return;
      Array.from(event.target.files).forEach((file, index) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          console.log(fileReader.result);
          const { result } = fileReader;
          if (!result) {
            return;
          }
          setFiles((files) => [
            ...(index > 0 ? files : []),
            (result instanceof ArrayBuffer
              ? new TextDecoder("utf-8").decode(result)
              : result
            ).slice(0, 10000),
          ]);
        };
        fileReader.readAsBinaryString(file);
      });
    },
    []
  );

  return (
    <Container maxWidth="lg">
      <Stack spacing={2} py={2}>
        <Button variant="contained" component="label">
          Select replays
          <input hidden multiple type="file" onChange={changeFiles} />
        </Button>
        {files.map((file) => (
          <Paper key={file}>
            <Typography
              component="pre"
              sx={{
                whiteSpace: "pre-line",
                wordBreak: "break-word",
              }}
            >
              {file}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
